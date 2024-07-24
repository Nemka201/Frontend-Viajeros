import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  constructor(private tokenService: TokenService, private router: Router) {}

  isLogged: boolean = false;

  @ViewChild('sobreMi') sobreMiElement!: ElementRef;
  @ViewChild('programas') programasElement!: ElementRef;
  @ViewChild('posts') postsElement!: ElementRef;

  ngOnInit() {
    this.isLogged = this.tokenService.getToken() ? true : false;
  }
  ngAfterViewInit() {
    setTimeout(() => {
      console.log(this.sobreMiElement);
      console.log(this.programasElement);
      console.log(this.postsElement);
    }, 100); // Ajusta el tiempo de espera según sea necesario
  }
  
  redirectToElement(component: string) {
    switch (component) {
      case 'sobre-mi':
        document.getElementById('sobreMi')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'programas':
        document.getElementById('programas')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'posts':
        document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        console.error('Elemento no encontrado:', component);
        break;
    }
  }
  
}
