import {Schema} from "../../../course/components/schema/schema";

export interface DiagramInterface {
    initDiagram(schema: Schema);

    getModel ();
}