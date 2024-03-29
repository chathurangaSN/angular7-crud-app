import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productForm: FormGroup;
  prod_name: string = '';
  prod_desc: string = '';
  prod_price: number = null;
  updated_at: Date = null;
  isLoadingResults = false;
  current_date = new Date();

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'prod_name' : [null, Validators.required],
      'prod_desc' : [null, Validators.required],
      'prod_price' : [null, Validators.required],
      'updated_at':this.current_date
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.addProduct(form)
      .subscribe(res => {
          let id = res['id'];
          console.log(id);
          this.isLoadingResults = false;
          // this.router.navigate(['/products']);
          this.router.navigate(['/product-details/'+id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
