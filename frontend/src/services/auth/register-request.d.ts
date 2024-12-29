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
