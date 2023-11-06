import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private token!: string;

  constructor(private http: HttpClient) {}

  register(
    uusername: string,
    uemail: string,
    uname: string,
    usurname: string,
    upassword: string
  ) {
    this.http
      .post('https://localhost:3000/api/users/register', {
        username: uusername,
        email: uemail,
        name: uname,
        surname: usurname,
        password: upassword,
      })
      .subscribe((response) => {});
  }

  login(uusername: string, upassword: string) {
    this.http
      .post<{ token: string }>('https://localhost:3000/api/users/login', {
        username: uusername,
        password: upassword,
      })
      .subscribe((response) => {
        const token = response.token;
        localStorage.setItem('token', token);
      });
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
