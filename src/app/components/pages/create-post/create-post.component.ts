import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill/lib/quill-editor.component';
import { PostDocument } from 'src/app/models/responses/postResponse';
import { IndexServiceService } from 'src/app/services/index-service.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  content: string = '';
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['font', 'size', 'color']
    ]
  };

  path: string | undefined

  private post: PostDocument = {
    pid: "",
    title: "",
    body: "",
    plain_body: "",
    folder: "",
    edited: false,
    public_date: new Date()
  }

  constructor(private indexServiceService: IndexServiceService, private router: Router) {
    this.path = router.getCurrentNavigation()?.finalUrl?.toString().replace("/create", "").replace("/", "")
    console.log(this.path)
  }

  public tryCreatePost(title: HTMLInputElement, quill: QuillEditorComponent) {
    this.post.title = title.value
    this.post.body = quill.quillEditor.getContents()
    this.post.plain_body = quill.quillEditor.getText()
    if (this.path)
      this.post.folder = this.path.replace(/_/g, "/")

    this.indexServiceService.postCreatePost(this.post).subscribe(
      res => {this.router.navigateByUrl(`/post/${this.post.title}`)},
      err => { }
    )

  }

}
