import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  errorMessage: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  onRegister(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.registerUser(email, password)
      .then(() => this.errorMessage = this.authService.errorMessage);
  }

}
