import {Injectable} from "@angular/core";
import {Route, Router} from "@angular/router";

let routes: any = {};

@Injectable()
export class NamedRouteService {
    constructor(private Router: Router) {
        this.getRoutes('', this.Router.config);
    }

    private getRoutes(parent: string, config: Route[]) {
        const length = config.length;
        for (let i = 0; i < length; i++) {
            const route: Route = config[i];
            let fullPath = `${parent}/${route.path}`;

            fullPath = fullPath.replace('//', '/');

            if (route.data && route.data.routeName) {
                routes[route.data.routeName] = route;
                routes[route.data.routeName]['fullPath'] = fullPath;
            }

            if (route.loadChildren && route['_loadedConfig'] ) {
                this.getRoutes(fullPath, route['_loadedConfig'].routes)
            }

            if (route.children) {
                this.getRoutes(fullPath, route.children)
            }
        }

        return this;
    }

    public navigateByName (routeName: string, routeParams?: any) {
        const params = routeParams ? routeParams : {};
        const url = this.getRouteUrl(routeName, params);
        return this.Router.navigate([url]);
    }

    public getRouteData (routeName: string): any {
        if ( ! routes.hasOwnProperty(routeName) ) {
            throw new Error(`Route by routeName '${routeName}' not exists`);
        }

        return routes[routeName];
    }

    public getRouteUrl(routeName: string, params: any) {
        const routeData = this.getRouteData(routeName);

        let url = routeData['fullPath'];
        for (let param in params) {
            if (params.hasOwnProperty(param)) {
                url = url.replace(`:${param}`, params[param]);
            }
        }

        return url;
    }
}