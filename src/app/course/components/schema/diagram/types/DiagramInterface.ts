import {Schema} from "../../schema";

export interface DiagramInterface {
    initDiagram(schema: Schema);

    getModel ();
}