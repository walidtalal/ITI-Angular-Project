import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  onLoginSubmit() {
    if (this.loginData.email === 'waleed@email.com' && this.loginData.password === 'password123') {
      console.log('Login successful');
    } else {
      console.error('Login failed');
    }
  }
}
