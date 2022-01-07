/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */

import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Broodje } from '../interface/broodje.model';
import { Cart } from '../interface/cart.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit{
  id: number;
  localCart: Cart[] = JSON.parse(localStorage.getItem('dataSource')) || [];
  IsDisabled: boolean = false;
  broodjes: Broodje[] = [];
  information = null;
  result: Observable<Broodje>;
  public totalItems: any =0;
  constructor(public cartService: CartService) {
  }

  ngOnInit(): void {
    if(this.localCart.length != 0){
      this.cartService.cartItemList = this.localCart;
      this.cartService.cartItemList$.next(this.cartService.cartItemList);
    }else{
      this.IsDisabled = true;
    }
  }

  removeFromCart(cartItem: Cart){
    this.cartService.removeCartItem(cartItem);
    console.log("from service "  + this.cartService.cartItemList);
    this.localCart = JSON.parse(localStorage.getItem('dataSource') || "");
    if(this.localCart.length == 0){
      this.IsDisabled = true;
    }
  }
}

