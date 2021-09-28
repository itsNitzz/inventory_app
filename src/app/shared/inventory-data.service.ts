import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { DataModel } from './data.model';
import { ItemDataService } from './item-data.service';

@Injectable({
  providedIn: 'root',
})
export class InventoryDataService implements OnDestroy {
  dataSubs: Subscription;
  constructor(
    private http: HttpClient,
    private itemDataService: ItemDataService
  ) {}

  onCreateAndStoreData() {
    let postData = JSON.parse(localStorage.getItem('item'));
    this.dataSubs = this.itemDataService.updatedPosts.subscribe(
      (updatedData) => {
        postData = updatedData;
      }
    );
    this.http
      .put(
        'https://inventory-app-e3fe6-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe();
  }

  // fecthing data from the backend(firebase)
  onFetchingPosts() {
    return this.http
      .get<DataModel[]>(
        'https://inventory-app-e3fe6-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((responseData) => {
          const modifiedData: DataModel[] = [];
          if (responseData) {
            responseData.forEach((data) => {
              modifiedData.push(data);
            });
          }
          return modifiedData;
        })
      );
  }

  ngOnDestroy() {
    this.dataSubs.unsubscribe();
  }
}
