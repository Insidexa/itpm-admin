export class Schema {
    id: number;
    type: string;
    unit_id: number;
    palette: Array<Object> = [];
    diagram: Object = {'class': 'go.TreeModel', nodeDataArray: [], };

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}