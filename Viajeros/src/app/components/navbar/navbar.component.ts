import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private tokenService: TokenService){}
  isLogged: boolean = false;

 ngOnInit() : void{
  this.isLogged = this.tokenService.getToken() ? true : false;
 }

}
