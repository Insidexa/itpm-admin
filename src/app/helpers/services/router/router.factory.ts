import {ChildrenOutletContexts, Router, Routes, UrlSerializer} from "@angular/router";
import {Compiler, Injectable, Injector, NgModuleFactoryLoader, Type} from "@angular/core";
import { Location } from '@angular/common';
import {NamedRouteService} from "../../named-route/named-route.service";
import {MyRouter} from "./my-router.service";

export function MyRouterFactory (rootComponentType: Type<any> | null, urlSerializer: UrlSerializer, rootContexts: ChildrenOutletContexts, location: Location, injector: Injector, loader: NgModuleFactoryLoader, compiler: Compiler, config: Routes, NamedRouteService: NamedRouteService) {
    return new MyRouter(rootComponentType, urlSerializer, rootContexts, location, injector, loader, compiler, config, NamedRouteService);
}