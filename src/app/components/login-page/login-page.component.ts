import { Component } from '@angular/core';

import { LoginServiceService } from 'src/app/services/login-service.service'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
import { dataLogin } from 'src/app/models/requests/userDataLogin';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  public isButtonLogin: boolean = false
  public isButtonRegister: boolean = false

  public isErrorLogin: boolean = false

  private data: dataLogin = {
    username: "",
    password: ""
  }

  passFailed: boolean = false

  constructor(private loginServiceService: LoginServiceService, private router: Router, private cookieService: CookieService) { }

  tryLogin(username: HTMLInputElement, password: HTMLInputElement) {
    this.data.username = username.value
    this.data.password = password.value
    let token: string
    this.loginServiceService.tryLogin(this.data).subscribe(
      res => {
        if (res.msg == "Login correct") {
          this.cookieService.set('token', res.token, 7)
          this.router.navigate(['/'])
        } else if (res.msg == "Incorrect user or password.") {
          this.passFailed = true
          password.value = ""
          username.focus()
        }
      },
      err => {
        this.passFailed = true
        password.value = ""
        username.focus()
      }
    )
    return false;
  }

}
