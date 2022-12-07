import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any = []
  public protectList = new BehaviorSubject<any>([]);

  constructor() { }

  getProducts(){
    return this.protectList.asObservable(); //asObservable to keep the list
  }

  setProducts(product : any){
    this.cartItemList.push(...product);
    this.protectList.next(product);
  }
  addtoCart(product : any){
    this.cartItemList.push(product);
    this.protectList.next(this.cartItemList);
    // this.getTotalPrice();
    console.log(this.cartItemList);
  }
  // getTotalPrice(){
  //   let grandTotal = 0;
  //   this.cartItemList.map((a:any)=>{
  //     grandTotal += a.total;
  //   })
  // }

  removeItem(product : any){   //remove one item from the cart
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id==a.id){
        this.cartItemList.splice(index,1);
      }
    })
  }
}
