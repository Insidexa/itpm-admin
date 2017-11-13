import * as go from "gojs";
import {ElementRef} from "@angular/core";
import Diagram from "../../../../course/components/schema/diagram/types/Diagram";
import {Schema} from "../../../../course/components/schema/schema";

export class ResultWBSOBS extends Diagram {
    model = {
        "class": "go.TreeModel",
        "nodeDataArray": []
    };

    /**
     *
     * @param diagramContainer
     */
    constructor(diagramContainer: ElementRef) {
        super();

        this.div = diagramContainer.nativeElement;
        this.maker = go.GraphObject.make;
        let self = this;

        this.diagram =
            this.maker(go.Diagram, this.div, // must be the ID or reference to div
                {
                    allowClipboard: false,
                    allowCopy: false,
                    allowDelete: false,
                    allowDragOut: false,
                    allowDrop: false,
                    allowGroup: false,
                    allowInsert: false,
                    allowLink: false,
                    allowMove: false,
                    allowRelink: false,
                    allowTextEdit: false,

                    initialContentAlignment: go.Spot.Center,
                    maxSelectionCount: 1, // users can select only one part at a time
                    validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
                    "clickCreatingTool.archetypeNodeData": {}, // allow double-click in background to create a new node
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
                    "undoManager.isEnabled": false // enable undo & redo
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

        // override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
        this.diagram.layout.commitNodes = () => {
            go.TreeLayout.prototype.commitNodes.call(this.diagram.layout);  // do the standard behavior
            // then go through all of the vertexes and set their corresponding node's Shape.fill
            // to a brush dependent on the TreeVertex.level value
            this.diagram.layout.network.vertexes.each((v) => {
                if (v.node) {
                    let level = v.level % (self.levelColors.length);
                    let color = self.levelColors[level];
                    let shape = v.node.findObject("SHAPE");
                    if (shape) {

                        shape.fill = this.maker(go.Brush, "Linear", {
                            0: color,
                            1: go.Brush.lightenBy(color, 0.05),
                            start: go.Spot.Left,
                            end: go.Spot.Right
                        });

                        if (shape.part.data.dropped) {
                            shape.stroke = 'orange';
                            shape.strokeWidth = 4;
                        }
                    }
                }
            });
        };

        // This function provides a common style for most of the TextBlocks.
        // Some of these values may be overridden in a particular TextBlock.
        function textStyle() {
            return {font: "9pt  Segoe UI,sans-serif", stroke: "white"};
        }

        // define the Node template
        this.diagram.nodeTemplate =
            this.maker(go.Node, "Auto",
                { // handle dragging a Node onto a Node to (maybe) change the reporting relationship

                },
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
                        portId: "", fromLinkable: false, toLinkable: false, cursor: "pointer"
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
                            new go.Binding("text", "name", function (v, obj) {
                                if (obj['part']['data']['dropped'] && obj['part']['data']['result']['result'] === false) {
                                    return `Ответил ${obj['part']['data']['dropped_data']['name']}`;
                                }
                                return v;
                            })),
                        this.maker(go.TextBlock, textStyle(),
                            {row: 2, column: 0},
                            new go.Binding("text", "key", function (v, obj) {
                                if (obj['part']['data']['dropped']) {
                                    return `Ответ ${obj['part']['data']['result']['result'] ? 'правильный' : 'неправильный'}`;
                                }
                                return "ID: " + v;
                            })),
                        this.maker(go.TextBlock, textStyle(),
                            {row: 3, column: 0},
                            new go.Binding("text", "key", function (v, obj) {
                                if (obj['part']['data']['dropped'] && obj['part']['data']['result']['result'] === false) {
                                    return `Правильный ответ ${obj['part']['data']['result']['answer']['name']}`;
                                } else {
                                    return '';
                                }
                            }))
                    )  // end Table Panel
                ) // end Horizontal Panel
            );  // end Node

        // define the Link template
        this.diagram.linkTemplate =
            this.maker(go.Link, go.Link.Orthogonal,
                {corner: 5, relinkableFrom: false, relinkableTo: false},
                this.maker(go.Shape, {strokeWidth: 4, stroke: "#00a4a4"}));  // the link shape

        // window['PIXELRATIO'] = this.diagram.computePixelRatio();
    }

    /**
     *
     * @param schema
     */
    initDiagram(schema: Schema) {
        this.diagram.model = go.Model.fromJson(schema.diagram);
        this.initItems(schema.palette);
    }

}