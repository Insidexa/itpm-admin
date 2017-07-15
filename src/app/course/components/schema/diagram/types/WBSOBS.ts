import * as go from "gojs";

export default class WBSOBS implements DiagramInterface {
    maker: any;
    diagram: any;
    div;

    levelColors: Array<string> = ["#AC193D", "#2672EC", "#8C0095", "#5133AB", "#008299", "#D24726", "#008A00", "#094AB2"];

    model = {
        "class": "go.TreeModel",
        "nodeDataArray": [
            {"key": 1, "name": "some name", "title": "title", 'hash': this.hash()},
            {"key": 2, "name": "Luke Warm", "title": "VP Marketing/Sales", "parent": 1, 'hash': this.hash()},
            {"key": 3, "name": "Meg Meehan Hoffa", "title": "Sales", "parent": 2},
            {"key": 4, "name": "Peggy Flaming", "title": "VP Engineering", "parent": 1},
            {"key": 5, "name": "Saul Wellingood", "title": "Manufacturing", "parent": 4},
            {"key": 6, "name": "Al Ligori", "title": "Marketing", "parent": 2},
            {"key": 7, "name": "Dot Stubadd", "title": "Sales Rep", "parent": 3},
            {"key": 8, "name": "Les Ismore", "title": "Project Mgr", "parent": 5},
            {"key": 9, "name": "April Lynn Parris", "title": "Events Mgr", "parent": 6},
            {"key": 10, "name": "Xavier Breath", "title": "Engineering", "parent": 4},
            {"key": 11, "name": "Anita Hammer", "title": "Process", "parent": 5},
            {"key": 12, "name": "Billy Aiken", "title": "Software", "parent": 10},
            {"key": 13, "name": "Stan Wellback", "title": "Testing", "parent": 10},
            {"key": 14, "name": "Marge Innovera", "title": "Hardware", "parent": 10},
            {"key": 15, "name": "Evan Elpus", "title": "Quality", "parent": 5},
            {"key": 16, "name": "Lotta B. Essen", "title": "Sales Rep", "parent": 3}
        ]
    };
    palette: go.Palette;

    constructor(diagramContainer: any) {
        this.div = diagramContainer.nativeElement;
        this.maker = go.GraphObject.make;
        let self = this;

        let $ = go.GraphObject.make;
        this.diagram =
            $(go.Diagram, this.div, // must be the ID or reference to div
                {
                    initialContentAlignment: go.Spot.Center,
                    maxSelectionCount: 1, // users can select only one part at a time
                    validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
                    "clickCreatingTool.archetypeNodeData": {}, // allow double-click in background to create a new node
                    "clickCreatingTool.insertPart": function (loc) {  // customize the data for the new node
                        this.archetypeNodeData = {
                            key: getNextKey(), // assign the key based on the number of nodes
                            name: "(название)",
                            title: "",
                            hash: self.hash()
                        };
                        return go.ClickCreatingTool.prototype.insertPart.call(this, loc);
                    },
                    layout: $(go.TreeLayout,
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

        // when the document is modified, add a "*" to the title and enable the "Save" button
        this.diagram.addDiagramListener("Modified", (e) => {
            let idx = document.title.indexOf("*");
            if (this.diagram.isModified) {
                if (idx < 0) document.title += "*";
            } else {
                if (idx >= 0) document.title = document.title.substr(0, idx);
            }
        });

        // manage boss info manually when a node or link is deleted from the diagram
        this.diagram.addDiagramListener("SelectionDeleting", (e) => {
            let part = e.subject.first(); // e.subject is the myDiagram.selection collection,
                                          // so we'll get the first since we know we only have one selection
            this.diagram.startTransaction("clear boss");
            if (part instanceof go.Node) {
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

        // override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
        this.diagram.layout.commitNodes = () => {
            go.TreeLayout.prototype.commitNodes.call(this.diagram.layout);  // do the standard behavior
            // then go through all of the vertexes and set their corresponding node's Shape.fill
            // to a brush dependent on the TreeVertex.level value
            this.diagram.layout.network.vertexes.each(function (v) {
                if (v.node) {
                    let level = v.level % (self.levelColors.length);
                    let color = self.levelColors[level];
                    let shape = v.node.findObject("SHAPE");
                    if (shape) shape.fill = $(go.Brush, "Linear", {
                        0: color,
                        1: go.Brush.lightenBy(color, 0.05),
                        start: go.Spot.Left,
                        end: go.Spot.Right
                    });
                }
            });
        };

        // This function is used to find a suitable ID when modifying/creating nodes.
        // We used the counter combined with findNodeDataForKey to ensure uniqueness.
        function getNextKey() {
            let key = nodeIdCounter;
            while (self.diagram.model.findNodeDataForKey(key) !== null) {
                key = nodeIdCounter--;
            }
            return key;
        }

        let nodeIdCounter = -1; // use a sequence to guarantee key uniqueness as we add/remove/modify nodes

        // when a node is double-clicked, add a child to it
        function nodeDoubleClick(e, obj) {
            let clicked = obj.part;
            if (clicked !== null) {
                let thisemp = clicked.data;
                self.diagram.startTransaction("add employee");
                let newemp = {key: getNextKey(), name: "(название)", title: "", parent: thisemp.key, hash: self.hash()};
                self.diagram.model.addNodeData(newemp);
                self.diagram.commitTransaction("add employee");
            }
        }

        // this is used to determine feedback during drags
        function mayWorkFor(node1, node2) {
            if (!(node1 instanceof go.Node)) return false;  // must be a Node
            if (node1 === node2) return false;  // cannot work for yourself
            if (node2.isInTreeOf(node1)) return false;  // cannot work for someone who works for you
            return true;
        }

        // This function provides a common style for most of the TextBlocks.
        // Some of these values may be overridden in a particular TextBlock.
        function textStyle() {
            return {font: "9pt  Segoe UI,sans-serif", stroke: "white"};
        }

        // define the Node template
        this.diagram.nodeTemplate =
            $(go.Node, "Auto",
                {doubleClick: nodeDoubleClick},
                { // handle dragging a Node onto a Node to (maybe) change the reporting relationship
                    mouseDragEnter: function (e, node, prev) {
                        let diagram = node.diagram;
                        let selnode = diagram.selection.first();
                        if (!mayWorkFor(selnode, node)) return;
                        let shape = node.findObject("SHAPE");
                        if (shape) {
                            shape._prevFill = shape.fill;  // remember the original brush
                            shape.fill = "darkred";
                        }
                    },
                    mouseDragLeave: function (e, node, next) {
                        let shape = node.findObject("SHAPE");
                        if (shape && shape._prevFill) {
                            shape.fill = shape._prevFill;  // restore the original brush
                        }
                    },
                    mouseDrop: function (e, node) {
                        let diagram = node.diagram;
                        let selnode = diagram.selection.first();  // assume just one Node in selection
                        if (mayWorkFor(selnode, node)) {
                            // find any existing link into the selected node
                            let link = selnode.findTreeParentLink();
                            if (link !== null) {  // reconnect any existing link
                                link.fromNode = node;
                            } else {  // else create a new link
                                diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
                            }
                        }
                    }
                },
                // for sorting, have the Node.text be the data.name
                new go.Binding("text", "name"),
                // bind the Part.layerName to control the Node's layer depending on whether it isSelected
                new go.Binding("layerName", "isSelected", function (sel) {
                    return sel ? "Foreground" : "";
                }).ofObject(),
                // define the node's outer shape
                $(go.Shape, "Rectangle",
                    {
                        name: "SHAPE", fill: "white", stroke: null,
                        // set the port properties:
                        portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
                    }),
                $(go.Panel, "Horizontal",
                    // define the panel where the text will appear
                    $(go.Panel, "Table",
                        {
                            maxSize: new go.Size(150, 999),
                            margin: new go.Margin(6, 10, 0, 3),
                            defaultAlignment: go.Spot.Left
                        },
                        $(go.RowColumnDefinition, {column: 2, width: 4}),
                        $(go.TextBlock, textStyle(),  // the name
                            {
                                row: 0, column: 0, columnSpan: 5,
                                font: "12pt Segoe UI,sans-serif",
                                editable: true, isMultiline: false,
                                minSize: new go.Size(10, 16)
                            },
                            new go.Binding("text", "name").makeTwoWay()),
                        $(go.TextBlock, textStyle(),
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

                                    obj.part.data.draggable = !!obj.part.data.choice;

                                    if (choice && !this.palette.model.containsNodeData(node)) {
                                        this.palette.model.addNodeData(node);
                                    } else {
                                        if (this.palette.model.containsNodeData(node)) {
                                            this.palette.model.removeNodeData(node);
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
        this.diagram.nodeTemplate.contextMenu =
            $(go.Adornment, "Vertical",
                $("ContextMenuButton",
                    $(go.TextBlock, "Удалить ветку"),
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
                                // and now remove the selected node itself
                                this.diagram.model.removeNodeData(node.data);
                                this.diagram.commitTransaction("reparent remove");
                            }
                        }
                    }
                ),
                $("ContextMenuButton",
                    $(go.TextBlock, "Удалить дерево"),
                    {
                        click: (e, obj) => {
                            // remove the whole subtree, including the node itself
                            let node = obj.part.adornedPart;
                            if (node !== null) {
                                this.diagram.startTransaction("remove dept");
                                this.diagram.removeParts(node.findTreeParts());
                                this.diagram.commitTransaction("remove dept");
                            }
                        }
                    }
                )
            );

        // define the Link template
        this.diagram.linkTemplate =
            $(go.Link, go.Link.Orthogonal,
                {corner: 5, relinkableFrom: true, relinkableTo: true},
                $(go.Shape, {strokeWidth: 4, stroke: "#00a4a4"}));  // the link shape

        this.diagram.model = go.Model.fromJson(this.model);

        this.palette = this.maker(
            go.Palette,
            "palette",
            {
                nodeTemplate: $(
                    go.Node,
                    "Horizontal",
                    $(
                        go.TextBlock,
                        {
                            font: "12pt  Segoe UI,sans-serif",
                            stroke: "black"
                        },
                        new go.Binding('text', 'name')
                    )
                ),
                model: new go.GraphLinksModel([])
            }
        );

    }

    hash() {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    getModel() {
        return {
            diagram: this.diagram.model.toJson(),
            palette: this.palette.model.toJson()
        };
    }

    initDiagram() {
        let self = this;
        this.diagram.model = go.Model.fromJson(this.model);
        this.div.nativeElement.addEventListener('dragover', function (event) {
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
            let point = self.diagram.transformViewToDoc(new go.Point(mx, my));
            let curnode = self.diagram.findPartAt(point, true);
            if (curnode instanceof go.Node) {
                console.log('focus on go.Node', curnode.data)
                self.highlight(curnode, self.diagram);
            } else {
                self.highlight(null, self.diagram);
            }

            if (event.target.className === "dropzone") {
                // Disallow a drop by returning before a call to preventDefault:
                return;
            }

            // Allow a drop on everything else
            event.preventDefault();

        }, false);

    }

    highlight(node, diagram) {  // may be null
        let oldskips = diagram.skipsUndoManager;
        diagram.skipsUndoManager = true;
        diagram.startTransaction("highlight");
        if (node !== null) {
            diagram.highlight(node);
        } else {
            diagram.clearHighlighteds();
        }
        diagram.commitTransaction("highlight");
        diagram.skipsUndoManager = oldskips;
    }


}