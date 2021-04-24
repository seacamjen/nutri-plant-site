import { Component, OnInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { IPlantNutrients } from '../models/plant-nutrients';
import { FertilizerTotals, Product } from '../models/product';
import { ProductService } from '../service/product.service';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { SelectItem } from "primeng/api";

class Files {
  account: string;
  date: Date;
  fertTotal: FertilizerTotals;
  id: string;
  plantName: string;
  plantUnits: string;
  plants: IPlantNutrients[];
  products: Product[];
  clientName: string;
}

@Component({
  selector: 'app-nutri-files',
  templateUrl: './nutri-files.component.html',
  styleUrls: ['./nutri-files.component.css'],
  providers: [ConfirmationService]
})
export class NutriFilesComponent implements OnInit {
  plants: IPlantNutrients[];
  products: Product[];
  plantName: string;
  plantUnits: string;
  collections: Files[];
  display: boolean = false;
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;

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

  constructor(private productService: ProductService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.productService.getNutrientRemovalRecords().subscribe(data => {
      this.collections = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        }
      })
    });

    this.sortOptions = [
      {label: 'Client A-Z', value: 'clientName'},
      {label: 'Client Z-A', value: '!clientName'},
      {label: 'Plant A-Z', value: 'plantName'},
      {label: 'Plant Z-A', value: '!plantName'},
      {label: 'Date Recent', value: '!date'},
      {label: 'Date Last', value: 'date'}
    ];
  }

  onSortChange(event: { value: any; }) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
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

  deleteFile(fileId: string) {
      this.confirmationService.confirm({
          message: 'Do you want to delete this record?',
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          accept: () => {
            this.productService.deleteNutrientRemovalRecord(fileId);
          }
      });
  }
}
