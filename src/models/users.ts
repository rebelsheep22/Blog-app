export class Users {
  id?: string;
  email!: string;
  passwords! : {
    password: string,
    repeatPassword: string
  };
  firstName?: string;
  lastName?: string;
  token?: string;
}
