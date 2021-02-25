import { Injectable } from '@angular/core';
import { IPlantNutrients } from '../models/plant-nutrients';

@Injectable({
  providedIn: 'root'
})
export class PlantNutrientService {
  unit: IPlantNutrients;

  constructor() { }

  calculatePlantNutrient(plantID: number, amount: number){
    return new Promise<IPlantNutrients>(resolve => {

      this.unit = {
        tons: amount
      }
    
    switch(plantID){
      case 1:
        this.unit.nitrogen = parseFloat((3.6 * amount).toFixed(2));
        this.unit.phosphorus = parseFloat((1.6 * amount).toFixed(2));
        this.unit.potassium = parseFloat((6 * amount).toFixed(2));
        this.unit.calcium = parseFloat((0.5 * amount).toFixed(2));
        resolve(this.unit);
        break;
      case 2:
        this.unit.nitrogen = parseFloat((4.8 * amount).toFixed(2));
        this.unit.phosphorus = parseFloat((0.4 * amount).toFixed(2));
        this.unit.potassium = parseFloat((2.4 * amount).toFixed(2));
        this.unit.calcium = 0;
        resolve(this.unit);
        break;
      case 3:
        this.unit.nitrogen = parseFloat((6.34 * amount).toFixed(2));
        this.unit.phosphorus = parseFloat((1.33 * amount).toFixed(2));
        this.unit.potassium = parseFloat((7.67 * amount).toFixed(2));
        this.unit.calcium = parseFloat((1 * amount).toFixed(2));
        resolve(this.unit);
        break;
      case 4:
        this.unit.nitrogen = parseFloat((4 * amount).toFixed(2));
        this.unit.phosphorus = parseFloat((1.1 * amount).toFixed(2));
        this.unit.potassium = parseFloat((7.5 * amount).toFixed(2));
        this.unit.calcium = 0;
        resolve(this.unit);
        break;
      case 5:
        //1000lbs Almonds
        this.unit.nitrogen = parseFloat((65 * amount).toFixed(2));
        this.unit.phosphorus = parseFloat((8 * amount).toFixed(2));
        this.unit.potassium = parseFloat((76 * amount).toFixed(2));
        this.unit.calcium = parseFloat((4.3 * amount).toFixed(2));
        resolve(this.unit);
        break;
      case 6:
        //16500lbs Avocado
        this.unit.nitrogen = parseFloat((46 * amount).toFixed(2));
        this.unit.phosphorus = parseFloat((40 * amount).toFixed(2));
        this.unit.potassium = parseFloat((134 * amount).toFixed(2));
        this.unit.calcium = parseFloat((9 * amount).toFixed(2));
        resolve(this.unit);
        break;
      case 7:
        //6000lbs Walnuts
        this.unit.nitrogen = parseFloat((110 * amount).toFixed(2));
        this.unit.phosphorus = parseFloat((27 * amount).toFixed(2));
        this.unit.potassium = parseFloat((135 * amount).toFixed(2));
        this.unit.calcium = parseFloat((12.9 * amount).toFixed(2));
        resolve(this.unit);
        break;
      case 8:
        //Peas unknown
        this.unit.nitrogen = parseFloat((3.6 * amount).toFixed(2));
        this.unit.phosphorus = parseFloat((1.6 * amount).toFixed(2));
        this.unit.potassium = parseFloat((6 * amount).toFixed(2));
        this.unit.calcium = parseFloat((0.5 * amount).toFixed(2));
        resolve(this.unit);
        break;
    }
  })
  }
}
