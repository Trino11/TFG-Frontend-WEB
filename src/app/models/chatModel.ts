import { userDataFull } from "./requests/userDataFull"

export interface ChatType {
      persons: userDataFull,
      msgs: {
            msg: String,
            time: Date,
            author:string
      }[]
}