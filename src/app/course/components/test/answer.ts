export class Answer {
    id: number;
    name: string = '';
    question_id: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}