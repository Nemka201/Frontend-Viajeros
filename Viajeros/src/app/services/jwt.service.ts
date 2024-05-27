import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roles: Array<string> = [];
  constructor() { }

  public setToken(token:string):void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }
  public getToken():string{
    return window.sessionStorage.getItem(TOKEN_KEY)!;
  }
  public setUsername(username:string):void{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY,username);
  }
  public getUsername ():string{
    return window.sessionStorage.getItem(USERNAME_KEY)!;
  }
  public setAuthorities (authorities:string):void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY,authorities);
  }
  public getAuthorities ():string[]{
    this.roles = [];
    if(sessionStorage.getItem(AUTHORITIES_KEY)){
      this.roles.push(sessionStorage.getItem(AUTHORITIES_KEY) || "user");
    }
    return this.roles;
  }
  getDecodedToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  
  public Logout():void{
    window.sessionStorage.clear();
  }
}
