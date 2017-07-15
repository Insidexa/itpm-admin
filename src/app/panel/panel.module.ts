import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'courses',
        loadChildren: './../course/course.module#CourseModule',
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
      RouterModule.forChild(routes)
  ],
  providers: [

  ],
  declarations: [
    DashboardComponent,
    NavigationComponent,
    SidebarComponent
  ]
})
export class PanelModule {}
