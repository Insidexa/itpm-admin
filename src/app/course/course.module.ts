import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {CourseComponent} from "./components/course/course/course.component";
import {LessonComponent} from "./components/lesson/lesson/lesson.component";
import {UnitComponent} from "./components/unit/unit/unit.component";
import {TheoryComponent} from "./components/theory/theory.component";
import {TestComponent} from "./components/test/test.component";
import {CoursesComponent} from "./components/course/courses.component";
import {EditCourseComponent} from "./components/course/course/course-edit/edit-course.component";
import {EditLessonComponent} from "./components/lesson/lesson-edit/edit-lesson.component";
import {EditUnitComponent} from "./components/unit/unit-edit/edit-unit.component";
import {CourseService} from "./components/course/course/course.service";
import {LessonService} from "./components/lesson/lesson/lesson.service";
import {UnitService} from "./components/unit/unit/unit.service";
import {TheoryService} from "./components/theory/theory.service";
import {TestService} from "./components/test/test.service";
import {SchemaPageComponent} from "./components/schema/schema-page.component";
import {SchemaPageService} from "./components/schema/schema-page.service";
import {CourseFormComponent} from "./components/course/course/course-form/course-form.component";
import {LessonFormComponent} from "./components/lesson/lesson-form/lesson-form.component";
import {LessonsComponent} from "./components/lesson/lessons.component";
import {UnitsComponent} from "./components/unit/units.component";
import {UnitFormComponent} from "./components/unit/unit-form/unit-form.component";
import {UnitPageComponent} from "./components/unit/unit-page/unit-page.component";
import {SharedModule} from "../shared/shared.module";

import {
  AuthModule,
  InterceptorMessageModule,
  ITPMModule,
  NamedRouteModule,
  PaginationModule
} from "itpm-shared";
import {environment} from "../../environments/environment";

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    data: {
      routeName: 'courses'
    }
  },
  {
    path: ':id/edit',
    component: EditCourseComponent,
    data: {
      routeName: 'editCourse'
    }
  },
  {
    path: ':id/lessons',
    component: LessonsComponent,
    data: {
      routeName: 'lessons'
    }
  },
  {
    path: 'lessons/:id/edit',
    component: EditLessonComponent,
    data: {
      routeName: 'editLesson'
    }
  },
  {
    path: ':courseId/lessons/:id/units',
    component: UnitsComponent,
    data: {
      routeName: 'units'
    }
  },
  {
    path: 'units/:id/edit',
    component: EditUnitComponent,
    data: {
      routeName: 'editUnit'
    }
  },
  {
    path: ':courseId/lessons/:lessonId/units/:id',
    component: UnitPageComponent,
    data: {
      routeName: 'unitPage'
    },
    children: [
      {
        path: '',
        redirectTo: 'theory',
        pathMatch: 'full',
        data: {
          routeName: 'unit'
        }
      },
      {
        path: 'theory',
        component: TheoryComponent,
        data: {
          routeName: 'unitTheory'
        }
      },
      {
        path: 'schema',
        component: SchemaPageComponent,
        data: {
          routeName: 'unitSchema'
        }
      },
      {
        path: 'test',
        component: TestComponent,
        data: {
          routeName: 'unitTest'
        }
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),

    SharedModule,

    AuthModule,
    NamedRouteModule,
    PaginationModule.forRoot(environment),
    ITPMModule.forRoot(environment),
    InterceptorMessageModule
  ],
  providers: [
    CourseService,
    LessonService,
    UnitService,
    TheoryService,
    TestService,
    SchemaPageService,
  ],
  declarations: [
    CoursesComponent,
    CourseComponent,
    CourseFormComponent,
    EditCourseComponent,

    EditLessonComponent,
    LessonsComponent,
    LessonFormComponent,
    LessonComponent,

    UnitPageComponent,
    UnitsComponent,
    UnitFormComponent,
    EditUnitComponent,
    UnitComponent,

    TheoryComponent,
    TestComponent,
    SchemaPageComponent,
  ]
})
export class CourseModule {
}