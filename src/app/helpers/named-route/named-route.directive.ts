import {Directive, ElementRef, HostListener, Input, OnInit} from "@angular/core";
import {NamedRouteService} from "./named-route.service";
import {Router} from "@angular/router";

@Directive({
    selector: '[namedRoute]'
})
export class NamedRouteDirective implements OnInit {

    @Input() namedRoute: string;
    @Input() namedRouteParams: any;

    @HostListener('click', ['$event']) onClick($event){
        $event.preventDefault();

        this.Router.navigateByUrl(this.url);
    }

    private url: string = null;

    constructor(private ElementRef: ElementRef,
                private Router: Router,
                private NamedRouteService: NamedRouteService) {}

    ngOnInit () {
        let params = this.namedRouteParams ? this.namedRouteParams : {};
        this.url = this.NamedRouteService.getRoute(this.namedRoute, params);
        this.ElementRef.nativeElement.href = this.url;
    }
}