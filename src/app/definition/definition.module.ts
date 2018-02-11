import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { DefinitionsComponent } from "./components/definitons/definitions.component";
import { DefinitionService } from "./components/definitons/definiton/definition.service";
import { DefinitionComponent } from "./components/definitons/definiton/definition.component";
import { EditDefinitionComponent } from "./components/definitons/definiton/definition-edit/edit-definition.component";
import { DefinitionFormComponent } from "./components/definitons/definiton/definition-form/definition-form.component";

import {
  ITPMModule,
  NamedRouteModule,
  PaginationModule,
  InterceptorMessageModule
} from "itpm-shared";
import { environment } from "../../environments/environment";

const routes: Routes = [
  {
    path: '',
    component: DefinitionsComponent,
    data: {
      routeName: 'definitions'
    }
  },
  {
    path: ':id/edit',
    component: EditDefinitionComponent,
    data: {
      routeName: 'editDefinition'
    }
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),

    NamedRouteModule,
    PaginationModule.forRoot(environment),
    ITPMModule.forRoot(environment),
    InterceptorMessageModule
  ],
  providers: [
    DefinitionService
  ],
  declarations: [
    DefinitionComponent,
    DefinitionsComponent,
    EditDefinitionComponent,
    DefinitionFormComponent
  ]
})
export class DefinitionModule {
}