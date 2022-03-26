import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
    //crud product here
    postProduct(data:any){
      return this._http.post<any>("http://localhost:3000/products",data).pipe(map((res:any)=>{
      return res;
      }))
    }
    getProduct(){
      return this._http.get<any>("http://localhost:3000/products").pipe(map((res:any)=>{
      return res;
      }))
    }
    updateProduct(data:any,id:number){
      return this._http.put<any>("http://localhost:3000/products/"+id,data).pipe(map((res:any)=>{
      return res;
      }))
    }
    deleteProduct(id:number){
      return this._http.delete<any>("http://localhost:3000/products/"+id).pipe(map((res:any)=>{
      return res;
      }))
    }
    getPerProduct(id:number){
      return this._http.get<any>("http://localhost:3000/products/"+id).pipe(map((res:any)=>{
      return res;
      }))
    }
  }


