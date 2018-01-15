import * as go from "gojs";
import Diagram from "./Diagram";
import {ElementRef} from "@angular/core";
import {Schema} from "../../../course/components/schema/schema";

export class WBSOBS extends Diagram {

    protected exampleNode: any = {
        name: "(название)",
        title: "",
        //hash: this.hash()
    };

    /**
     *
     * @param diagramContainer
     */
    constructor(diagramContainer: ElementRef) {
        super(diagramContainer);

        this.initExampleNodes();

        let self = this;

        this.diagram =
            this.maker(go.Diagram, this.div, // must be the ID or reference to div
                {
                    initialContentAlignment: go.Spot.Center,
                    maxSelectionCount: 1, // users can select only one part at a time
                    validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
                    "clickCreatingTool.archetypeNodeData": {}, // allow double-click in background to create a new node
                    "clickCreatingTool.insertPart": function (loc) {  // customize the data for the new node
                        this.archetypeNodeData = self.getNode(self.getNextKey(), self.exampleNode);
                        return go.ClickCreatingTool.prototype.insertPart.call(this, loc);
                    },
                    layout: this.maker(go.TreeLayout,
                        {
                            treeStyle: go.TreeLayout.StyleLastParents,
                            arrangement: go.TreeLayout.ArrangementHorizontal,
                            // properties for most of the tree:
                            angle: 90,
                            layerSpacing: 35,
                            // properties for the "last parents":
                            alternateAngle: 90,
                            alternateLayerSpacing: 35,
                            alternateAlignment: go.TreeLayout.AlignmentBus,
                            alternateNodeSpacing: 20
                        }),
                    "undoManager.isEnabled": true // enable undo & redo
                });

        this.addIndicatorDiagramModified();

        this.selectionDeleting();

        // override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
        this.diagram.layout.commitNodes = this.commitNodes.bind(this);

        // This function provides a common style for most of the TextBlocks.
        // Some of these values may be overridden in a particular TextBlock.
        function textStyle() {
            return {font: "9pt  Segoe UI,sans-serif", stroke: "white"};
        }

        // define the Node template
        this.diagram.nodeTemplate =
            this.maker(go.Node, "Auto",
                {doubleClick: this.doubleClickInsertNode.bind(this)},
                this.makeRelinkableNodes(),
                // for sorting, have the Node.text be the data.name
                new go.Binding("text", "name"),
                // bind the Part.layerName to control the Node's layer depending on whether it isSelected
                new go.Binding("layerName", "isSelected", function (sel) {
                    return sel ? "Foreground" : "";
                }).ofObject(),
                // define the node's outer shape
                this.maker(go.Shape, "Rectangle",
                    {
                        name: "SHAPE", fill: "white", stroke: null,
                        // set the port properties:
                        portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
                    }),
                this.maker(go.Panel, "Horizontal",
                    // define the panel where the text will appear
                    this.maker(go.Panel, "Table",
                        {
                            maxSize: new go.Size(150, 999),
                            margin: new go.Margin(6, 10, 0, 3),
                            defaultAlignment: go.Spot.Left
                        },
                        this.maker(go.RowColumnDefinition, {column: 2, width: 4}),
                        this.maker(go.TextBlock, textStyle(),  // the name
                            {
                                row: 0, column: 0, columnSpan: 5,
                                font: "12pt Segoe UI,sans-serif",
                                editable: true, isMultiline: false,
                                minSize: new go.Size(10, 16)
                            },
                            new go.Binding("text", "name").makeTwoWay()),
                        this.maker(go.TextBlock, textStyle(),
                            {row: 2, column: 0},
                            new go.Binding("text", "key", function (v) {
                                return "ID: " + v;
                            })),
                        this.maker("CheckBox", "choice",
                            /*new go.Binding('text', 'choice', (value, obj) => {
                             console.log(obj['part'].data)
                             let node = obj['part'].data;

                             obj['part'].data.data.draggable = !!obj['part'].data.data.choice;

                             console.log(obj['part'].data.data)

                             if (value && !this.palette.model.containsNodeData(node)) {
                             this.palette.model.addNodeData(node);
                             } else {
                             if (this.palette.model.containsNodeData(node)) {
                             this.palette.model.removeNodeData(node);
                             }
                             }
                             }),*/
                            {
                                name: "CHOICE_HIDDEN",
                                row: 3,
                                column: 0,
                                "Button.width": 20,
                                "Button.height": 20,
                                "ButtonBorder.figure": "Circle",
                                "ButtonBorder.stroke": "blue",
                                "ButtonIcon.figure": "Circle",
                                "ButtonIcon.fill": "blue",
                                "ButtonIcon.strokeWidth": 0,
                                "ButtonIcon.desiredSize": new go.Size(10, 10)
                            },
                            this.maker(go.TextBlock, {
                                text: "hidden",
                                name: "CHECKBOXDA"
                            }),
                            {
                                "_doClick": (e, obj) => {

                                    let node = obj.part.data;
                                    let choice = obj.part.data.choice;

                                    // obj.part.data.draggable = !!obj.part.data.choice;
                                    if (choice && !this.itemContains(node)) {
                                        this.addItem(node);
                                    } else {
                                        let _node = this.itemContains(node);
                                        if (_node) {
                                            this.removeItem(_node);
                                        }
                                    }
                                }
                            }
                        ),
                    )  // end Table Panel
                ) // end Horizontal Panel
            );  // end Node

        // the context menu allows users to make a position vacant,
        // remove a role and reassign the subtree, or remove a department
        this.diagram.nodeTemplate.contextMenu = this.baseContextRemoveNodes();

        // define the Link template
        this.diagram.linkTemplate =
            this.maker(go.Link, go.Link.Orthogonal,
                {corner: 5, relinkableFrom: true, relinkableTo: true},
                this.maker(go.Shape, {strokeWidth: 4, stroke: "#00a4a4"}));  // the link shape

        window['PIXELRATIO'] = this.diagram.computePixelRatio();
    }

    private initExampleNodes () {
        this.model.nodeDataArray.push({"key": 1, "name": "some name", "title": "title", });
    }

    /**
     *
     * @param schema
     */
    initDiagram(schema: Schema) {
        this.diagram.model = go.Model.fromJson(schema.diagram);
        this.initItems(schema.palette);

        this.div.addEventListener('dragover', (event) => {
            let can = event.target;
            let pixelratio = window['PIXELRATIO'];

            // if the target is not the canvas, we may have trouble, so just quit:
            if (!(can instanceof HTMLCanvasElement)) return;

            let bbox = can.getBoundingClientRect();
            let bbw = bbox.width;
            if (bbw === 0) bbw = 0.001;
            let bbh = bbox.height;
            if (bbh === 0) bbh = 0.001;
            let mx = event.clientX - bbox.left * ((can.width / pixelratio) / bbw);
            let my = event.clientY - bbox.top * ((can.height / pixelratio) / bbh);
            let point = this.diagram.transformViewToDoc(new go.Point(mx, my));
            let currentNode = this.diagram.findPartAt(point, true);
            if (currentNode instanceof go.Node) {
                console.log('focus on go.Node', currentNode.data)
                this.highlight(currentNode, this.diagram);
            } else {
                this.highlight(null, this.diagram);
            }

            if (event.target.className === "dropzone") {
                // Disallow a drop by returning before a call to preventDefault:
                return;
            }

            // Allow a drop on everything else
            event.preventDefault();

        }, false);

    }

}