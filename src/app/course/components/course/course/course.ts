import {Lesson} from "../../lesson/lesson/lesson";
import {BaseItem} from "../../base/item/base-item";

export class Course extends BaseItem {
    lessons: Array<Lesson> = [];

    constructor(values: Object = {}) {
        super(values);
    }
}