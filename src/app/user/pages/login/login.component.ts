import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../../../models/user';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private service: BaseService, private route: Router) {}
  loginRequest: LoginRequest = new LoginRequest();

  login(): void {
    this.service
      .Post<LoginRequest, LoginResponse>(this.loginRequest, 'users/login')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            localStorage.setItem(
              environment.tokenName,
              JSON.stringify(response.result)
            );
            this.route.navigate(['/notes']);
          }
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }
}
