import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean = false;

  constructor(public _AuthService:AuthService , private _Router:Router) { 
  }

  logout(){
    localStorage.removeItem('TOKEN');
    this._Router.navigate(['/login']);
  }


  ngOnInit(): void {
  }

}
