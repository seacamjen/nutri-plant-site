import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { AuthService } from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[];

  constructor(private primengConfig: PrimeNGConfig, public authService: AuthService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
      {
          label:'Nutrient Removal',
          icon:'pi pi-fw pi-table',
          routerLink: '/removal'
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
