import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";

import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {SharedModule} from "../shared/shared.module";

import {ITPMModule} from "itpm-shared";
import {environment} from "../../environments/environment";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      routeName: 'dashboard'
    },
    children: [
      {
       path: 'courses',
       loadChildren: './../course/course.module#CourseModule',
       },
      /*{
       path: 'statistics',
       loadChildren: './../statistic/statistic.module#StatisticModule'
       },*/
      {
        path: 'definitions',
        loadChildren: './../definition/definition.module#DefinitionModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    SharedModule,

    ITPMModule.forRoot(environment)
  ],
  providers: [],
  declarations: [
    DashboardComponent,
    NavigationComponent,
    SidebarComponent,
  ]
})
export class PanelModule {
}
