import * as go from "gojs";
import * as I from "./DiagramInterface";
import {Subject} from "rxjs/Subject";
import {ElementRef} from "@angular/core";

type ModelType = {
    'class': string,
    nodeDataArray: Array<any>,
    [key: string]: Array<any> | any;
};

/**
 * @class
 * @implements DiagramInterface
 */
export default class Diagram implements I.DiagramInterface {

    maker: Function;

    /**
     * @type {go.Diagram}
     */
    diagram: any;
    div: any;

    /**
     *
     * @type {Array}
     */
    items: Array<Object> = [];

    /**
     *
     * @type {Subject<Object>}
     */
    private itemsSource = new Subject<Object>();

    /**
     *
     * @type {Observable<Object>}
     */
    items$ = this.itemsSource.asObservable();

    /**
     *
     * @type {[string,string,string,string,string,string,string,string]}
     */
    levelColors: Array<string> = ["#AC193D", "#2672EC", "#8C0095", "#5133AB", "#008299", "#D24726", "#008A00", "#094AB2"];

    model: ModelType = {
        'class': "go.TreeModel",
        nodeDataArray: [],
    };
    palette: go.Palette;

    protected exampleNode: any;

    protected nodeIdCounter: number = -1;

    /**
     *
     * @param {ElementRef} diagramContainer
     */
    constructor(diagramContainer: ElementRef) {
        this.div = diagramContainer.nativeElement;
        this.maker = go.GraphObject.make;
    }

    /**
     *
     * @param nextKey
     * @param nodeData
     * @param parent
     * @return {{key: number}}
     */
    protected getNode(nextKey: number, nodeData: any, parent?: number) {
        let node = {
            key: nextKey,
        };

        if (parent) {
            node['parent'] = parent;
        }

        node = Object.assign(node, nodeData);

        return node;
    }

    protected initExampleData() {
    }

    protected selectionDeleting() {
        // manage boss info manually when a node or link is deleted from the diagram
        this.diagram.addDiagramListener("SelectionDeleting", (e) => {

            let part = e.subject.first(); // e.subject is the myDiagram.selection collection,
                                          // so we'll get the first since we know we only have one selection
            this.diagram.startTransaction("clear boss");
            if (part instanceof go.Node) {

                this.removeItem(part.data);

                let it = part.findTreeChildrenNodes(); // find all child nodes
                while (it.next()) { // now iterate through them and clear out the boss information
                    let child = it.value;
                    let bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
                    if (bossText === null) return;
                    bossText['text'] = "";
                }
            } else if (part instanceof go.Link) {
                let child = part.toNode;
                let bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
                if (bossText === null) return;
                bossText['text'] = "";
            }
            this.diagram.commitTransaction("clear boss");
        });
    }

    protected commitNodes() {
        go.TreeLayout.prototype.commitNodes.call(this.diagram.layout);  // do the standard behavior
        // then go through all of the vertexes and set their corresponding node's Shape.fill
        // to a brush dependent on the TreeVertex.level value
        this.diagram.layout.network.vertexes.each((v) => {
            if (v.node) {
                let level = v.level % (this.levelColors.length);
                let color = this.levelColors[level];
                let shape = v.node.findObject("SHAPE");
                if (shape) shape.fill = this.maker(go.Brush, "Linear", {
                    0: color,
                    1: go.Brush.lightenBy(color, 0.05),
                    start: go.Spot.Left,
                    end: go.Spot.Right
                });
            }
        });
    }

    /**
     *
     * @return {any}
     */
    protected baseContextRemoveNodes() {
        return this.maker(go.Adornment, "Vertical",
            this.maker("ContextMenuButton",
                this.maker(go.TextBlock, "Удалить ветку"),
                {
                    click: (e, obj) => {
                        // reparent the subtree to this node's boss, then remove the node
                        let node = obj.part.adornedPart;
                        if (node !== null) {
                            this.diagram.startTransaction("reparent remove");
                            let chl = node.findTreeChildrenNodes();
                            // iterate through the children and set their parent key to our selected node's parent key
                            while (chl.next()) {
                                let emp = chl.value;
                                this.diagram.model.setParentKeyForNodeData(emp.data, node.findTreeParentNode().data.key);
                            }

                            this.removeItem(node.data);

                            // and now remove the selected node itself
                            this.diagram.model.removeNodeData(node.data);

                            this.diagram.commitTransaction("reparent remove");
                        }
                    }
                }
            ),
            this.maker("ContextMenuButton",
                this.maker(go.TextBlock, "Удалить дерево"),
                {
                    click: (e, obj) => {
                        // remove the whole subtree, including the node itself
                        let node = obj.part.adornedPart;
                        if (node !== null) {
                            this.diagram.startTransaction("remove dept");

                            const parts = node.findTreeParts();

                            parts.map(part => {
                                this.removeItem(part.data);
                            });

                            this.diagram.removeParts(parts);
                            this.diagram.commitTransaction("remove dept");
                        }
                    }
                }
            )
        );
    }

    /**
     *
     * @param e
     * @param obj
     * @return {any}
     */
    protected doubleClickInsertNode(e, obj): any {
        let clicked = obj.part;
        if (clicked !== null) {
            let parentNodeData = clicked.data;
            this.diagram.startTransaction("add node");
            let node = this.getNode(this.getNextKey(), this.exampleNode, parentNodeData.key);
            this.diagram.model.addNodeData(node);
            this.diagram.commitTransaction("add node");
            return {parentNode: parentNodeData, node: node};
        }

        return null;
    }

    /**
     *
     * @return {number}
     */
    protected getNextKey(): number {
        let key = this.nodeIdCounter;
        while (this.diagram.model.findNodeDataForKey(key) !== null) {
            key = this.nodeIdCounter--;
        }
        return key;
    }

    protected addIndicatorDiagramModified() {
        // when the document is modified, add a "*" to the title and enable the "Save" button
        this.diagram.addDiagramListener("Modified", (e) => {
            let idx = document.title.indexOf("*");
            if (this.diagram.isModified) {
                if (idx < 0) document.title += "*";
            } else {
                if (idx >= 0) document.title = document.title.substr(0, idx);
            }
        });
    }

    /**
     * this is used to determine feedback during drags
     *
     * @param node1
     * @param node2
     * @return {boolean}
     */
    private mayWorkFor(node1, node2) {
        if (!(node1 instanceof go.Node)) return false;  // must be a Node
        if (node1 === node2) return false;  // cannot work for yourself
        if (node2.isInTreeOf(node1)) return false;  // cannot work for someone who works for you
        return true;
    }

    protected makeRelinkableNodes() {
        return { // handle dragging a Node onto a Node to (maybe) change the reporting relationship
            mouseDragEnter: (e, node, prev) => {
                let diagram = node.diagram;
                let selnode = diagram.selection.first();
                if (!this.mayWorkFor(selnode, node)) return;
                let shape = node.findObject("SHAPE");
                if (shape) {
                    shape._prevFill = shape.fill;  // remember the original brush
                    shape.fill = "darkred";
                }
            },
            mouseDragLeave: (e, node, next) => {
                let shape = node.findObject("SHAPE");
                if (shape && shape._prevFill) {
                    shape.fill = shape._prevFill;  // restore the original brush
                }
            },
            mouseDrop: (e, node) => {
                let diagram = node.diagram;
                let selectionNode = diagram.selection.first();  // assume just one Node in selection
                if (this.mayWorkFor(selectionNode, node)) {
                    // find any existing link into the selected node
                    let link = selectionNode.findTreeParentLink();
                    if (link !== null) {  // reconnect any existing link
                        link.fromNode = node;
                    } else {  // else create a new link
                        diagram.toolManager.linkingTool.insertLink(node, node.port, selectionNode, selectionNode.port);
                    }
                }
            }
        }
    }

    /**
     *
     * @param schema
     */
    initDiagram(schema: any) {
    }

    /**
     *
     * @return {{diagram: any, palette: Array<Object>}}
     */
    getModel() {
        return {
            diagram: JSON.parse(this.diagram.model.toJson()),
            palette: this.items
        };
    }

    /**
     *
     * @return {string}
     */
    hash() {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };

        return `${s4()}${s4()}-${s4()}-${s4()}-
            ${s4()}-${s4()}${s4()}${s4()}`;
    }

    /**
     *
     */
    destroy() {
        this.diagram.div = null;
        this.diagram.model.clear();
        this.diagram = null;
        this.model.nodeDataArray = [];
        this.model.linkDataArray = [];
    }

    /**
     *
     * @param node
     * @return {undefined|Object}
     */
    itemContains(node: Object): Object | undefined {
        return this.items.find(_node => _node['key'] === node['key']);
    }

    /**
     *
     * @param {go.Node} node
     * @param {go.Diagram} diagram
     */
    highlight(node: go.Node, diagram: go.Diagram) {  // may be null
        let oldSkips = diagram.skipsUndoManager;
        diagram.skipsUndoManager = true;
        diagram.startTransaction("highlight");
        if (node !== null) {
            diagram.highlight(node);
        } else {
            diagram.clearHighlighteds();
        }
        diagram.commitTransaction("highlight");
        diagram.skipsUndoManager = oldSkips;
    }

    /**
     *
     * @param items
     */
    initItems(items) {
        this.items = items;
        this.itemsSource.next(this.items);
    }

    /**
     *
     * @param node
     */
    addItem(node: Object) {
        this.items.push(node);
        this.itemsSource.next(this.items);
    }

    /**
     *
     * @param node
     */
    removeItem(node) {
        this.items = this.items.filter(_node => node !== _node);
        this.itemsSource.next(this.items);
    }

    /**
     *
     * @return {any}
     */
    getDiagram() {
        return this.diagram;
    }

}