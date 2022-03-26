import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  allProductData: any;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.allProduct();
  }
  //get data
  allProduct(){
    this.api.getProduct().subscribe(res=>{
      this.allProductData = res;
    })
  }

}
