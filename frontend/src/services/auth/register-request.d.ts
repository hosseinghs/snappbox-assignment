export interface ILogin {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  phone: string;
  password: string;
  lastName: string;
  firstName: string;
};

export interface IVerifyRequest {
  email: string;
  verify_code: string;
};

export interface ILoginResponse {
  access_token: string
}