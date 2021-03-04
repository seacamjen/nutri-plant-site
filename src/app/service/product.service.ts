import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from "@angular/fire/storage";
import jsPDF from 'jspdf';
import { Product, ProductCalc } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  unit: ProductCalc;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  constructor(private firestore: AngularFirestore, private fireStorage: AngularFireStorage) { }

  getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }

  getProduct(docID: string) {
    return this.firestore.collection('products').doc<Product>(docID).get();
  }

  createProduct(product: Product) {
    var id = this.generateUniqueID();
    let newDoc = product.name + id;

    return this.firestore.collection('products').doc(newDoc).set({
      name: product.name,
      weight: product.weight,
      nitrogen: product.nitrogen,
      phosphorus: product.phosphorus,
      potassium: product.potassium,
      calcium: product.calcium,
      magnesium: product.magnesium,
      sulfate: product.sulfate,
      iron: product.iron,
      manganese: product.manganese,
      copper: product.copper,
      zinc: product.zinc,
      boron: product.boron,
      molybdenum: product.molybdenum,
      carbon: product.carbon
    })

    // return this.firestore.collection('products').add(product);
  }

  updateProduct(product: Product) {
    this.firestore.doc('products/' + product.id).update(product);
  }

  deleteProduct(productId: string) {
    this.firestore.doc('products/' + productId).delete();
  }

  uploadPDF(file: jsPDF) {
    const id = Date.now().toString();
    this.ref = this.fireStorage.ref(id);
    var metadata = {
      contentType: 'application/pdf'
    }
    console.log(file);
    // this.task = this.ref.put(file, metadata);
  }

  generateUniqueID () {
    return '_' + Math.random().toString(36).substr(2,9);
  }

  calculateProduct(productID: string, amount: number){
    return new Promise<ProductCalc>(resolve => {
    
      this.unit = {
        id: productID,
        amount: amount
      };

      this.getProduct(productID).subscribe(resp => {
        let a = resp;
        this.unit.name = resp.get('name');
        this.unit.nitrogen = parseFloat((a.get('nitrogen') * a.get('weight') * amount).toFixed(2));
        this.unit.phosphorus = parseFloat((a.get('phosphorus') * a.get('weight') * amount).toFixed(2));
        this.unit.potassium = parseFloat((a.get('potassium') * a.get('weight') * amount).toFixed(2));
        this.unit.calcium = parseFloat((a.get('calcium') * a.get('weight') * amount).toFixed(2));
        this.unit.magnesium = parseFloat((a.get('magnesium') * a.get('weight') * amount).toFixed(2));
        this.unit.sulfate = parseFloat((a.get('sulfate') * a.get('weight') * amount).toFixed(2));
        this.unit.iron = parseFloat((a.get('iron') * a.get('weight') * amount).toFixed(2));
        this.unit.manganese = parseFloat((a.get('manganese') * a.get('weight') * amount).toFixed(2));
        this.unit.copper = parseFloat((a.get('copper') * a.get('weight') * amount).toFixed(2));
        this.unit.zinc = parseFloat((a.get('zinc') * a.get('weight') * amount).toFixed(2));
        this.unit.boron = parseFloat((a.get('boron') * a.get('weight') * amount).toFixed(2));
        this.unit.molybdenum = parseFloat((a.get('molybdenum') * a.get('weight') * amount).toFixed(2));
        this.unit.carbon = parseFloat((a.get('carbon') * a.get('weight') * amount).toFixed(2));

        resolve(this.unit);
      });

      // resolve(this.unit);
    })
  }

}
