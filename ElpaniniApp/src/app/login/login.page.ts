/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from '../interface/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: any = '';
  password: any = '';
  description: any = '';
  foto: any = '';
  loginForm: FormGroup;
  isSubmitted = false;

  user: User = {
    id: '',
    username: '',
    email: '',
    password: ''
  };
  reset() {
    this.email = '';
    this.password = '';
  }
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, public alertController: AlertController) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  //VALIDATION
  get errorControl() {
    return this.loginForm.controls;
  }

  async presentAlert() {
    if (!this.loginForm.valid) {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Gelieve juiste gegevens in te geven',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  submitForm(): boolean {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      console.log('Geef alle vereiste waarden op!');
      return false;
    } else {
      this.http.post("https://samysah.be/php/api/gebruikers/login.php" + '?email=' + this.errorControl.email.value + '&password=' + this.errorControl.password.value, { withCredentials: true })
        .subscribe(data => {
          this.user = <User>data;
          if(this.user.username === "samy"){
            this.user["role"] = "admin";
          }else{
            this.user["role"] = "user";
          }
          sessionStorage.setItem('UserData', JSON.stringify(this.user));
          this.router.navigate(['tabs/main']);
          this.loginForm.controls['email'].reset();
          this.loginForm.controls['password'].reset();
        });
      console.log("goedzo ingelogd");
      console.log(this.loginForm.value);
      return true;
    }
  }
}
