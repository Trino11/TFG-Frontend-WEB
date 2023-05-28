export interface PostsFolder {
    fid:string,
    name: string,
    info?:string,
    folder?:string,
    posts?: [string],
    folders?: [string],
    parent?:String
}