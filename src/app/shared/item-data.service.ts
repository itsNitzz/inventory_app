import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataModel } from './data.model';
import { InventoryDataService } from './inventory-data.service';

@Injectable({
  providedIn: 'root',
})
export class ItemDataService implements OnDestroy {
  updatedPosts = new Subject<DataModel[]>();
  dataSubs: Subscription;
  posts: DataModel[] = [];

  constructor(private inventoryData: InventoryDataService) {}

  showingData() {
    this.inventoryData.onFetchingPosts().subscribe((modifiedData) => {
      this.onUpdatePosts(modifiedData);
      this.updatedPosts.next(modifiedData);
    });
  }

  onUpdatePosts(data) {
    this.dataSubs = this.updatedPosts.subscribe((data) => {
      this.posts = [...data];
    });
  }

  ngOnDestroy() {
    this.dataSubs.unsubscribe();
  }
}
