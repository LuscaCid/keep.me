import { User } from "./User";

export interface Saving {
  name : string;
  actualValue : number;
  goal : number;
  id : number;
  user? : User
}