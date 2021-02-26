import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productForm = this.fb.group ({
    name: ['', Validators.required],
    weight: ['', Validators.required],
    nitrogen: ['', Validators.required],
    phosphorus: ['', Validators.required],
    potassium: ['', Validators.required],
    calcium: ['', Validators.required],
    magnesium: ['', Validators.required],
    sulfate: ['', Validators.required],
    iron: ['', Validators.required],
    manganese: ['', Validators.required],
    copper: ['', Validators.required],
    zinc: ['', Validators.required],
    boron: ['', Validators.required],
    molybdenum: ['', Validators.required],
    carbon: ['', Validators.required],
  });

  constructor(private productService: ProductService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    this.productService.createProduct(this.productForm.value);
    this.router.navigateByUrl('/products');
  }

}
