
import {Lesson} from "../../lesson/lesson/lesson";
export class Course {
    id: number;
    name: string = '';
    description: string = '';
    lessons: Array<Lesson> = [];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}