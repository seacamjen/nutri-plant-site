import { Injectable } from '@angular/core';
import { IPlantNutrients } from '../models/plant-nutrients';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class PlantNutrientService {
  unit: IPlantNutrients;

  constructor(private firestore: AngularFirestore) { }

  getNutrient(docID: string) {
    return this.firestore.collection('nutrients').doc(docID).get();
  }

  getPrePopulateNutrient(docID: string) {
    return this.firestore.collection('nutrientPrep').doc(docID).collection("prepopulate").snapshotChanges();
  }

  calculatePlantNutrient(name: string, amount: number){
    return new Promise<IPlantNutrients>(resolve => {

      this.unit = {
        tons: amount
      }

    this.getNutrient(name).subscribe(resp => {
      let a = resp;
      this.unit.nitrogen = parseFloat((a.get('nitrogen') * amount).toFixed(2));
      this.unit.phosphorus = parseFloat((a.get('phosphorus') * amount).toFixed(2));
      this.unit.potassium = parseFloat((a.get('potassium') * amount).toFixed(2));
      this.unit.calcium = parseFloat((a.get('calcium') * amount).toFixed(2));
      this.unit.magnesium = parseFloat((a.get('magnesium') * amount).toFixed(2));
      this.unit.sulfate = parseFloat((a.get('sulfate') * amount).toFixed(2));
      this.unit.iron = parseFloat((a.get('iron') * amount).toFixed(2));
      this.unit.manganese = parseFloat((a.get('manganese') * amount).toFixed(2));
      this.unit.copper = parseFloat((a.get('copper') * amount).toFixed(2));
      this.unit.zinc = parseFloat((a.get('zinc') * amount).toFixed(2));
      this.unit.boron = parseFloat((a.get('boron') * amount).toFixed(2));
      this.unit.molybdenum = parseFloat((a.get('molybdenum') * amount).toFixed(2));
      this.unit.carbon = parseFloat((a.get('carbon') * amount).toFixed(2));
    });

    resolve(this.unit);
  })
  }
}
