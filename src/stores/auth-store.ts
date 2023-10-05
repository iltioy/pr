import { makeAutoObservable } from "mobx";

interface Credentials {
  email: string;
  password: string;
}

class AuthStore {
  email: string = "";
  password: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setCredentials(data: Credentials) {
    this.email = data.email;
    this.password = data.password;
  }

  clearCredentials() {
    this.email = "";
    this.password = "";
  }
}

export default new AuthStore();
