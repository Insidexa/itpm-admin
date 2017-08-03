export class Theory {
    id: number;
    iframe: string;
    unit_id: number;
    file: any;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}