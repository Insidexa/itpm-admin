import {Injectable} from "@angular/core";
import {HttpService} from "../../../http.service";
import {Test} from "./test";
import {Observable} from "rxjs/Observable";
import {Response} from "@angular/http";
import {Question} from "./question";
import {Answer} from "./answer";

@Injectable()
export class TestService {
    private prefix: string;
    private api: string;
    private maxQuestions = 10;
    private maxAnswers = 4;

    constructor(private http: HttpService) {
        this.prefix = 'test/';
        this.api = `${this.http.adminPrefix}${this.prefix}`;
    }

    public guid(): string {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    initializeTest (unitId: number): Test {
        let test = new Test();
        test.unit_id = unitId;

        for (let i = 0; i < this.maxQuestions; ++i) {
            let question = new Question();
            question.name = `question ${i + 1}`;

            for (let k = 0; k < this.maxAnswers; ++k) {
                let answer = new Answer();
                answer.name = `answer ${k + 1}`;
                question.answers.push(answer)
            }

            question.answer_id = null;

            test.questions.push(question);
        }

        return test;
    }

    fillableTest (data: Test) : Test {
        let test = new Test(data);

        test.questions = [];

        data.questions.forEach((_question: Question) => {
             let question = new Question(_question);

             question.answers = [];

             _question.answers.forEach((_answer: Answer) => {
                 const answer = new Answer(_answer);

                 question.answers.push(answer);
             });

             test.questions.push(question);

        });

        return test;
    }

    store(test: Test): Observable<Test> {
        return this.http.post(`${this.api}`, test).map((data: Response) => {
            return this.fillableTest(data.json());
        });
    }
}