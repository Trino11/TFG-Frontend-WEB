import { Component } from '@angular/core';
import { ChatType } from 'src/app/models/chatModel';
import { userDataFull } from 'src/app/models/requests/userDataFull';
import { IndexServiceService } from 'src/app/services/index-service.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  public chats: ChatType[] | undefined
  public chatActual: ChatType | undefined

  public ownInfo: userDataFull | undefined

  public creatingChat: boolean = false
  public allUsers: userDataFull[] | undefined

  constructor(private webSocketService: WebSocketService, private indexServiceService: IndexServiceService) {
    this.getOwnInfo()
    this.getChats()
    this.configListener()
  }

  private getOwnInfo() {
    this.indexServiceService.getUserInfo().subscribe(
      res => { this.ownInfo = res.result },
      err => { }
    )
  }

  private getChats() {
    this.indexServiceService.getOwnChats().subscribe(
      res => { this.chats = res.result; console.log(this.chats) },
      err => { }
    )
  }

  private configListener() {
    this.webSocketService.on('message', (data: string) => {
      const dataF = JSON.parse(data)
      if (this.chats)
        for (const chat of this.chats) {
          if (chat.persons.uid == dataF.from)
            chat.msgs.push({ author: dataF.from, msg: dataF.msg, time: new Date() })
        }
    })

    this.webSocketService.on('newchat', (data: string) => {
      const dataF = JSON.parse(data)
      this.chats?.push({ msgs: [], persons: dataF.from })
    })
  }

  public sendMessage(message: string) {
    this.webSocketService.emit('message', JSON.stringify({ author: this.ownInfo?.uid, to: this.chatActual?.persons.uid, msg: message }))
    if (this.ownInfo?.uid)
      this.chatActual?.msgs.push({ author: this.ownInfo?.uid, msg: message, time: new Date() })
  }

  public createChat(user: userDataFull) {
    this.webSocketService.emit('newchat', JSON.stringify({ author: this.ownInfo?.uid, to: user.uid }))
    this.chatActual = this.chats?.at(this.chats?.push({ msgs: [], persons: user })-1)
    this.creatingChat = false;
  }

  public showChat(chat: ChatType) {
    this.chatActual = chat
  }

  public getAllUsers() {
    this.indexServiceService.getAllUsersInfo().subscribe(
      res => { this.allUsers = res.result },
      err => { }
    )
  }


}
