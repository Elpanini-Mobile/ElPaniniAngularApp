/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from '../interface/user.model';
import { BroodjeService } from '../services/broodje.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  id: number;
  username: any = '';
  email: any = '';
  password: any = '';
  information = null;
  result: Observable<User>;

  ionicForm!: FormGroup;
  isSubmitted = false;
  isDisabled: boolean = true;

  //
  users: User[] = [];

  user: User = {
    id: '',
    username: '',
    email: '',
    password: ''
  };

  constructor(private broodjeService: BroodjeService, private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private toast: ToastController) {}

  ngOnInit() {
    this.isDisabled = true;
    this.ionicForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.broodjeService.getOneCustomer(id).subscribe(data => {
      console.log('details:', data);
      this.information = data;
      console.log(data);

      this.ionicForm.controls['username'].patchValue(this.information.username);
      this.ionicForm.controls['email'].patchValue(this.information.email);
      this.ionicForm.controls['password'].patchValue(this.information.password);
    });
    console.log(this.users);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm(): void {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
    } else {
      const UserData = JSON.parse(sessionStorage.getItem('UserData'));
      this.user.id = UserData.id;
      this.user.email = this.ionicForm.controls['email'].value;
      this.user.username = this.ionicForm.controls['username'].value;
      this.user.password = this.ionicForm.controls['password'].value;
      //make http request
      this.http.post('https://samysah.be/php/api/gebruikers/update.php', JSON.stringify(this.user)).subscribe(() => {
        console.log("did it to" + this.user.id);
        console.log(JSON.stringify(this.user));
        this.router.navigate(['tabs/main']);
        this.isDisabled = true;
        this.showToast("Profile information changed", "secondary");
      });
    }
  }

  async showToast(msg, color) {
    const toast = await this.toast.create({
      message: msg,
      position: 'top',
      duration: 4000,
      color: color
    });
    toast.present();
  }

  //Enable edit option if the ion inputs are disabled
  editFields() {
    this.isDisabled = false;
  }

  logout() {
    this.router.navigate(['/home']);
    sessionStorage.clear();
    localStorage.clear();
  }
}
