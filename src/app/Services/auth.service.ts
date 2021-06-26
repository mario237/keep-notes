import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL:string = 'https://routeegypt.herokuapp.com/';

  constructor(private _HttpClient: HttpClient) {}

  makeUserRegister(userData: object): Observable<any> {
    return this._HttpClient.post(this.BASE_URL+'signup', userData);
  }

  makeUserLogin(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.BASE_URL}signin`, userData);
  }

  makeUserLogOut(token:string): Observable<any> {
    return this._HttpClient.post(`${this.BASE_URL}signOut`, token);
  } 


  isLoggedIn() {
   return localStorage.getItem('TOKEN');
  }
}
