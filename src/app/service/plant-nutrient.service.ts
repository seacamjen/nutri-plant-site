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
    
    // switch(plantID){
    //   case 1:
    //     this.unit.nitrogen = parseFloat((3.6 * amount).toFixed(2));
    //     this.unit.phosphorus = parseFloat((1.6 * amount).toFixed(2));
    //     this.unit.potassium = parseFloat((6 * amount).toFixed(2));
    //     this.unit.calcium = parseFloat((0.5 * amount).toFixed(2));
    //     resolve(this.unit);
    //     break;
    //   case 2:
    //     this.unit.nitrogen = parseFloat((4.8 * amount).toFixed(2));
    //     this.unit.phosphorus = parseFloat((0.4 * amount).toFixed(2));
    //     this.unit.potassium = parseFloat((2.4 * amount).toFixed(2));
    //     this.unit.calcium = 0;
    //     resolve(this.unit);
    //     break;
    //   case 3:
    //     this.unit.nitrogen = parseFloat((6.34 * amount).toFixed(2));
    //     this.unit.phosphorus = parseFloat((1.33 * amount).toFixed(2));
    //     this.unit.potassium = parseFloat((7.67 * amount).toFixed(2));
    //     this.unit.calcium = parseFloat((1 * amount).toFixed(2));
    //     resolve(this.unit);
    //     break;
    //   case 4:
    //     this.unit.nitrogen = parseFloat((4 * amount).toFixed(2));
    //     this.unit.phosphorus = parseFloat((1.1 * amount).toFixed(2));
    //     this.unit.potassium = parseFloat((7.5 * amount).toFixed(2));
    //     this.unit.calcium = 0;
    //     resolve(this.unit);
    //     break;
    //   case 5:
    //     //1000lbs Almonds
    //     this.unit.nitrogen = parseFloat((65 * amount).toFixed(2));
    //     this.unit.phosphorus = parseFloat((8 * amount).toFixed(2));
    //     this.unit.potassium = parseFloat((76 * amount).toFixed(2));
    //     this.unit.calcium = parseFloat((4.3 * amount).toFixed(2));
    //     resolve(this.unit);
    //     break;
    //   case 6:
    //     //16500lbs Avocado
    //     this.unit.nitrogen = parseFloat((46 * amount).toFixed(2));
    //     this.unit.phosphorus = parseFloat((40 * amount).toFixed(2));
    //     this.unit.potassium = parseFloat((134 * amount).toFixed(2));
    //     this.unit.calcium = parseFloat((9 * amount).toFixed(2));
    //     resolve(this.unit);
    //     break;
    //   case 7:
    //     //6000lbs Walnuts
    //     this.unit.nitrogen = parseFloat((110 * amount).toFixed(2));
    //     this.unit.phosphorus = parseFloat((27 * amount).toFixed(2));
    //     this.unit.potassium = parseFloat((135 * amount).toFixed(2));
    //     this.unit.calcium = parseFloat((12.9 * amount).toFixed(2));
    //     resolve(this.unit);
    //     break;
    //   case 8:
    //     //Peas unknown
    //     this.unit.nitrogen = parseFloat((3.6 * amount).toFixed(2));
    //     this.unit.phosphorus = parseFloat((1.6 * amount).toFixed(2));
    //     this.unit.potassium = parseFloat((6 * amount).toFixed(2));
    //     this.unit.calcium = parseFloat((0.5 * amount).toFixed(2));
    //     resolve(this.unit);
    //     break;
    // }
  })
  }
}
