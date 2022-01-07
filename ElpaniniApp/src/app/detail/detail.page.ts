/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Broodje } from '../interface/broodje.model';
import { BroodjeService, SearchType } from '../services/broodje.service';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id: number;
  broodje: Broodje;
  information = null;
  result: Observable<Broodje>;
  broodjes: Broodje[] = [];

  constructor(private broodjeService: BroodjeService, private activatedRoute: ActivatedRoute, private cartService: CartService, private toast: ToastController) {
  }
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.broodjeService.getOneBroodjes(id).subscribe(result => {
      console.log('details:', result);
      this.information = result;
    });
  }

   async presentToast() {
    const toast = await this.toast.create({
      message: 'Sandwich added to cart',
      mode: 'ios',
      duration: 3000,
      position: 'top',
    });
    toast.present();
    location.reload();
  }
  addToCart(brood: Broodje)
  {
    this.cartService.addtoCart(brood, 1);
    this.presentToast();
  }
}
