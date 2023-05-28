import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuillEditorComponent, QuillViewComponent } from 'ngx-quill';
import { userDataFull } from 'src/app/models/requests/userDataFull';
import { PostDocument } from 'src/app/models/responses/postResponse';
import { IndexServiceService } from 'src/app/services/index-service.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent {

  @ViewChild('quillview') quillview!: QuillViewComponent;

  public post: PostDocument | undefined
  public postName: string | undefined

  public currentUser: userDataFull | undefined

  public blockInit: boolean = false
  public postInit: boolean = false

  private tempBody: any

  public editing: boolean = false

  constructor(private indexServiceService: IndexServiceService, private router: Router) {

    this.postName = router.getCurrentNavigation()?.finalUrl?.toString().replace("/post/", "")
    this.initPost()

    this.initUser()
  }

  private initPost() {
    if (this.postName !== undefined)
      this.indexServiceService.getPostInfo(this.postName).subscribe(
        res => {
          this.post = res.result
          this.postInit = true
          if (this.blockInit)
            this.initContent();
          else {
            this.postInit = true
            this.tempBody = res.result.body
          }
        },
        err => { console.log("There was an error while trying to fetch post: ", err) }
      )
  }

  public initContent() {
    this.blockInit = true
    if (this.postInit) {
      if (typeof this.post?.body === 'string')
        this.quillview.quillEditor.setText(this.post?.body)
      else
        this.quillview.quillEditor.setContents(this.post?.body);

    }
  }

  public initUser() {
    this.indexServiceService.getUserInfo().subscribe(
      res => { this.currentUser = res.result },
      err => { }
    )
  }

  public tryCreateComment(quilleditor: QuillEditorComponent) {
    if (quilleditor.quillEditor.getText().length == 0) { }
    else {
      if (this.postName)
        this.indexServiceService.postCreateComment({ body: quilleditor.quillEditor.getContents() }, this.postName).subscribe(
          res => { this.initPost(), quilleditor.quillEditor.setText("") },
          err => { }
        )
    }
  }

  public tryEditPost(quilleditor: QuillEditorComponent, title: string) {
    if (title.length == 0 || quilleditor.quillEditor.getText().length == 0) { }
    else {
      if (this.post?.pid)
        this.indexServiceService.postUpdate({ title: title, body: quilleditor.quillEditor.getContents() }, this.post?.pid).subscribe(
          res => { this.initPost(); this.editing = false },
          err => { }
        )
    }
  }

  public deletePost() {

    if (this.post?.pid)
      this.indexServiceService.postDelete(this.post?.pid).subscribe(
        res => { this.router.navigateByUrl('/') },
        err => { }
      )

  }

  public setComment(quillview: QuillViewComponent, delta: any) {
    quillview.quillEditor.setContents(delta)
  }

  public checkType(toCheck: any) {
    return typeof toCheck
  }


}
