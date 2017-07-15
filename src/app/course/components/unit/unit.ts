
import {Theory} from "../theory/theory";
import {Test} from "../test/test";
import {Schema} from "../schema/schema";
export class Unit {
    id: number;
    name: string = '';
    description: string = '';
    lesson_id: number;
    theory: Theory;
    test: Test;
    schema: Schema;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}