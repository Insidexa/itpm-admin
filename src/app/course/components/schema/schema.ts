export class Schema {
    type: string;
    elements: Array<Object> = [];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}