/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/dot-notation */
    // eslint-disable-next-line @typescript-eslint/semi
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Broodje } from '../interface/broodje.model';
import { Cart } from '../interface/cart.model';
import { BroodjeService } from './broodje.service';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: Cart[] = [];
  public cartItemList$ = new BehaviorSubject<any>([]);
  broodjes: Broodje[] = [];
  id: number;
  broodje: Broodje;
  information = null;
  result: Observable<Broodje>;

  constructor(private broodjeService: BroodjeService, private catService: CategoryService) { }

  getCartItems() {
    return this.cartItemList$.asObservable();
  }

  addtoCart(broodje: Broodje, quantity: number) {

    const exist: Cart = this.cartItemList.find((item: Cart) => { return item.brood.title === broodje.title}) || {} as Cart;

    if (exist.quantity != null) {
      exist.quantity++;
    }

    else {
      const sandwiches: Broodje[] = [] ;
      this.broodjeService.getOneBroodjes(broodje.id).subscribe(result => {
        console.log('details:', result);
        this.information = result;
      });
      console.log(sandwiches);

      // maak een nieuwe cartItem aan.

      let cartItem: Cart = {
        brood: broodje,
        quantity: 1,
      };
      this.cartItemList.push(cartItem);
    }
    this.cartItemList$.next(this.cartItemList);
    localStorage.setItem('dataSource', JSON.stringify((this.cartItemList)));
    console.log("from the cartlog ", this.cartItemList);
  }

  removeCartItem(cartItem: Cart) {
    this.cartItemList.map((a: any, index: any) => {
      if (cartItem.brood.id == a.brood.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.cartItemList$.next(this.cartItemList);
    localStorage.setItem('dataSource', JSON.stringify((this.cartItemList)));
  }

  total(): number {

    let y: number = 0;
    this.cartItemList.forEach((item) => {
      const x: number = (item.quantity * item.brood.price);
      y += x;
    });
    return y;
  }

  totalCartItem() {
    let x: number = 0;
    this.cartItemList.forEach((item) => {
      x += item.quantity;
    });
    return x;
  }
}
