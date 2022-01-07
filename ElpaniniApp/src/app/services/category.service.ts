/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url =  'https://samysah.be/php/api/';
  apiKey = 'category/read.php';
  Apiurl = 'https://samysah.be/php/api/';

  constructor(private http: HttpClient) { }

  getRemoteData(){
    return this.http.get(`${this.url}${this.apiKey}`);
  }

  getCategories() {
    return this.http.get(this.Apiurl + 'category/read.php');
  }

  getOneCategory() {
    return this.http.get(this.Apiurl + 'category/readOne.php?id=${id}');
  }
}
