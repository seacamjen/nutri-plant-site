import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NutrientRemovalComponent } from './nutrient-removal/nutrient-removal.component';

const routes: Routes = [
  { path: 'create-product', component: NewProductComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'removal', component: NutrientRemovalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
