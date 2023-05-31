import { CommentModel } from "../commentModel"
import { userDataFull } from "../requests/userDataFull"


export interface PostDocument {
    pid?:string,
    title:string,
    body:string|any,
    plain_body:string|any,
    tags?:string[],
    comments?:CommentModel[],
    public_date?:Date,
    edit_date?:Date,
    edited?:boolean
    folder?:string,
    author?:userDataFull
    }