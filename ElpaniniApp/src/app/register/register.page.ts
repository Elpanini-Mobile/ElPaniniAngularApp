/* eslint-disable no-var */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, public alertController: AlertController, private api: DataService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
  }
  async presentAlert() {
    if(this.registerForm.valid){
      const alert = await this.alertController.create({
        header: 'Great!!',
        message: 'Succesvol geregistreerd.',
        buttons: ['OK']
      });
      await alert.present();
    }
    else{
      const alert = await this.alertController.create({
        header: 'Alert!!',
        message: 'Foute gegevens ingegeven waardoor we u niet hebben registeren.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  get f() { return this.registerForm.controls; }

  //VALIDATION
  get errorControl() {
    return this.registerForm.controls;
  }
  onSubmit() {

    this.isSubmitted = true;
    // stop here if form is invalid
    if (!this.registerForm.valid) {
      console.log('Geef alle vereiste waarden op!');
      return false;
    }
    //True if all the fields are filled
    if (this.isSubmitted) {

      // Initialize Params Object
      var myFormData = new FormData();

      // Begin assigning parameters

      myFormData.append('username', this.registerForm.value.username);
      myFormData.append('email', this.registerForm.value.email);
      myFormData.append('password', this.registerForm.value.password);

      this.api.adduser(myFormData); //caaling add user service
      this.presentAlert();

    }

  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.registerForm.valid) {
      console.log('Geef alle vereiste waarden op!');
      return false;
    } else {
      this.http.post("https://samysah.be/php/api/gebruikers/create.php", this.registerForm.getRawValue()).subscribe(() => this.router.navigate(['/login']));
      console.log("goed");
      console.log(this.registerForm.value);
      return true;
    }
  }
}
