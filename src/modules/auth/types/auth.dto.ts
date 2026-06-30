import { IsNotEmpty } from 'class-validator';

// implementing custom nest validator
//https://stackoverflow.com/questions/59980341/can-i-compare-number-variables-with-class-validator

export class AuthSignInRequestArgs {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
