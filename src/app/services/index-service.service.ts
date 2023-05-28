import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userDataFull } from '../models/requests/userDataFull';
import { PostsFolder } from '../models/responses/postsFolderResponse';
import { PostDocument } from '../models/responses/postResponse';
import { CommentModel } from '../models/commentModel';

@Injectable({
  providedIn: 'root'
})
export class IndexServiceService {

  private api_url:string = environment.api_url

  constructor(private http: HttpClient) {
    if(this.api_url.endsWith('/'))
    this.api_url = this.api_url.substring(0, this.api_url.length-1)
  }

  getUserInfo():Observable<{result:userDataFull}>{
    return this.http.get<{result:userDataFull}>(`${this.api_url}/user/own`)
  }

  editUserInfo(user:string, info:userDataFull):Observable<{msg:string}>{
    return this.http.put<{msg:string}>(`${this.api_url}/user/single/${user}`, info)
  }

  getUserInfoByUid(uid:string):Observable<{result:userDataFull}>{
    return this.http.get<{result:userDataFull}>(`${this.api_url}/user/single/uid/${uid}`)
  }

  getUserInfoByAlias(alias:string):Observable<{result:userDataFull}>{
    return this.http.get<{result:userDataFull}>(`${this.api_url}/user/single/alias/${alias}`)
  }

  getPathPosts(path:string):Observable<{result:{current:PostsFolder, folders:[PostsFolder], posts:[PostDocument]}}>{
    return this.http.get<{result:{current:PostsFolder, folders:[PostsFolder], posts:[PostDocument]}}>(`${this.api_url}/post/path/${path}`)
  }

  getPostInfo(post:string):Observable<{result:PostDocument}>{
    return this.http.get<{result:PostDocument}>(`${this.api_url}/post/single/${post}`)
  }

  getPostInfoFromUser(uid:string):Observable<{result:PostDocument[]}>{
    return this.http.get<{result:PostDocument[]}>(`${this.api_url}/post/user/${uid}`)
  }

  postCreateFolder(folder:PostsFolder):Observable<{msg:string}>{
    return this.http.post<{msg:string}>(`${this.api_url}/post/folder`, folder)
  }

  postCreatePost(post:PostDocument):Observable<{msg:string}>{
    return this.http.post<{msg:string}>(`${this.api_url}/post/single`, post)
  }

  postUpdate(post:PostDocument, postToEdit:string):Observable<{msg:string}>{
    return this.http.put<{msg:string}>(`${this.api_url}/post/single/${postToEdit}`, post)
  }

  postDelete(postToDelete:string):Observable<{msg:string}>{
    return this.http.delete<{msg:string}>(`${this.api_url}/post/single/${postToDelete}`)
  }

  postCreateComment(comment:CommentModel, path:string):Observable<{msg:string}>{
    return this.http.post<{msg:string}>(`${this.api_url}/post/single/${path}/comment`, comment)
  }

}
