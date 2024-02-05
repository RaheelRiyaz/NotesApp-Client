import { Component } from '@angular/core';
import { SignupRequest, SignupResponse } from '../../../models/user';
import { BaseService } from '../../../services/base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private service: BaseService, private route: Router) {}
  signupRequest: SignupRequest = new SignupRequest();

  signUp(): void {
    this.service
      .Post<SignupRequest, SignupResponse>(this.signupRequest, 'users/signup')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) this.route.navigate(['']);
        },
        error: (err: Error) => {},
      });
  }
}
