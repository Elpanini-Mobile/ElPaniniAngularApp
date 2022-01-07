/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Broodje } from '../interface/broodje.model';


@Component({
  selector: 'app-manage-sandwiches',
  templateUrl: './manage-sandwiches.page.html',
  styleUrls: ['./manage-sandwiches.page.scss'],
})
export class ManageSandwichesPage implements OnInit {
  title: any = '';
  price: any = '';
  description: any = '';
  foto: any = 'https://samysah.be/php/api/broodjes/images/custombroodjeDefault.webp';
  category_id: any = 2;
  brood: Broodje[] = [];
  broodje: Broodje = {
    id: '',
    title: '',
    description: '',
    price: 0,
    foto: '',
    category_id: '2'
  };

  error_msg = '';
  btnAdd = 'Add';
  btnUpdate = 'Update';
  edit_index = -1;

  constructor(private alert: AlertController, public loading: LoadingController, private http: HttpClient, private toast: ToastController) {
    this.getBroodjes();
  }
  ngOnInit() {
  }

  reset() {
    this.title = '';
    this.price = '';
    this.description = '';
    this.foto = 'https://samysah.be/php/api/broodjes/images/custombroodjeDefault.webp';
  }

  edit(x, index) {
    this.title = x.title;
    this.price = x.price;
    this.description = x.description;
    this.foto = x.foto;
    this.edit_index = index;
  }

  getBroodjes() {
    this.http.get('https://samysah.be/php/api/broodjes/read.php').subscribe(data => {
      this.brood = <Array<Broodje>>data;
    });
  }
  async add() {
    if (this.title == this.broodje.title) {
      this.showToast("Sandwich already exist", "danger");
    } else if (this.title.length == 0) {
      this.error_msg = "Please enter title";
      this.showToast("Please enter title", "danger");
    } else if (this.price.length == 0) {
      this.error_msg = "Please enter price";
      this.showToast("Please enter price", "danger");
    } else if (this.description.length == 0) {
      this.error_msg = "Please enter description";
      this.showToast("Please enter description", "danger");
    } else if (this.foto.length == 0) {
      this.error_msg = "Please enter foto";
      this.showToast("Please enter foto", "danger");
    } else {
      const loading = await this.loading.create({
        message: 'Saving. Please wait..',
      });
      await loading.present();
      this.broodje.title = this.title;
      this.broodje.price = this.price;
      this.broodje.description = this.description;
      this.broodje.foto = this.foto;
      //make http request
      this.http.post('https://samysah.be/php/api/broodjes/create.php', JSON.stringify(this.broodje)).subscribe((res: any) => {
        console.log(res);
        loading.dismiss();
        this.showToast("Saved", "secondary");
        this.getBroodjes();
        this.reset();
      });
    }
  }

  async update() {
    if (this.title.length == 0 || this.price.length == 0 || this.description.length == 0) {
      this.error_msg = "Please select a sadwich";
      this.showToast("Please select a sadwich", "danger");
    }
    else {
      const loading = await this.loading.create({
        message: 'Updating. Please wait..',
      });

      await loading.present();
      this.broodje.id = this.brood[this.edit_index].id;
      this.broodje.title = this.title;
      this.broodje.price = this.price;
      this.broodje.description = this.description;
      this.broodje.foto = this.foto;
      //make http request
      this.http.put('https://samysah.be/php/api/broodjes/update.php', JSON.stringify(this.broodje)).subscribe((res: any) => {
        console.log(res);
        loading.dismiss();
        this.showToast("Saved", "success");
        this.getBroodjes();
        this.reset();
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

  async remove(x) {
    const loading = await this.loading.create({
      message: 'Deleting. Please wait..',
    });
    await loading.present();
    console.log(x);
    let prms: any = { id: x };
    this.broodje.id = x;
    //make http request
    this.http.post('https://samysah.be/php/api/broodjes/delete.php', prms).subscribe(data => {
      console.log(data, "ik kom uit api");
      loading.dismiss();
      this.showToast("Deleted", "secondary");
      this.getBroodjes();
    });
  }

  async delete(index) {
    const alert = await this.alert.create({
      header: 'Delete',
      message: 'Do you want to delete?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.remove(this.brood[index].id);
            this.showToast("Deleted Product", "success");
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
}
