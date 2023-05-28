import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userDataFull } from 'src/app/models/requests/userDataFull';
import { PostDocument } from 'src/app/models/responses/postResponse';
import { IndexServiceService } from 'src/app/services/index-service.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {

  public postsFromUser: PostDocument[] | undefined
  public selfUser: userDataFull | undefined
  public user: userDataFull | undefined

  public userAlias: string | undefined

  public editing:boolean = false

  constructor(private router: Router, private indexServiceService: IndexServiceService) {
    this.userAlias = router.getCurrentNavigation()?.finalUrl?.toString().replace("/user", "").replace("/", "")
    this.getUserInfo()
  }

  private getUserInfo() {
    if (this.userAlias !== undefined) {
      if (this.userAlias !== "") {
        this.indexServiceService.getUserInfoByAlias(this.userAlias).subscribe(
          res => {
            this.user = res.result
            this.indexServiceService.getUserInfo().subscribe(
              res => {
                this.selfUser = res.result
                this.getPostsFromUser()
              },
              err => { }
            )
          },
          err => { }
        )
      }
      else {
        this.indexServiceService.getUserInfo().subscribe(
          res => {
            this.user = res.result
            this.selfUser = res.result
            this.getPostsFromUser()
          },
          err => { }
        )
      }
    }
  }

  private getPostsFromUser() {
    if (this.user?.uid)
      this.indexServiceService.getPostInfoFromUser(this.user.uid).subscribe(
        res => {
          this.postsFromUser = res.result
        },
        err => { }
      )
  }

  public checkType(toCheck: any) {
    return typeof toCheck
  }

  public trimOpsBody(toTrim: { ops: any[] }): any {
    toTrim.ops = toTrim.ops.slice(0, 10)
    toTrim.ops.push(Object.assign({}, toTrim.ops[toTrim.ops.length - 1]))
    toTrim.ops[toTrim.ops.length - 1].insert = "..."
    return toTrim
  }

  public tryEditUser(newAlias:string, newTag:string){
    if(this.user?.uid)
    this.indexServiceService.editUserInfo(this.user?.uid, {alias:newAlias, tag:newTag}).subscribe(
      res=>{this.getUserInfo();this.editing = false},
      err=>{}
    )
  }

}
