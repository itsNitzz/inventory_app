import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataModel } from './data.model';
import { InventoryDataService } from './inventory-data.service';

@Injectable({
  providedIn: 'root',
})
export class InventoryDataResolver implements Resolve<DataModel[]> {
  inventoryData: DataModel[];
  constructor(private inventoryDataService: InventoryDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<DataModel[]> | Promise<DataModel[]> | DataModel[] {
    return JSON.parse(localStorage.getItem('item'));
  }
}
