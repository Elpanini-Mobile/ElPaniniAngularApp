/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../interface/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  User$: Observable<User> | undefined;
  CurrentUser = new BehaviorSubject<User>({} as any);
  CurrentUser$ = this.CurrentUser.asObservable();

  loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  loginUrl = "";
  registerUrl = "";
  constructor(private http: HttpClient) { }


  //add new user
  public adduser(userData)
  {
    return this.http.post('https://samysah.be/php/api/gebruikers/create.php'
  , userData).subscribe((res: Response) => {
  });
  }

  login(loginData){
    let payLoad = new HttpParams();
    payLoad = payLoad.append("email", loginData.Email);
    payLoad = payLoad.append("password", loginData.Passwoord);
    this.http.post(this.loginUrl, payLoad);
  }
}
