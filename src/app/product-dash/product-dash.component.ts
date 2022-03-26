import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { ProductData } from './product-dash.model';

@Component({
  selector: 'app-product-dash',
  templateUrl: './product-dash.component.html',
  styleUrls: ['./product-dash.component.css']
})
export class ProductDashComponent implements OnInit {

  formValue!:FormGroup
  productModelObj :ProductData = new ProductData;
  constructor(private formBuilder:FormBuilder ,private api:ApiService,private router:Router) { }
  allProductData:any;
  showAdd!:boolean;
  showbtn!:boolean;
  
  ngOnInit(): void {
      this.formValue = this.formBuilder.group({
        title:[''],
        note:[''],
        image:[''],
        price:['']
      })
     this.allProduct();
     this.checkLogin();
  }
  checkLogin(){
    var checkLogin = localStorage.getItem('login');
        if(!checkLogin) {
            this.router.navigate(['login']);
        }
  }
  //add
  addProduct(){
    this.productModelObj.title = this.formValue.value.title;
    this.productModelObj.note = this.formValue.value.note;
    this.productModelObj.image = this.formValue.value.image;
    this.productModelObj.price = this.formValue.value.price;
    this.api.postProduct(this.productModelObj).subscribe(res=>{
     
      alert("Product Added Successfull");
     
      this.formValue.reset();
      this.allProduct();
    },
    err=>{
      alert("Product Add Failed");
    }
    )
  }
  //get data
  allProduct(){
    this.api.getProduct().subscribe(res=>{
      this.allProductData = res;
    })
  }
  //delete data
  deletePro(data:any){
    this.api.deleteProduct(data.id).subscribe(res=>{
      alert("Delete Product Successful");

      this.allProduct();
    })
  }
  clickAddProduct(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
  //on edit
  editPro(data:any){
    this.showAdd=false;
    this.showbtn=true;
    this.productModelObj.id = data.id;
    this.formValue.controls['title'].setValue(data.title);
    this.formValue.controls['price'].setValue(data.price);
    this.formValue.controls['note'].setValue(data.note);
    this.formValue.controls['image'].setValue(data.image);

  }
  updateProduct(){
    this.productModelObj.title = this.formValue.value.title;
    this.productModelObj.note = this.formValue.value.note;
    this.productModelObj.image = this.formValue.value.image;
    this.productModelObj.price = this.formValue.value.price;
    this.api.updateProduct(this.productModelObj, this.productModelObj.id).subscribe(res=>{
      alert("Product Updated Successfull");
      this.allProduct();
    })
  }
  logOut(){
    localStorage.removeItem("login");
    this.router.navigate(['login']);
  }

}
