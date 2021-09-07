import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { DataModel } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryDataService {
  constructor(private http: HttpClient) {}
  uploadedData: DataModel;

  onCreateAndStoreData(postData: DataModel) {
    this.uploadedData = postData;
    this.http
      .post<{ name: string }>(
        'https://inventory-app-e3fe6-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe();
  }

  // fecthing data from the backend(firebase)
  onFetchingPosts() {
    return this.http
      .get<{ [s: string]: DataModel }>(
        'https://inventory-app-e3fe6-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((responseData) => {
          const modifiedData: DataModel[] = [];
          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              modifiedData.push({ ...responseData[key], id: key });
            }
          }
          return modifiedData;
        })
      );
  }

  onDelete() {}
}
