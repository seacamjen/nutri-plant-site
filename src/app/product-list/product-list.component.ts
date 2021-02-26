import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../models/product';
import { SelectItem } from 'primeng/api';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  isLoading: boolean;
  products: any[];
  clonedProducts: { [s: string]: Product; } = {};

  constructor(private productService: ProductService, 
              private messageService: MessageService, 
              private confirmationService: ConfirmationService, 
              private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.productService.getProducts().subscribe(data => {
      this.isLoading = false;
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Product
        }
      })
    });
  }

  create(product: Product) {
    this.productService.createProduct(product);
  }

  update(product: Product) {
    this.productService.updateProduct(product);
  }

  delete(id: string) {
    this.productService.deleteProduct(id);
  }

  onRowEditInit(product: Product) {
    const productID = product.id!;
    this.clonedProducts[productID] = { ...product };
  }

  onRowEditSave(product: Product) {
    console.log("This is saving")
    this.productService.updateProduct(product);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
  }

  onRowEditCancel(product: Product, index: number) {
    const productID = product.id!;
    this.products[index] = this.clonedProducts[productID];
    delete this.clonedProducts[productID];
  }

  onRowDelete(productID: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      accept: () => {
        this.productService.deleteProduct(productID);
      }
    });
  }

  addProduct() {
    this.router.navigateByUrl('/create-product')
  }
}
