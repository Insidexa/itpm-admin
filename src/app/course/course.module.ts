import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CourseComponent} from "./components/course/course.component";
import {LessonComponent} from "./components/lesson/lesson.component";
import {UnitComponent} from "./components/unit/unit.component";
import {TheoryComponent} from "./components/theory/theory.component";
import {TestComponent} from "./components/test/test.component";
import {CoursesComponent} from "./components/course/courses.component";
import {EditCourseComponent} from "./components/course/edit-course.component";
import {EditLessonComponent} from "./components/lesson/edit-lesson.component";
import {EditUnitComponent} from "./components/unit/edit-unit.component";
import {CourseService} from "./components/course/course.service";
import {LessonService} from "./components/lesson/lesson.service";
import {UnitService} from "./components/unit/unit.service";
import {TheoryService} from "./components/theory/theory.service";
import {TestService} from "./components/test/test.service";
import {SchemaComponent} from "./components/schema/schema.component";
import {SchemaService} from "./components/schema/schema.service";

const routes: Routes = [
    {
        path: 'cources',
        component: CoursesComponent,
    },
    {
        path: 'edit/:id',
        component: EditCourseComponent
    },
    {
        path: 'course/:id',
        component: CourseComponent,
    },
    {
        path: 'edit/lesson/:id',
        component: EditLessonComponent
    },
    {
        path: 'course/:courseId/lesson/:id',
        component: LessonComponent
    },
    {
        path: 'edit/unit/:id',
        component: EditUnitComponent
    },
    {
        path: 'course/:courseId/lesson/:lessonId/unit/:id',
        component: UnitComponent,
        children: [
            {
                path: '',
                redirectTo: 'theory',
                pathMatch: 'full'
            },
            {
                path: 'theory',
                component: TheoryComponent
            },
            {
                path: 'schema',
                component: SchemaComponent
            },
            {
                path: 'test',
                component: TestComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        CourseService,
        LessonService,
        UnitService,
        TheoryService,
        TestService,
        SchemaService
    ],
    declarations: [
        CoursesComponent,
        CourseComponent,
        EditCourseComponent,
        EditLessonComponent,
        LessonComponent,
        EditUnitComponent,
        UnitComponent,
        TheoryComponent,
        TestComponent,
        SchemaComponent
    ]
})
export class CourseModule {}