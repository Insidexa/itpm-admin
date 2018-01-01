
import {Unit} from "../../../course/components/unit/unit/unit";
import {User} from "../../../home/user";
import {Answer} from "../../../course/components/test/answer";
import {Question} from "../../../course/components/test/question";

export interface IDiagram {
    'class': string;
    nodeDataArray: Array<any>;
    palette?: Array<any>;
}

export interface ISchema {
    created_at: string;
    id: number;
    type: string;
    diagram: IDiagram;
    examination_info_id: number;
    schema_id: number;
    updated_at: string;
}

export interface IQuestion {
    answer: Answer;
    answer_id: number;
    correct_answer: Answer;
    correct_answer_id: number;
    examination_info_id: number;
    id: number;
    question: Question;
    question_id: number;
}

export interface IResult {
    created_at: string;
    current_tab: number;
    id: number;
    schema: ISchema;
    status: number;
    test: Array<IQuestion>;
    unit: Unit
    unit_id: number;
    updated_at: string;
    user: User;
    user_id: number;
    uuid: string;
}