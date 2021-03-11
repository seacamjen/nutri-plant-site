import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '../service/product.service';
import { Product, ProductCalc } from '../models/product';
import { PlantNutrientService } from "../service/plant-nutrient.service";
import { IPlantNutrients } from "../models/plant-nutrients";
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import html2canvas from 'html2canvas';

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
  magnesiumTotal: number;
  sulfateTotal: number;
  ironTotal: number;
  manganeseTotal: number;
  copperTotal: number;
  zincTotal: number;
  boronTotal: number;
  molybdenumTotal: number;
  carbonTotal: number;
  selectedPlantName: string;
  selectedPlantID: number;
  selectedPlantUnits: string;
  calcObject: ProductCalc;

  constructor(private primengConfig: PrimeNGConfig, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private productService: ProductService,
    private plantService: PlantNutrientService) {}

    ngOnInit() {
      this.visibleSidebar1 = true;
      this.isLoading = true;
      this.primengConfig.ripple = true;
      this.getDropdown();
      this.resetValues();
    }

    getDropdown() {
      this.productService.getProducts().subscribe(data => {
        this.isLoading = false;
        this.dropdownProds = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Product
          }
        })
        this.dropdownProds.unshift({name: 'Select'})
      });
    }

    openNew() {
      this.product = { };
      this.submitted = false;
      this.productDialog = true;
    }
  
    openNewPlant() {
      this.plant = {};
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
    if (this.selectedDropdown == null || this.product.weight == null) {
      this.hideDialog();
      this.messageService.add({severity:'warn', summary: "Error", detail: 'Please Select a Product and Amount', life: 2000})
      return;
    }

    const productWeight = this.product.weight!;
    this.productService.calculateProduct(this.selectedDropdown, productWeight)
        .then(data => {
          let a = data;
          this.products.push(a);
          this.nitrogenTotal = parseFloat((this.nitrogenTotal + a.nitrogen!).toFixed(2));
          this.phosphorusTotal = parseFloat((this.phosphorusTotal + a.phosphorus!).toFixed(2));
          this.potassiumTotal = parseFloat((this.potassiumTotal + a.potassium!).toFixed(2));
          this.calciumTotal = parseFloat((this.calciumTotal + a.calcium!).toFixed(2));
          this.magnesiumTotal = parseFloat((this.magnesiumTotal + a.magnesium!).toFixed(2));
          this.sulfateTotal = parseFloat((this.sulfateTotal + a.sulfate!).toFixed(2));
          this.ironTotal = parseFloat((this.ironTotal + a.iron!).toFixed(2));
          this.manganeseTotal = parseFloat((this.manganeseTotal + a.manganese!).toFixed(2));
          this.copperTotal = parseFloat((this.copperTotal + a.copper!).toFixed(2));
          this.zincTotal = parseFloat((this.zincTotal + a.zinc!).toFixed(2));
          this.boronTotal = parseFloat((this.boronTotal + a.boron!).toFixed(2));
          this.molybdenumTotal = parseFloat((this.molybdenumTotal + a.molybdenum!).toFixed(2));
          this.carbonTotal = parseFloat((this.carbonTotal + a.carbon!).toFixed(2));
          
          this.productDialog = false;
          this.product = {};
          this.selectedDropdown = '';
        });
  }

  resetValues() {
    this.plants = [];
    this.products = [];
    this.nitrogenTotal = 0;
    this.phosphorusTotal = 0;
    this.potassiumTotal = 0;
    this.calciumTotal = 0;
    this.magnesiumTotal = 0;
    this.sulfateTotal = 0;
    this.ironTotal = 0;
    this.manganeseTotal = 0;
    this.copperTotal = 0;
    this.zincTotal = 0;
    this.boronTotal = 0;
    this.molybdenumTotal = 0;
    this.carbonTotal = 0;
  }

  selectPlant(plantID: number) {
    this.resetValues();
    this.selectedPlantID = plantID;

    switch(plantID) {
      case 1 :
        this.selectedPlantName = "Tomato";
        this.selectedPlantUnits = "tons / acre";
        this.getPrepop(this.selectedPlantName);
        break;
      case 2: 
        this.selectedPlantName = "Melon";
        this.selectedPlantUnits = "tons / acre";
        this.getPrepop(this.selectedPlantName);
        break;
      case 3: 
        this.selectedPlantName = "Strawberry";
        this.selectedPlantUnits = "tons / acre";
        this.getPrepop(this.selectedPlantName);
        break;
      case 4:
        this.selectedPlantName = "Grapes";
        this.selectedPlantUnits = "tons / acre";
        this.getPrepop(this.selectedPlantName);
        break;
      case 5:
        this.selectedPlantName = "Almond";
        this.selectedPlantUnits = "lbs / acre";
        this.getPrepop(this.selectedPlantName);
        break;
      case 6:
        this.selectedPlantName = "Avocado";
        this.selectedPlantUnits = "lbs / acre";
        this.getPrepop(this.selectedPlantName);
        break;
      case 7:
        this.selectedPlantName = "Walnut";
        this.selectedPlantUnits = "lbs / acre";
        this.getPrepop(this.selectedPlantName);
        break;
      case 8:
        this.selectedPlantName = "Pea";
        this.selectedPlantUnits = "lbs / acre";
        this.getPrepop(this.selectedPlantName);
        break;
      case 9:
        this.selectedPlantName = "Lettuce";
        this.selectedPlantUnits = "tons / acre";
        this.getPrepop(this.selectedPlantName);
        break;
      case 10:
        this.selectedPlantName = "Onion";
        this.selectedPlantUnits = "tons / acre";
        this.getPrepop(this.selectedPlantName);
        break;
      case 11:
        this.selectedPlantName = "Spinach";
        this.selectedPlantUnits = "tons / acre";
        this.getPrepop(this.selectedPlantName);
        break;
    }
  }

  getPrepop(plantName: string) {
    this.plantService.getPrePopulateNutrient(plantName).subscribe(data =>{
      this.plants = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as IPlantNutrients
        }
      })
    });
  }

  savePlant() {
    let amount: number = this.plant.tons!;
    this.plantService.calculatePlantNutrient(this.selectedPlantName, amount)
        .then(data =>{
          let a = data;
          this.plants.push(a);
          this.plants.sort((a, b) => (a.tons! > b.tons!) ? 1 : -1);
          this.plantDialog = false;
          this.plant = {};
        })
  }

  public openNutrientPDF():void {
    window.print();
    // let DATA = document.getElementById('nutrientData');
      
    // html2canvas(DATA!).then(canvas => {
        
    //     let fileWidth = 208;
    //     let fileHeight = canvas.height * fileWidth / canvas.width;
        
    //     const FILEURI = canvas.toDataURL('image/png')
    //     let PDF = new jsPDF('p', 'mm', 'a4');
    //     let position = 0;
    //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
    //     // this.productService.uploadPDF(PDF);
    //     PDF.save('nutrients.pdf');
    // });     
  }

  public openFertPDF():void {
    // let DATA = document.getElementById('fertilizerData');
      
    // html2canvas(DATA!).then(canvas => {
    //     // let fileWidth = 208;
    //     // let fileHeight = canvas.height * fileWidth / canvas.width;
        
    //     const FILEURI = canvas.toDataURL('image/png')
    //     let PDF = new jsPDF('l', 'mm', 'a4');

    //     const bufferX = 5;
    //     const bufferY = 5;
    //     const imgProps = (<any>PDF).getImageProperties(FILEURI);
    //     const pdfWidth = PDF.internal.pageSize.getWidth() - 2 * bufferX;
    //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //     PDF.addImage(FILEURI, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');


    //     // let position = 0;
    //     // PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
    //     PDF.save('fertilizer.pdf');
    //     // TODO send pdf to storage https://jsmobiledev.com/article/cloud-function-image-base64
    //     // this.productService.uploadPDF(PDF);
    // });     
  } 

}
