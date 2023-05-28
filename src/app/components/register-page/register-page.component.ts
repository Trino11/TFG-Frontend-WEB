import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { userDataFull } from 'src/app/models/requests/userDataFull';
import { dataLogin } from 'src/app/models/requests/userDataLogin';
import { dataRegister } from 'src/app/models/requests/userDataRegister';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private userData: dataRegister | null = null
  private forumData: userDataFull | null = null
  
  public isErrorRegister: boolean = false
  public isButtonRegister: boolean = false
  
  constructor(private router: Router, private loginServiceService: LoginServiceService, private cookieService: CookieService) {
    cookieService.delete('token')
  }

  createUser(username: HTMLInputElement,tag:HTMLInputElement, firsName: HTMLInputElement, lastName: HTMLInputElement,
    birthday: HTMLInputElement, email: HTMLInputElement,
    password: HTMLInputElement, passwordR: HTMLInputElement): boolean {
    if (password.value !== passwordR.value) return false
    this.userData = {
      username: username.value,
      password: password.value,
      email: email.value
    }
    this.forumData = {
      alias: username.value,
      tag: tag.value,
      name: firsName.value,
      lastName: lastName.value,
      birthday: birthday.valueAsDate,
    }
    this.loginServiceService.registerUser(this.userData).subscribe(
      res => {
        console.log("Registered on users server.")
        this.loginServiceService.tryLogin({username:username.value, password:password.value}).subscribe(
          res=>{
            this.cookieService.set('token', res.token)
            if (this.forumData)
              this.loginServiceService.registerForum(this.forumData).subscribe(
                res => {console.log("Registered on forum server."); this.router.navigateByUrl('/')},
                err => {console.log("Error registering on forum server: ", err);this.isErrorRegister = true}
              )
          },
          err=>{console.log("Error trying to login on login server: ", err)}
        )
     
      },
      err => {console.log("Error registering on login server: ", err);this.isErrorRegister = true}
    )

    return false
  }
}
