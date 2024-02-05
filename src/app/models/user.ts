export class SignupRequest {
  email!: string;
  password!: string;
}

export class SignupResponse {
  id!: string;
  email!: string;
}

export class LoginRequest extends SignupRequest {}

export class LoginResponse {
  id!: string;
  token!: string;
}
