import {Injectable} from "@angular/core";
import {Route, Router} from "@angular/router";

let routes: any = {};

@Injectable()
export class NamedRouteService {
    constructor(private Router: Router) {
        if (Object.keys(routes).length === 0) {
            this.getRoutes('', this.Router.config);
        }
    }

    getRoutes(parent: String, config: Route[]) {
        for (let i = 0; i < config.length; i++) {
            let route: Route = config[i];
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
    }

    public getRoute(routeName: string, params: any) {
        if ( ! routes.hasOwnProperty(routeName) ) {
            throw new Error(`Route by routeName '${routeName}' not exists`);
        }

        let url = routes[routeName]['fullPath'];
        for (let param in params) {
            if (params.hasOwnProperty(param)) {
                url = url.replace(`:${param}`, params[param]);
            }
        }

        return url;
    }
}