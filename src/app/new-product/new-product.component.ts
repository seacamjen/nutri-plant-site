import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productForm = new FormGroup ({
    name: new FormControl (''),
    weight: new FormControl(''),
    nitrogen: new FormControl(''),
    phosphorus: new FormControl(''),
    potassium: new FormControl(''),
    calcium: new FormControl(''),
    magnesium: new FormControl(''),
    sulfate: new FormControl(''),
    iron: new FormControl(''),
    manganese: new FormControl(''),
    copper: new FormControl(''),
    zinc: new FormControl(''),
    boron: new FormControl(''),
    molybdenum: new FormControl(''),
    carbon: new FormControl(''),
  });

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.productService.createProduct(this.productForm.value);
    console.log(this.productForm.value);
  }

}
