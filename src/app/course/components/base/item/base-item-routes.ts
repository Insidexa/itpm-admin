export interface IRouteBaseItem {
    name: string;
    params: Object|any;
}

export interface IRoutesBaseItem {
    child: IRouteBaseItem;
    edit: IRouteBaseItem;
}

export class RoutesBaseItem implements IRoutesBaseItem {
    child: IRouteBaseItem = {name: '', params: {}};
    edit: IRouteBaseItem = {name: '', params: {}};
}