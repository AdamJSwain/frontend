import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(public authservice: AuthServiceService, private router: Router) {}

  option: string = this.router.url;

  ngOnInit(): void {}

  onRegister(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }

    if (this.option == '/register') {
      this.authservice.register(
        registerForm.value.enteredUsername,
        registerForm.value.enteredEmail,
        registerForm.value.enteredName,
        registerForm.value.enteredSurname,
        registerForm.value.enteredPassword
      );
    }
  }
}
