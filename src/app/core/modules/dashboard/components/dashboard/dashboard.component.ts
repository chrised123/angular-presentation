import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userProducts;

  constructor(private product: ProductService) { }

  ngOnInit() {
    this.product.get().subscribe((data) => {
      this.userProducts = data;
    });
  }

  doSomething = (id: number) => {
    console.log(id);
  }

}
