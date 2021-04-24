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
  userLoggedIn: boolean;

  constructor(private primengConfig: PrimeNGConfig, public authService: AuthService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    if(this.authService.isLoggedIn){
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }

    this.setItems();
  }

  signOut(){
    this.userLoggedIn = false;
    this.authService.signOut();
    this.setItems();
  }

  setItems() {
    this.items = [
      {
          label:'Nutrient Removal',
          icon:'pi pi-fw pi-table',
          visible: this.userLoggedIn,
          items:[
            {
              label: 'New Nutrient Report',
              routerLink: '/removal'
            },
            {
              label: 'Previous Nutrient Report',
              routerLink: '/files'
            }
          ]
      },
      {
          label:'Products',
          icon:'pi pi-fw pi-globe',
          visible: this.userLoggedIn,
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
      },
      {
        label: 'Sign Out',
        icon:'pi pi-fw pi-sign-out',
        visible: this.userLoggedIn,
        command: (event) => {
          this.signOut();
          console.log(event);
        }
      }
    ];
  }
}
