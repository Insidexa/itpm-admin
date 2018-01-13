export class BaseItem {
    id: number;
    name: string = '';
    description: string = '';
    deleted_at: string | Date | null;

    [key: string]: any;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}