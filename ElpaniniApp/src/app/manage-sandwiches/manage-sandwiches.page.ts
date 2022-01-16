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
  foto: any = 'https://samysah.be/php/api/broodjes/images/panos.jpg';
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
  btnAdd = 'Voeg toe';
  btnUpdate = 'Wijzig';
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
    this.foto = 'https://samysah.be/php/api/broodjes/images/panos.jpg';
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
      this.showToast("Broodje bestaat al", "danger");
    } else if (this.title.length == 0) {
      this.error_msg = "Vul titel in";
      this.showToast("Vul titel in", "danger");
    } else if (this.price.length == 0) {
      this.error_msg = "Vul prijs in";
      this.showToast("Vul prijs in", "danger");
    } else if (this.description.length == 0) {
      this.error_msg = "Vul beschrijving in";
      this.showToast("Vul beschrijving in", "danger");
    } else if (this.foto.length == 0) {
      this.error_msg = "Vul foto in";
      this.showToast("Vul foto in", "danger");
    } else {
      const loading = await this.loading.create({
        message: 'Saving. even geduld..',
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
      this.error_msg = "Kies een broodje";
      this.showToast("Kies een broodje", "danger");
    }
    else {
      const loading = await this.loading.create({
        message: 'Wordt bijgewerkt. even geduld aub..',
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
      message: 'Verwijderen. Even geduld...',
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
      message: 'Wilt u deze verwijderen?',
      buttons: [
        {
          text: 'Ja',
          handler: () => {
            this.remove(this.brood[index].id);
            this.showToast("Deleted Product", "success");
          }
        },
        {
          text: 'Nee',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
}
