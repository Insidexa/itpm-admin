import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import "rxjs/operator/map";

import {LessonService} from "./lesson/lesson.service";
import {IPagination, PaginationService, Lesson} from "itpm-shared";

@Component({
  selector: `lessons`,
  templateUrl: `./lessons.component.html`,
  providers: [PaginationService]
})
export class LessonsComponent implements OnInit {
  public lesson: Lesson = new Lesson();

  constructor(private LessonService: LessonService,
              private ActivatedRoute: ActivatedRoute,
              public lessons: PaginationService<Lesson>) {
  }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(params => {
      const courseId: number = +params['id'];
      this.lesson.course_id = courseId;
      this.LessonService.all(courseId).subscribe((lessons: IPagination<Lesson>) => {
        this.lessons.update(lessons);
      });
    })
  }

  addLesson(lesson: Lesson) {
    this.LessonService.store(lesson).subscribe((lesson: Lesson) => {
      this.lessons.addToCollection(lesson);
    });
  }

  removeLesson(id: number) {
    this.LessonService.delete(id).subscribe(() => {
      this.lessons.removeFromCollection(id);
    });
  }

  restoreLesson(id: number) {
    this.LessonService.restore(id).subscribe(() => {
      // this.lessons.remove(id);
    });
  }
}