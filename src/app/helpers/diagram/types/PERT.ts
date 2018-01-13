import * as go from "gojs";
import Diagram from "./Diagram";
import {ElementRef} from "@angular/core";

export class PERT extends Diagram {

    private blue = "#0288D1";
    private pink = "#B71C1C";
    private pinkfill = "#F8BBD0";
    private bluefill = "#B3E5FC";

    protected exampleNode: any = {
        text: 'change text',
        length: 0,
        earlyStart: 0,
        lateFinish: 0,
        critical: false
    };

    /**
     *
     * @param {ElementRef} diagramContainer
     */
    constructor(diagramContainer: ElementRef) {
        super(diagramContainer);

        this.initExampleData();

        const self = this;

        this.diagram =
            this.maker(go.Diagram, this.div, // must be the ID or reference to div
                {
                    initialAutoScale: go.Diagram.Uniform,
                    initialContentAlignment: go.Spot.Center,
                    layout: this.maker(go.LayeredDigraphLayout),
                    "undoManager.isEnabled": true,

                    "clickCreatingTool.archetypeNodeData": {}, // allow double-click in background to create a new node
                    "clickCreatingTool.insertPart": function (loc) {  // customize the data for the new node
                        this.archetypeNodeData = self.getNode(self.getNextKey(), self.exampleNode);
                        return go.ClickCreatingTool.prototype.insertPart.call(this, loc);
                    },
                });

        this.addIndicatorDiagramModified();
        this.selectionDeleting();

        // define the Node template
        this.diagram.nodeTemplate = this.maker(go.Node, "Auto",
            {doubleClick: this.doubleClickInsertNode.bind(this)},
            this.makeRelinkableNodes(),
            this.maker(go.Shape, "Rectangle",  // the border
                {
                    name: 'SHAPE',
                    fill: "white", strokeWidth: 2,
                    fromLinkable: true, toLinkable: true
                },
                new go.Binding("fill", "critical", (b) => {
                    return (b ? this.pinkfill : this.bluefill );
                }),
                new go.Binding("stroke", "critical", (b) => {
                    return (b ? this.pink : this.blue);
                })),
            this.maker(go.Panel, "Table",
                {padding: 0.5},
                this.maker(go.RowColumnDefinition, {column: 1, separatorStroke: "black"}),
                this.maker(go.RowColumnDefinition, {column: 2, separatorStroke: "black"}),
                this.maker(go.RowColumnDefinition, {
                    row: 1,
                    separatorStroke: "black",
                    background: "white",
                    coversSeparators: true
                }),
                this.maker(go.RowColumnDefinition, {row: 2, separatorStroke: "black"}),
                this.maker(go.TextBlock, // earlyStart
                    new go.Binding("text", "earlyStart").makeTwoWay(),
                    {row: 0, column: 0, margin: 5, textAlign: "center", editable: true, isMultiline: false}),
                this.maker(go.TextBlock,
                    new go.Binding("text", "length").makeTwoWay(),
                    {row: 0, column: 1, margin: 5, textAlign: "center", editable: true, isMultiline: false}),
                this.maker(go.TextBlock,  // earlyFinish
                    new go.Binding("text", "",
                        (d) => {
                            return (d.earlyStart + d.length).toFixed(2);
                        }),
                    {row: 0, column: 2, margin: 5, textAlign: "center"}),

                this.maker(go.TextBlock,
                    new go.Binding("text", "text").makeTwoWay(),
                    {
                        row: 1, column: 0, columnSpan: 3, margin: 5,
                        textAlign: "center", font: "bold 14px sans-serif",
                        editable: true, isMultiline: false
                    }),

                this.maker(go.TextBlock,  // lateStart
                    new go.Binding("text", "",
                        (d) => {
                            return (d.lateFinish - d.length).toFixed(2);
                        }),
                    {row: 2, column: 0, margin: 5, textAlign: "center"}),
                this.maker(go.TextBlock,  // slack
                    new go.Binding("text", "",
                        (d) => {
                            return (d.lateFinish - (d.earlyStart + d.length)).toFixed(2);
                        }),
                    {row: 2, column: 1, margin: 5, textAlign: "center"}),
                this.maker(go.TextBlock, // lateFinish
                    new go.Binding("text", "lateFinish").makeTwoWay(),
                    {row: 2, column: 2, margin: 5, textAlign: "center", editable: true, isMultiline: false})
            )  // end Table Panel
        );  // end Node;  // end Node


        this.diagram.nodeTemplate.contextMenu = this.baseContextRemoveNodes();

        this.diagram.linkTemplate =
            this.maker(go.Link,
                {
                    toShortLength: 6, toEndSegmentLength: 20,
                    corner: 5, relinkableFrom: true, relinkableTo: true
                },
                this.maker(go.Shape,
                    {strokeWidth: 4},
                    new go.Binding("stroke", "", this.linkColorConverter)),
                this.maker(go.Shape,  // arrowhead
                    {toArrow: "Triangle", stroke: null, scale: 1.5},
                    new go.Binding("fill", "", this.linkColorConverter))
            );

        this.diagram.model = new go.GraphLinksModel(this.model.nodeDataArray, this.model.linkDataArray);

        this.diagram.add(
            this.maker(go.Node, "Auto",
                this.maker(go.Shape, "Rectangle",  // the border
                    {fill: this.bluefill}),
                this.maker(go.Panel, "Table",
                    this.maker(go.RowColumnDefinition, {column: 1, separatorStroke: "black"}),
                    this.maker(go.RowColumnDefinition, {column: 2, separatorStroke: "black"}),
                    this.maker(go.RowColumnDefinition, {
                        row: 1,
                        separatorStroke: "black",
                        background: this.bluefill,
                        coversSeparators: true
                    }),
                    this.maker(go.RowColumnDefinition, {row: 2, separatorStroke: "black"}),
                    this.maker(go.TextBlock, "Early Start (editable)",
                        {row: 0, column: 0, margin: 5, textAlign: "center"}),
                    this.maker(go.TextBlock, "Length (editable)",
                        {row: 0, column: 1, margin: 5, textAlign: "center"}),
                    this.maker(go.TextBlock, "Early Finish",
                        {row: 0, column: 2, margin: 5, textAlign: "center"}),
                    this.maker(go.TextBlock, "Activity Name (editable)",
                        {
                            row: 1, column: 0, columnSpan: 3, margin: 5,
                            textAlign: "center", font: "bold 14px sans-serif"
                        }),
                    this.maker(go.TextBlock, "Late Start",
                        {row: 2, column: 0, margin: 5, textAlign: "center"}),
                    this.maker(go.TextBlock, "Slack",
                        {row: 2, column: 1, margin: 5, textAlign: "center"}),
                    this.maker(go.TextBlock, "Late Finish (editable)",
                        {row: 2, column: 2, margin: 5, textAlign: "center"})
                )  // end Table Panel
            ));

    }

    public getModel() {
        let model = super.getModel();
        model.palette = null;

        return model;
    }

    /**
     *
     * @param e
     * @param obj
     * @return {null}
     */
    protected doubleClickInsertNode(e, obj) {
        const data = super.doubleClickInsertNode(e, obj);
        if (data) {
            this.diagram.model.addLinkData({from: data.parentNode.key, to: data.node.key});
        }

        return null;
    }

    /**
     *
     * @param linkdata
     * @param elt
     * @return {string}
     */
    public linkColorConverter(linkdata, elt) {
        let link = elt.part;
        if (!link) return this.blue;
        let f = link.fromNode;
        if (!f || !f.data || !f.data.critical) return this.blue;
        let t = link.toNode;
        if (!t || !t.data || !t.data.critical) return this.blue;
        return this.pink;  // when both Link.fromNode.data.critical and Link.toNode.data.critical
    }

    protected initExampleData() {
        this.model.nodeDataArray = [
            {key: 1, text: "Start", length: 0, earlyStart: 0, lateFinish: 0, critical: true},
            {key: 2, text: "a", length: 4, earlyStart: 0, lateFinish: 4, critical: true},
            {key: 3, text: "b", length: 5.33, earlyStart: 0, lateFinish: 9.17, critical: false},
            {key: 4, text: "c", length: 5.17, earlyStart: 4, lateFinish: 9.17, critical: true},
            {key: 5, text: "d", length: 6.33, earlyStart: 4, lateFinish: 15.01, critical: false},
            {key: 6, text: "e", length: 5.17, earlyStart: 9.17, lateFinish: 14.34, critical: true},
            {key: 7, text: "f", length: 4.5, earlyStart: 10.33, lateFinish: 19.51, critical: false},
            {key: 8, text: "g", length: 5.17, earlyStart: 14.34, lateFinish: 19.51, critical: true},
            {key: 9, text: "Finish", length: 0, earlyStart: 19.51, lateFinish: 19.51, critical: true}
        ];

        this.model.linkDataArray = [
            {from: 1, to: 2},
            {from: 1, to: 3},
            {from: 2, to: 4},
            {from: 2, to: 5},
            {from: 3, to: 6},
            {from: 4, to: 6},
            {from: 5, to: 7},
            {from: 6, to: 8},
            {from: 7, to: 9},
            {from: 8, to: 9}
        ];
    }
}