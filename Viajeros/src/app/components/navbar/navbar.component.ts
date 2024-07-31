import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { TokenService } from 'src/app/services/jwt.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  constructor(
    private tokenService: TokenService,
    private navbarService: NavbarService,
    private cdRef: ChangeDetectorRef
  ) {}

  isLogged: boolean = false;

  ngOnInit() {
    this.isLogged = this.tokenService.getToken() ? true : false;

    this.navbarService.refreshNavbar$.subscribe(() => {
      this.isLogged = this.tokenService.getToken() ? true : false;
      this.cdRef.detectChanges();
    });
  }
  ngAfterViewInit() {}

  redirectToElement(component: string) {
    switch (component) {
      case 'sobre-mi':
        document
          .getElementById('sobreMi')
          ?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'programas':
        document
          .getElementById('programas')
          ?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'posts':
        document
          .getElementById('posts')
          ?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        console.error('Elemento no encontrado:', component);
        break;
    }
  }
}
