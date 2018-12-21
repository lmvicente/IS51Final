import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IBike {
  id?: number;
  image?: string;
  quantitiy?: number;
  price?: number;
  description?: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  bikes: Array<any>;

  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.bikes = await this.bikeCheck();
  }

  async bikeCheck() {
    let bikes = JSON.parse(localStorage.getItem('bikes'));
    if (bikes && bikes.length > 0) {
    } else {
      bikes = await this.loadJSON();
    }
    console.log('bikes ... ', this.bikes);
    this.bikes = bikes;
    return bikes;
  }

  async loadJSON() {
    const tests = await this.http.get('assets/inventory.json').toPromise();
    return tests.json();
  }


  addBikeToOrder(item: string) {
    switch (item) {
      case 'bikeOne':
        this.bikes.unshift({
          id: 1,
          image: 'assets/bike1.jpeg',
          quantitiy: 1,
          price: 5000,
          description: 'Bike Model 1'
        });
        break;
        case 'bikeTwo':
        this.bikes.unshift({
          id: 2,
          image: '../../assets/bike2.jpeg',
          quantity: 1,
          price: 4000,
          description: 'Bike Model 2'
        });
        break;
        case 'bikeThree':
        this.bikes.unshift({
          id: 3,
          image: 'assets/bike3.jpeg',
          quantity: 1,
          price: 3000,
          description: 'Bike Model 3'
        });
        break;
    }
  }
  }
