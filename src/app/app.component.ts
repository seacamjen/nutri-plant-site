import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
      {
          label:'Nutrient Removal',
          icon:'pi pi-fw pi-table',
          routerLink: '/removal'
          // items:[
          //     {
          //       label:'Tomato'
          //     },
          //     {
          //       label:'Melon'
          //     }, 
          //     {
          //       label:'Strawberry'
          //     },
          //     {
          //       label:'Grape'
          //     },
          //     {
          //       label:'Almond'
          //     },
          //     {
          //       label:'Avocado'
          //     },
          //     {
          //       label:'Walnut'
          //     },
          //     {
          //       label:'Pea'
          //     }
          // ]
      },
      {
          label:'Products',
          icon:'pi pi-fw pi-globe',
          items:[
              {
                  label:'All Products',
                  routerLink: '/products'
              },
              {
                  label:'Add Product',
                  routerLink:'/create-product'
              }
          ]
      }
    ];
  }
}
