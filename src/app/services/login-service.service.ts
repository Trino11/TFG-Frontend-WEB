import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { dataLogin } from '../models/requests/userDataLogin';
import { loginResponse } from '../models/responses/loginResponse';
import { environment } from 'src/environments/environment';
import { userDataFull } from '../models/requests/userDataFull';
import { dataRegister } from '../models/requests/userDataRegister';
import { registerUserResponse } from '../models/responses/registerUserResponse';
import { registerForumResponse } from '../models/responses/registerForumResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private api_login_url: string = environment.api_login_url
  private api_url: string = environment.api_url

  constructor(private http: HttpClient) {
    if (this.api_login_url.endsWith('/'))
      this.api_login_url = this.api_login_url.substring(0, this.api_login_url.length - 1)
    if (this.api_url.endsWith('/'))
      this.api_url = this.api_url.substring(0, this.api_url.length - 1)
  }

  tryLogin(data: dataLogin): Observable<loginResponse> {
    return this.http.post<loginResponse>(`${this.api_login_url}/login`, data)
  }
  registerUser(data: dataRegister): Observable<registerUserResponse> {
    return this.http.post<registerUserResponse>(`${this.api_login_url}/register`, data)
  }
  registerForum(data: userDataFull): Observable<registerForumResponse> {
    return this.http.post<registerForumResponse>(`${this.api_url}/user/register`, data)
  }
}
