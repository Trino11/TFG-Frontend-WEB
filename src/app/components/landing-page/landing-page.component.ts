import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostDocument } from 'src/app/models/responses/postResponse';
import { PostsFolder } from 'src/app/models/responses/postsFolderResponse';
import { IndexServiceService } from 'src/app/services/index-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public currentFolder: PostsFolder | undefined = undefined
  public folders: PostsFolder[] | undefined = undefined
  public posts: PostDocument[] | undefined = undefined

  public editing: boolean = false
  public editValid: boolean = false
  public editError: boolean = false

  public newFolder: PostsFolder = { fid: "", name: "" }

  private path: string | undefined = ""

  constructor(private indexServiceService: IndexServiceService, private router: Router) {
    this.path = this.normalizeURL(this.router.getCurrentNavigation()?.finalUrl?.toString())
    this.updatePosts()
  }

  private normalizeURL(url: string | undefined): string {
    if (url == '/')
      return ""
    else
      if (url != undefined)
        return url.replace("/posts/", "")
    return ""

  }

  ngOnInit() {
    window.addEventListener('popstate', () => {
      this.router.navigateByUrl(window.location.pathname);
      this.path = this.normalizeURL(window.location.pathname)
      this.navigateFolderByPath()
      this.updatePosts()
    });
  }

  private updatePosts() {
    if (this.path != undefined)
      this.indexServiceService.getPathPosts(this.path).subscribe(
        res => {
          this.folders = this.cleanPostsFolderArray(res.result.folders)
          this.posts = res.result.posts
          this.currentFolder = res.result.current

          if (this.path != undefined) {
            let pathF = this.path?.replace(/_/g, "/").replace(/ /g, " ").replace(/%20/g, " ").split("/")
            this.currentFolder.name = pathF[pathF.length - 1]
          }
        },
        err => { }
      )
  }

  private cleanPostsFolderArray(foldersO: [PostsFolder]): [PostsFolder] | undefined {
    foldersO.forEach((folder) => {
      folder.name = folder.name.split("/")[folder.name.split("/").length - 1]
    })
    return foldersO
  }

  public changeFolderRoute(nameElement: HTMLParagraphElement) {
    if (this.path !== "")
      this.path += "_"
    if (this.path != undefined)
      this.path += nameElement.textContent
    this.navigateFolderByPath()
    this.updatePosts()
  }

  public goBackInRoute() {
    let pathFA = this.path?.replace(/_/g, "/").replace(/ /g, " ").replace(/%20/g, " ").split("/")
    pathFA?.pop()
    if (pathFA) {
      this.path = ""
      for (const pathF of pathFA) {
        this.path += `/${pathF}`
      }
    }
    this.path = this.path?.replace("/", "").replace(/\//g, "_")
    this.navigateFolderByPath()
    this.updatePosts()
  }

  public navigateFolderByPath() {
    this.path = this.path?.replace("undefined_", "")
    if (this.path != undefined)
      this.router.navigateByUrl("/posts/" + this.path)
    else
      this.router.navigateByUrl("/")
  }

  public viewPost(postNameElement: HTMLParagraphElement) {
    if (postNameElement.textContent)
      this.navigatePostByName(postNameElement.textContent)
  }

  public navigatePostByName(path: string) {
    this.router.navigateByUrl("/post/" + path.replace(/ /g, "_"))
  }

  public tryCreateFolder() {
    if (!this.newFolder.name) return false
    this.newFolder.folder = this.path?.replace(/_/g, "/")

    this.indexServiceService.postCreateFolder(this.newFolder).subscribe(
      res => {
        this.updatePosts()
        this.editing = false;
      }, err => {
        console.log("Error creating a folder: ", err);
        this.editError = true;
      })


    return true
  }

  public startEditing() {
    if (!this.editing) {
      this.editing = true;
      this.editValid = false
    }
  }

  public endEditing() {
    this.editing = false
    this.editValid = false
  }

  public titleTyped(typedOn: HTMLInputElement) {
    this.newFolder.name = typedOn.value
  }
  public descTyped(typedOn: HTMLTextAreaElement) {
    this.newFolder.info = typedOn.value
  }

  public createPost(){
    this.router.navigateByUrl(`create/${this.path}`)
  }

}
