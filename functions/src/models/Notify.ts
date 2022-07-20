import {InnerUser} from "./InnerUser";

export interface Notify {
  id: string;
  idPost: string;
  urlImgPost: string;
  userInNotify:InnerUser;
  type:string;
  timestamp:number;
}
