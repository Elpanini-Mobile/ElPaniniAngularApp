/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum SearchType {
  all = '',
  halal = 'halal',
  vegan = 'vegan',
  glutenvrij = 'glutenvrij',
  kosher = 'kosher'
}

@Injectable({
    providedIn: 'root'
})
export class BroodjeService {
  Apiurl = 'https://samysah.be/php/api/';

  constructor(private http: HttpClient) { }

  searchData(title: string, type: SearchType): Observable<any> {
   return this.http.get(`${this.Apiurl}category/readName.php?name=${name}`)
   .pipe(
    map(results => {
       console.log('RAW: ', results);
       return results ['Search'];
     })
   );
  }

  getDetails(id) {
    return this.http.get(`${this.Apiurl}broodjes/readOne.php?id=${id}`);
  }

  getBroodjes() {
    return this.http.get(this.Apiurl + 'broodjes/read.php');
  }
  getOneBroodjes(id) {
    return this.http.get(`${this.Apiurl}broodjes/readOne.php?id=${id}`);
  }

  getOneCustomer(id){
    const UserData = JSON.parse(sessionStorage.getItem('UserData'));
    return this.http.get(`${this.Apiurl}gebruikers/readOne.php?id=${UserData.id}`);
  }
}
