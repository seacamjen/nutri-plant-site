import { Component, OnInit } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    console.log("Testing " + this.authService.isLoggedIn)
    if(this.authService.isLoggedIn === true) {
      this.router.navigate(['removal'])
    }
  }

  signIn(email: string, password: string) {
    this.authService.signIn(email, password)
    .then(() => {
      location.reload();
    })
    
  }

}
