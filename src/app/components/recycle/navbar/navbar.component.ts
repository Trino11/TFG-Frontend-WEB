import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { loggedInStatus } from 'src/app/models/loggedInStatusEnum';
import { userDataFull } from 'src/app/models/requests/userDataFull';
import { IndexServiceService } from 'src/app/services/index-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public loggedInStatus = loggedInStatus;

  public isLoggedIn: loggedInStatus;
  public userInfo: userDataFull | null = null;

  public isDropdownOpen: boolean = false;


  constructor(private router: Router, private indexServiceService: IndexServiceService, private cookieService: CookieService) {
    this.isLoggedIn = loggedInStatus.loading;
    this.setLoggedIn()
  }

  setLoggedIn() {
    this.indexServiceService.getUserInfo().subscribe(
      res => { this.userInfo = res.result; this.isLoggedIn = loggedInStatus.loggedIn },
      err => { this.isLoggedIn = loggedInStatus.notLoggedIn }
    )

  }

  logOut() {
    this.cookieService.delete("token")
    this.cookieService.deleteAll()
    window.location.reload()
  }
}
