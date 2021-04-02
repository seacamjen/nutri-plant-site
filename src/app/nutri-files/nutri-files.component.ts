import { Component, OnInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { IPlantNutrients } from '../models/plant-nutrients';
import { FertilizerTotals, Product } from '../models/product';
import { ProductService } from '../service/product.service';

class Files {
  account: string;
  date: Date;
  fertTotal: FertilizerTotals;
  id: string;
  plantName: string;
  plantUnits: string;
  plants: IPlantNutrients[];
  products: Product[];
}

@Component({
  selector: 'app-nutri-files',
  templateUrl: './nutri-files.component.html',
  styleUrls: ['./nutri-files.component.css']
})
export class NutriFilesComponent implements OnInit {
  plants: IPlantNutrients[];
  products: Product[];
  plantName: string;
  plantUnits: string;
  collections: Files[];
  display: boolean = false;

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

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getNutrientRemovalRecords().subscribe(data => {
      this.collections = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        }
      })
    });
  }

  showFileDetails(plants: IPlantNutrients[], products: Product[], name: string, units: string, totals: FertilizerTotals) {
    this.plants = plants;
    this.products = products;
    this.plantName = name;
    this.plantUnits = units;

    this.nitrogenTotal = totals.nitrogenTotal;
    this.phosphorusTotal = totals.phosphorusTotal;
    this.potassiumTotal = totals.potassiumTotal;
    this.calciumTotal = totals.calciumTotal;
    this.magnesiumTotal = totals.magnesiumTotal;
    this.sulfateTotal = totals.sulfateTotal;
    this.ironTotal = totals.ironTotal;
    this.manganeseTotal = totals.manganeseTotal;
    this.copperTotal = totals.copperTotal;
    this.zincTotal = totals.zincTotal;
    this.boronTotal = totals.boronTotal;
    this.molybdenumTotal = totals.molybdenumTotal;
    this.carbonTotal = totals.carbonTotal;

    this.display = true;
  }

  printDialog() {
    window.print();
  }

  showFullDialog(dialog: Dialog) {
    dialog.maximize();
  }
}
