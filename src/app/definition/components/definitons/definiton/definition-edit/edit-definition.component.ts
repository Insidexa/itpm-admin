import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {NamedRouteService, Definition} from "itpm-shared";
import {DefinitionService} from "../definition.service";

@Component({
  selector: `definition-course`,
  templateUrl: `./edit-definition.component.html`
})
export class EditDefinitionComponent implements OnInit {

  public definition: Definition = new Definition();

  constructor(private DefinitionService: DefinitionService,
              private route: ActivatedRoute,
              private NamedRouteService: NamedRouteService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.DefinitionService.course(+params['id']).subscribe((definition: Definition) => {
        this.definition = definition;
      });
    });
  }

  update(definition: Definition) {
    this.DefinitionService.update(definition).subscribe(() => {
      this.NamedRouteService.navigateByName('definitions');
    });
  }
}