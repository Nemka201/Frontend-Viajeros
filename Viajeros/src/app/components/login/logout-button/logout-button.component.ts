import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit{
  isLogged : boolean = true;
  constructor(private tokenService:TokenService){}
  ngOnInit(): void {
    this.isLogged = this.tokenService.getToken() ? true : false;
  }
  Logout(): void {
      this.tokenService.Logout();
      this.ngOnInit();
  }
}
