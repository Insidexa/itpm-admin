import { Component, OnInit } from '@angular/core';
import {User} from "./user";
import {AuthService} from "../shared/services/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:User;

  constructor(
      private httpService: AuthService,
      private auth: AuthService,
      private router: Router
  ) {
    this.user = new User();
  }

  ngOnInit() {
    if (this.auth.isAuth()) {
      this.router.navigate(['/panel']);
    }
  }

  onSubmit() {
    this.httpService.auth(this.user).subscribe(data => {
      this.router.navigate(['/panel']);
    });
  }

}
