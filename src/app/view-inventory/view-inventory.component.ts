import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
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
  dataSubs: Subscription;
  isFetching = false;
  constructor(
    private itemDataService: ItemDataService,
    private router: Router,
    private inventoryDataService: InventoryDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadedPosts = this.itemDataService.getInventoryData();
    this.dataSubs = this.itemDataService.updatedPosts.subscribe(
      (updatedData) => {
        if (updatedData.length) {
          this.loadedPosts = updatedData;
        } else {
          console.log(JSON.parse(localStorage.getItem('item')));
          this.loadedPosts = JSON.parse(localStorage.getItem('item'));
        }
      }
    );
    this.route.data.subscribe((data: Data) => {
      this.loadedPosts = data['inventory'];
    });
  }

  // updating the item in the inventory
  onEditItem(index: number) {
    this.router.navigate(['/add-item', 'edit', index]);
  }

  // deleting the data inside the inventory
  onDeleteItem(index: number) {
    this.itemDataService.onDeleteItem(index);
    let onDeleteItem = JSON.parse(localStorage.getItem('item'));
    onDeleteItem = onDeleteItem.splice(index, 1);
    console.log('**', onDeleteItem);
    localStorage.setItem('item', JSON.stringify(onDeleteItem));
    this.inventoryDataService.onCreateAndStoreData();
  }

  ngOnDestroy() {
    this.dataSubs.unsubscribe();
  }
}
