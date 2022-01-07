import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private route: Router, private catser: CategoryService) { }

  ngOnInit() {
    this.catser.getRemoteData().subscribe(data => {
      console.log('Hey:');
      console.log(data);
    });
  }

  loginPage(){
    this.route.navigate(['login']);
   }
   registerPage(){
    this.route.navigate(['register']);
   }

}
