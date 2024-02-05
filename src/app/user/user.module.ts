import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './user.component';
import { BaseService } from '../services/base.service';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { CommonService } from '../services/common.service';

@NgModule({
  declarations: [SignupComponent, LoginComponent, UserComponent],
  imports: [CommonModule, UserRoutingModule, FormsModule, HttpClientModule],
  providers: [
    BaseService,
    CommonService,
  ],
})
export class UserModule {}
