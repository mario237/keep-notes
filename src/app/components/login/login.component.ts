import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  userRegisterState: string = '';
  errorMessage: string = '';
  loginState: boolean = false;
  isClicked: boolean = false;


  constructor(private _AuthService: AuthService, private _Router: Router) {

  }


  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][a-z0-9\d@$%#&]{8,}$')]),
  });


  submitLoginForm() {
    this.isClicked = true;

    if (this.loginForm.valid) {
      this._AuthService.makeUserLogin(this.loginForm.value).subscribe((response) => {
        if (response.message == 'success') {
          this.isClicked = false;
          this.loginForm.reset();
          this.loginState = true;
          localStorage.setItem('TOKEN', response.token);
          this.showALert(this.loginState);

        } else {
          this.isClicked = false;
          this.loginState = false;
          this.errorMessage = response.message;
          this.showALert(this.loginState);
        }
      })
    }

  }

  showALert(state: boolean) {

    if (state) {
      $('.success-message-container').fadeIn(400);
      setTimeout(() => {
        $('.success-message-container').fadeOut('slow');
        this._Router.navigate(['/profile']);
      }, 500);

    } else {
      $('.error-message-container').fadeIn(400);
      setTimeout(function () {
        $('.error-message-container').fadeOut('slow');
      }, 2000);
    }
  }

  ngOnInit(): void {
    $('#login').particleground();

    if (this._AuthService.isLoggedIn()) {
      this._Router.navigate(['/profile']);
    }
  }

}
