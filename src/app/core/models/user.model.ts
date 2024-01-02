export interface User {
  email:string;
  id:string;
  token:string;
  username:string;
  bio:string;
  image:string;
}

export interface LoginUser{
  email:string;
  password:string;
}

export interface RegisterUser{
  email:string;
  password:string;
  username:string;
}

export interface UpdateUserPayload{
  email:string;
  password?:string;
  username:string;
  bio:string;
  image:string
}
