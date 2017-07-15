import {Answer} from "./answer";
export class Question {
    id: number;
    name: string = '';
    test_id: number;
    hash: string|number;
    answers: Array<Answer> = [];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}