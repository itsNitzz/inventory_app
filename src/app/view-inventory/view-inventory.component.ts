import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataModel } from '../shared/data.model';
import { InventoryDataService } from '../shared/inventory-data.service';
import { ItemDataService } from '../shared/item-data.service';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.css'],
})
export class ViewInventoryComponent implements OnInit, OnDestroy {
  loadedPosts: DataModel[] = [];
  isFetching = false;
  dataSubs: Subscription;
  constructor(
    private itemDataService: ItemDataService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('INSIDE VIEW');
    this.showData();
  }

  // diplaying the inventory data
  showData() {
    this.itemDataService.showingData();
    // this.dataSubs = this.itemDataService.updatedPosts.subscribe((data) => {
    //   this.loadedPosts = data;
    // });
    this.loadedPosts = this.itemDataService.posts;
  }

  // updating the item in the inventory
  // onEditItem(index: number) {
  //   this.itemDataService.getIndex.next(index);
  // }

  // deleting the data inside the inventory
  onDeleteItem(index: number) {}

  ngOnDestroy() {
    // this.dataSubs.unsubscribe();
  }
}
