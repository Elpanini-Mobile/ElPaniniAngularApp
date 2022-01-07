/* eslint-disable eol-last */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Broodje } from '../interface/broodje.model';
import { BroodjeService } from '../services/broodje.service';
import { CartService } from '../services/cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  information = null;
  id: number;
  IsDisabled: boolean = false;
  result: Observable<Broodje>;
  public totalItems: any = 0;
  user: any = JSON.parse(sessionStorage.getItem('UserData'));


  constructor(public cartService: CartService, private broodjeService: BroodjeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(result => {
      this.totalItems = result.length;
    });
  }
  profile() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.broodjeService.getOneCustomer(id).subscribe(data => {
      console.log('details:', data);
      this.information = data;
    });
  }
}