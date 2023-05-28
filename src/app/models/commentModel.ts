import { userDataFull } from "./requests/userDataFull"

export interface CommentModel {
    cid?:string,
    body:string|any,
    public_date?:Date,
    edit_date?:Date,
    edited?:boolean
    author?:userDataFull
    }