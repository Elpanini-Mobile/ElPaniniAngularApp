/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Broodje } from '../interface/broodje.model';
import { Category } from '../interface/categorie.model';
import { BroodjeService, SearchType } from '../services/broodje.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  filter: any = {
    halal: false,
    vegan: false,
    glutenvrij: false,
    kosher: false,
  }
  ionchips: any[] = [];
  FilteredBroodjeslijst: Broodje[] = [];
  userFilter = {
    title: ''
  }

  results: Observable<any>;
  categories: Category[] = [];
  broodjes: Broodje[] = [];
  Apiurl = 'https://samysah.be/php/api/';

  constructor(private broodjeService: BroodjeService, private rout: Router, public http: HttpClient, private categoryService: CategoryService) {
   }

  ngOnInit(): void{
    this.broodjeService.getBroodjes()
    .subscribe((data) => {
      this.broodjes = data as Broodje[];
      this.FilteredBroodjeslijst = this.broodjes;
    });
  }

  filterchange(IsChecked: any, Name: any) {
    if (IsChecked) {
      this.ionchips.push(Name)
    } else {
      this.ionchips.splice(this.ionchips.indexOf(Name), 1)
    }

    if (!this.filter.vegan && !this.filter.kosher && !this.filter.halal && !this.filter.glutenvrij) {
      this.FilteredBroodjeslijst = this.broodjes;
    } else {

        this.FilteredBroodjeslijst = this.broodjes.filter(x =>
        (x.category_id.includes('1') && this.filter.vegan) ||
        (x.category_id.includes('3') && this.filter.kosher) ||
        (x.category_id.includes('0') && this.filter.halal) ||
        (x.category_id.includes('2') && this.filter.glutenvrij)
      );
    }

  }
  detailPage(id: number){
    this.rout.navigate(['detail', id]);
  }
}
