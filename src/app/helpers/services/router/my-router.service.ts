import {ChildrenOutletContexts, Router, Routes, UrlSerializer} from "@angular/router";
import {Compiler, Injectable, Injector, NgModuleFactoryLoader, Type} from "@angular/core";
import { Location } from '@angular/common';
import {NamedRouteService} from "../../named-route/named-route.service";

@Injectable()
export class MyRouter extends Router {
    constructor(rootComponentType: Type<any> | null, urlSerializer: UrlSerializer, rootContexts: ChildrenOutletContexts, location: Location, injector: Injector, loader: NgModuleFactoryLoader, compiler: Compiler, config: Routes, private NamedRouteService: NamedRouteService) {
        super(rootComponentType, urlSerializer, rootContexts, location, injector, loader, compiler, config);
    }

    public navigateByName (name: string, routeParams?: Object) {
        const params = routeParams ? routeParams : {};
        const url = this.NamedRouteService.getRoute(name, params);
        return this.navigate([url]);
    }

}