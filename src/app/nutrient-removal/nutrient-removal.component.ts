import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '../service/product.service';
import { Product } from '../models/product';
import { PlantNutrientService } from "../service/plant-nutrient.service";
import { IPlantNutrients } from "../models/plant-nutrients";
import { map, catchError } from 'rxjs/operators';
import { Dropdown } from "../models/dropdown";

@Component({
  selector: 'app-nutrient-removal',
  templateUrl: './nutrient-removal.component.html',
  styleUrls: ['./nutrient-removal.component.css']
})
export class NutrientRemovalComponent implements OnInit {
  visibleSidebar1: boolean;
  isLoading = true;
  productDialog: boolean;
  plantDialog: boolean;
  products: Product[];
  product: Product;
  plants: IPlantNutrients[];
  plant: IPlantNutrients;
  selectedProducts: Product[];
  selectedPlants: IPlantNutrients[];
  submitted: boolean;
  submittedPlant: boolean;
  dropdownProds: any[];
  selectedDropdown: string;
  nitrogenTotal: number;
  phosphorusTotal: number;
  potassiumTotal: number;
  calciumTotal: number;
  selectedPlantName: string;
  selectedPlantID: number;

  constructor(private primengConfig: PrimeNGConfig, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private productService: ProductService,
    private plantService: PlantNutrientService) 
    {
      this.dropdownProds = [
        // {id: 0, name: "Select a Product"},
        // {id: 1, name: "ATS"},
        // {id: 2, name: "Fusion"},
        // {id: 3, name: "1_8_20"},
        // {id: 4, name: "Calcium Connect"},
        // {id: 5, name: "Bioblend powder"},
        // {id: 6, name: "Huma Connect 1"},
        // {id: 7, name: "Huma Connect 2"},
        // {id: 8, name: "Borrechel comp"},
        // {id: 9, name: "KFUEL"},
        // {id: 10, name: "KTS"},
        // {id: 11, name: "UAN-32"},
        // {id: 12, name: "CAN-17"},
        // {id: 13, name: "Thiocal"},
        // {id: 14, name: "MOP"},
        // {id: 15, name: "SOP"},
        // {id: 16, name: "20_20_20 dry"},
        // {id: 17, name: "6_31_31"},
        // {id: 18, name: "0-0-30"},
        // {id: 19, name: "KNO3"},
        // {id: 20, name: "Ca(NO3)2"},
        // {id: 21, name: "20_20_20"}
      ]
    }

    ngOnInit() {
      this.visibleSidebar1 = true;
      this.isLoading = true;
      this.primengConfig.ripple = true;

      this.productService.getProducts().subscribe(data => {
        this.isLoading = false;
        this.dropdownProds = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Product
          }
        })
      });

      this.resetValues();
    }

    openNew() {
      this.product = { };
      this.submitted = false;
      this.productDialog = true;
    }
  
    openNewPlant() {
      this.plant = {tons: 0, nitrogen: 0, phosphorus: 0, potassium: 0, calcium: 0};
      this.submittedPlant = false;
      this.plantDialog = true;
    }

    deleteProduct(product: Product) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter(val => val.name !== product.name);
              this.product = {};
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Fertilizer Deleted', life: 3000});
          }
      });
  }

  deletePlant(plant: IPlantNutrients) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete removal amount ' + plant.tons + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.plants = this.plants.filter(val => val.tons !== plant.tons);
            this.product = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Removal Rate Deleted', life: 3000});
        }
    });
  } 

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  hidePlantDialog() {
    this.plantDialog = false;
    this.submittedPlant = false;
  }

  saveProduct() {
    this.submitted = true;
    console.log("Save Product");
    console.log(this.selectedDropdown);
    console.log(this.product.weight);

    // TODO need to fix this
    const productWeight = this.product.weight!;
    this.productService.calculateProduct(this.selectedDropdown, productWeight)
        .then(data => {
          let a = data;
          this.products.push(a);
          // TODO fix calculations
          // this.nitrogenTotal = parseFloat((this.nitrogenTotal + a.nitrogen).toFixed(2));
          // this.phosphorusTotal = parseFloat((this.phosphorusTotal + a.phosphorus).toFixed(2));
          // this.potassiumTotal = parseFloat((this.potassiumTotal + a.potassium).toFixed(2));
          // this.calciumTotal = parseFloat((this.calciumTotal + a.calcium).toFixed(2));
          this.productDialog = false;
          this.product = {};
        });
  }

  resetValues() {
    this.plants = [];
    this.products = [];
    this.nitrogenTotal = 0;
    this.phosphorusTotal = 0;
    this.potassiumTotal = 0;
    this.calciumTotal = 0;
  }

  selectPlant(plantID: number) {
    this.resetValues();
    this.selectedPlantID = plantID;

    switch(plantID) {
      case 1 :
        this.selectedPlantName = "Tomato";
        // this.productService.getNutrientRemovals("Tomato").then(data => {
        //   this.products = data;
        // })
        break;
      case 2: 
        this.selectedPlantName = "Melon";
        break;
      case 3: 
        this.selectedPlantName = "Strawberries";
        break;
      case 4:
        this.selectedPlantName = "Grapes";
        break;
      case 5:
        this.selectedPlantName = "Almonds";
        break;
      case 6:
        this.selectedPlantName = "Avocados";
        break;
      case 7:
        this.selectedPlantName = "Walnuts";
        break;
      case 8:
        this.selectedPlantName = "Peas";
        break;
    }
  }

  savePlant() {
    //hack to say that tons will be populated
    let amount: number = this.plant.tons!;
    this.plantService.calculatePlantNutrient(this.selectedPlantID, amount)
        .then(data =>{
          let a = data;
          this.plants.push(a);
          // this.plants.sort((a, b) => (a.tons > b.tons) ? 1 : -1);
          this.plantDialog = false;
          this.plant = {tons: 0, nitrogen: 0, phosphorus: 0, potassium: 0, calcium: 0};
        })
  }
}
