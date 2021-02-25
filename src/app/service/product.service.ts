import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  unit: Product;

  constructor(private firestore: AngularFirestore) { }

  getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }

  createProduct(product: Product) {
    return this.firestore.collection('products').add(product);
  }

  updateProduct(product: Product) {
    delete product.id;
    this.firestore.doc('products/' + product.id).update(product);
  }

  deleteProduct(productId: string) {
    this.firestore.doc('products/' + productId).delete();
  }

  calculateProduct(productID: string, amount: number){
    console.log("Product ID " + productID);
  }

  // calculateProduct(productID: number, amount: number){
  //   return new Promise<Product>(resolve => {
    
  //   this.unit = {
  //     id: productID,
  //     amount: amount
  //   };

  //   switch(productID){
  //     case 1:
  //       this.unit.name = "ATS";
  //       this.unit.nitrogen = parseFloat((0.1 * amount).toFixed(2));
  //       this.unit.phosphorus = parseFloat((0.4 * amount).toFixed(2));
  //       this.unit.potassium = parseFloat((0.6 * amount).toFixed(2));
  //       this.unit.calcium = 0;
  //       resolve(this.unit);
  //       break;
  //     case 2:
  //       this.unit.name = "Fusion";
  //       this.unit.nitrogen = parseFloat((0.04 * amount).toFixed(2));
  //       this.unit.phosphorus = parseFloat((0.1 * amount).toFixed(2));
  //       this.unit.potassium = parseFloat((0.3 * amount).toFixed(2));
  //       this.unit.calcium = 0;
  //       resolve(this.unit);
  //       break;
  //     case 3:
  //       this.unit.name = "1_8_20";
  //       this.unit.nitrogen = parseFloat((0.1 * amount).toFixed(2));
  //       this.unit.phosphorus = parseFloat((1 * amount).toFixed(2));
  //       this.unit.potassium = parseFloat((2.22 * amount).toFixed(2));
  //       this.unit.calcium = 0;
  //       resolve(this.unit);
  //       break;
  //     case 4:
  //       this.unit.name = "Calcium Connect";
  //       this.unit.nitrogen = 0;
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = 0;
  //       this.unit.calcium = parseFloat((0.05 * amount).toFixed(2));
  //       resolve(this.unit);
  //       break;
  //     case 5:
  //       this.unit.name = "Bioblend powder";
  //       this.unit.nitrogen = parseFloat((0.03 * amount).toFixed(2));
  //       this.unit.phosphorus = parseFloat((0.02 * amount).toFixed(2));
  //       this.unit.potassium = parseFloat((0.1 * amount).toFixed(2));
  //       this.unit.calcium = 0;
  //       resolve(this.unit);
  //       break;
  //     case 6:
  //       this.unit.name = "Huma Connect 1";
  //       this.unit.nitrogen = 0;
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = parseFloat((0.2 * amount).toFixed(2));
  //       this.unit.calcium = 0;
  //       resolve(this.unit);
  //       break;
  //     case 7:
  //       this.unit.name = "Huma Connect 2";
  //       this.unit.nitrogen = 0;
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = parseFloat((0.2 * amount).toFixed(2));
  //       this.unit.calcium = 0;
  //       resolve(this.unit);
  //       break;
  //     case 8:
  //       this.unit.name = "Borrechel comp";
  //       this.unit.nitrogen = parseFloat((0.02 * amount).toFixed(2));
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = 0;
  //       this.unit.calcium = 0;
  //       resolve(this.unit);
  //       break;
  //     case 9:
  //       this.unit.name = "KFUEL";
  //       this.unit.nitrogen = 0;
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = parseFloat((2.6 * amount).toFixed(2));
  //       this.unit.calcium = 0;
  //       resolve(this.unit);
  //       break;
  //     case 10:
  //       this.unit.name = "KTS";
  //       this.unit.nitrogen = 0;
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = parseFloat((3 * amount).toFixed(2));
  //       this.unit.calcium = 0;
  //       resolve(this.unit);
  //       break;
  //     case 11:
  //       this.unit.name = "UAN-32";
  //       this.unit.nitrogen = parseFloat((3.5 * amount).toFixed(2));
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = 0;
  //       this.unit.calcium = 0;
  //       resolve(this.unit);
  //       break;
  //     case 12:
  //       this.unit.name = "CAN-17";
  //       this.unit.nitrogen = parseFloat((2.1 * amount).toFixed(2));
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = 0;
  //       this.unit.calcium = parseFloat((1.1 * amount).toFixed(2));
  //       resolve(this.unit);
  //       break;
  //     case 13:
  //       this.unit.name = "Thiocal";
  //       this.unit.nitrogen = 0;
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = 0;
  //       this.unit.calcium = 0;
  //       resolve(this.unit);
  //       break;
  //     case 14:
  //       this.unit.name = "MOP";
  //       this.unit.nitrogen = 0;
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = 0;
  //       this.unit.calcium = parseFloat((0.6 * amount).toFixed(2));
  //       resolve(this.unit);
  //       break;
  //     case 15:
  //       this.unit.name = "SOP";
  //       this.unit.nitrogen = 0;
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = 0;
  //       this.unit.calcium = 0;
  //       resolve(this.unit);
  //       break;
  //     case 16:
  //       this.unit.name = "20_20_20 dry";
  //       this.unit.nitrogen = 0;
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = 0;
  //       this.unit.calcium = 0;
  //       resolve(this.unit);
  //       break;
  //     case 17:
  //       this.unit.name = "6_31_31";
  //       this.unit.nitrogen = 0;
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = 0;
  //       this.unit.calcium = 0;
  //       resolve(this.unit);
  //       break;
  //     case 18:
  //       this.unit.name = "0-0-30";
  //       this.unit.nitrogen = 0;
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = 0;
  //       this.unit.calcium = parseFloat((3.7 * amount).toFixed(2));
  //       resolve(this.unit);
  //       break;
  //     case 19:
  //       this.unit.name = "Ca(NO3)2";
  //       this.unit.nitrogen = 0;
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = 0;
  //       this.unit.calcium = parseFloat((3.7 * amount).toFixed(2));
  //       resolve(this.unit);
  //       break;
  //     case 20:
  //       this.unit.name = "20_20_20";
  //       this.unit.nitrogen = 0;
  //       this.unit.phosphorus = 0;
  //       this.unit.potassium = 0;
  //       this.unit.calcium = parseFloat((3.7 * amount).toFixed(2));
  //       resolve(this.unit);
  //       break;
  //   }
  // })
  // }

}
