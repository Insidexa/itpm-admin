export class Theory {
    id: number;
    iframe: string;
    unit_id: number;
    file: File|any;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}