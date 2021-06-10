import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare let $: any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _AuthService: AuthService , private _Router:Router) { }


  isFormVaildStyle = { 'background-color': 'gray', 'border-color': 'gray' };
  isFormInVaildStyle = { 'background-color': '#17a2b8', 'border-color': '#17a2b8' };


  registerForm = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    age: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(45)]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][a-z0-9\d@$%#&]{8,}$')]),
  })

  isClicked: boolean = false;

  registrationState:boolean = false;
  errorMessage: string = '';

  submitRegisterForm() {

    this.isClicked = true;

    if (this.registerForm.valid) {
      this._AuthService.makeUserRegister(this.registerForm.value).subscribe((response) => {
        if (response.message == 'success') {
          this.isClicked = false;
          this.registerForm.reset();
          this.registrationState = true;
          this.showALert(this.registrationState);
        } else {
          this.isClicked = false;
          this.registrationState = false;
          this.errorMessage = response.errors.email.message;
          this.showALert(this.registrationState);
        } 

      })
    }

  }


  showALert(state:boolean) {
 
    if(state){
      $('.success-message-container').fadeIn(400);
      setTimeout(()=> {
        $('.success-message-container').fadeOut('slow');
        this._Router.navigate(['/login']);
      }, 1000);

    }else{
      $('.error-message-container').fadeIn(400);
      setTimeout(function () {
        $('.error-message-container').fadeOut('slow');
      }, 2000);
    }
  }


  ngOnInit(): void {
    $('#register').particleground();
  }

}
