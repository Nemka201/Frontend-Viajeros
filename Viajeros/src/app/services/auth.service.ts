import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/login.model';
import { Jwt } from '../models/jwt.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private HttpClient: HttpClient) { }
  UserRoute = environment.URL + 'Users'
  public Login(loginUsuario: LoginUser): Observable<Jwt>{
    return this.HttpClient.post<Jwt>(this.UserRoute + '/Login', loginUsuario);
  }
}