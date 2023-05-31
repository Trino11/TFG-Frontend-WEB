import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const ws_url: string = environment.ws_url

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket{


  constructor() {
    super({
      url:`${ws_url}`
    });

  }
}
