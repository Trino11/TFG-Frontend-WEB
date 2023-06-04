import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const ws_url: string = environment.ws_url

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket{


  constructor(private cookieService:CookieService) {
    super({
      url:`${ws_url}`,
      options:{
        query:{
          token:cookieService.get("token")
        }
      }
    });

  }
}
