import * as go from "gojs";
import {Schema} from "../../schema";
import * as I from "./DiagramInterface";
import {Subject} from "rxjs/Subject";

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

    model = {
        "class": "go.TreeModel",
        "nodeDataArray": [

        ]
    };
    palette: go.Palette;

    /**
     *
     * @param schema
     */
    initDiagram(schema: Schema) {}

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

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    /**
     *
     * @param node
     * @return {undefined|Object}
     */
    itemContains (node: Object): Object|undefined {
        return this.items.find(_node => _node['hash'] === node['hash']);
    }

    /**
     *
     * @param node
     * @param diagram
     */
    highlight(node: go.Node, diagram: go.Diagram) {  // may be null
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

    /**
     *
     * @param items
     */
    initItems (items) {
        this.items = items;
        this.itemsSource.next(this.items);
    }

    /**
     *
     * @param node
     */
    addItem (node: Object) {
        this.items.push(node);
        this.itemsSource.next(this.items);
    }

    /**
     *
     * @param node
     */
    removeItem (node) {
        this.items = this.items.filter(_node => node !== _node);
        this.itemsSource.next(this.items);
    }

}