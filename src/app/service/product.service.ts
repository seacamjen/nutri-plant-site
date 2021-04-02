import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from "@angular/fire/storage";
import { FertilizerTotals, Product, ProductCalc } from '../models/product';
import { IPlantNutrients } from "../models/plant-nutrients";

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
  }

  createNutrientRemovalRecord(plantData: IPlantNutrients[], productData: Product[], name: string, units: string, fertilizerTotals: FertilizerTotals) {
    var id = this.generateUniqueID();
    var currentDate = Date();

    this.firestore.collection('ratePlan').doc(id).set({
      plants: plantData,
      products: productData,
      date: currentDate,
      account: null,
      plantName: name,
      plantUnits: units,
      fertTotal: fertilizerTotals,
      id: id
    })
  }

  getNutrientRemovalRecords(){
    return this.firestore.collection('ratePlan').snapshotChanges();
  }

  updateProduct(product: Product) {
    this.firestore.doc('products/' + product.id).update(product);
  }

  deleteProduct(productId: string) {
    this.firestore.doc('products/' + productId).delete();
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
        const weight = a.get('weight');
        this.unit.name = resp.get('name');
        this.unit.nitrogen = parseFloat((a.get('nitrogen') * weight * amount).toFixed(2));
        this.unit.phosphorus = parseFloat((a.get('phosphorus') * weight * amount).toFixed(2));
        this.unit.potassium = parseFloat((a.get('potassium') * weight * amount).toFixed(2));
        this.unit.calcium = parseFloat((a.get('calcium') * weight * amount).toFixed(2));
        this.unit.magnesium = parseFloat((a.get('magnesium') * weight * amount).toFixed(2));
        this.unit.sulfate = parseFloat((a.get('sulfate') * weight * amount).toFixed(2));
        this.unit.iron = parseFloat((a.get('iron') * weight * amount).toFixed(2));
        this.unit.manganese = parseFloat((a.get('manganese') * weight * amount).toFixed(2));
        this.unit.copper = parseFloat((a.get('copper') * weight * amount).toFixed(2));
        this.unit.zinc = parseFloat((a.get('zinc') * weight * amount).toFixed(2));
        this.unit.boron = parseFloat((a.get('boron') * weight * amount).toFixed(2));
        this.unit.molybdenum = parseFloat((a.get('molybdenum') * weight * amount).toFixed(2));
        this.unit.carbon = parseFloat((a.get('carbon') * weight * amount).toFixed(2));

        resolve(this.unit);
      });
    })
  }

}
