import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product = {
    id: null,
    prod_name: '',
    prod_desc: '',
    prod_price: null,
    updated_at: null
  };
  isLoadingResults = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router) { }

  ngOnInit() {
    this.getProductDetails(this.route.snapshot.params['id']);
  }

  getProductDetails(id) {
    this.api.getProduct(id)
      .subscribe(data => {
        this.product = data;
        console.log("product",this.product);
        this.isLoadingResults = false;
      });
  }

  deleteProduct(id) {
    window.alert("Are you sure");
    this.isLoadingResults = true;
    this.api.deleteProduct(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/products']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }
  editProduct(id){
    this.router.navigate(['/product-edit',id]);
  }


}
