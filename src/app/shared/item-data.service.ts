import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataModel } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class ItemDataService implements OnDestroy {
  updatedPosts = new Subject<DataModel[]>();
  loadedPosts: DataModel[] = [];
  dataSubs: Subscription;
  error = new Subject<any>();

  constructor() {}

  setInventoryData(data) {
    this.loadedPosts = data;
    this.updatedPosts.next(this.loadedPosts.slice());
  }
  addNewData(data: DataModel) {
    this.loadedPosts.push(data);
    this.updatedPosts.next(this.loadedPosts.slice());
  }

  getInventoryData() {
    return this.loadedPosts.slice();
  }

  getItemById(id: number) {
    return this.loadedPosts[id];
  }

  onUpdateInventoryData(index: number, data: DataModel) {
    this.loadedPosts[index] = data;
    this.updatedPosts.next(this.loadedPosts);
  }

  onDeleteItem(index: number) {
    this.loadedPosts.splice(index, 1);
    this.updatedPosts.next(this.loadedPosts);
  }

  ngOnDestroy() {
    // this.dataSubs.unsubscribe();
  }
}
