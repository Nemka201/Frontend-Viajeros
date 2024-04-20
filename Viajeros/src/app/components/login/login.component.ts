import { Component , OnInit} from '@angular/core';
import { Route, Router } from '@angular/router';
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
      this.tokenService.setToken(data.token);
      this.tokenService.setUsername(data.username);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.router.navigate(['']);
    });
  }
}
