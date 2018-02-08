import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {AuthService, User} from "itpm-shared";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(private AuthService: AuthService,
              private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    if (this.AuthService.isAuth()) {
      this.router.navigate(['/panel']);
    }
  }

  onSubmit() {
    this.AuthService.auth(this.user).subscribe(data => {
      this.router.navigate(['/panel']);
    });
  }

}
