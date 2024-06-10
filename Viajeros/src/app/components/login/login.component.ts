import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/jwt.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogged = false;
  loginFail = false;
  loginUser?: LoginUser;
  username!: string;
  password!: string;
  roles!: string[];
  errMsj!: string;
  loginForm: FormGroup;
  decodeToken!: string;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.roles = this.tokenService.getAuthorities();
    }
  }
  onLogin(): void {
    this.loginUser = new LoginUser(this.username, this.password);
    this.authService.Login(this.loginForm.value).subscribe((data) => {
      this.isLogged = true;
      this.tokenService.setLogged(true);
      this.tokenService.setToken(data.token);
      const decodedToken = this.tokenService.getDecodedToken(data.token);
      if (decodedToken) {
        const role =
          decodedToken[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ];
        const name =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ];
        this.tokenService.setUsername(name);
        this.tokenService.setAuthorities(role);
        this.roles = decodedToken.role;
      }
      this.ngOnInit();
    });
  }
}
