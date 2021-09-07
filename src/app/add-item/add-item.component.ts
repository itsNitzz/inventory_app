import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DataModel } from '../shared/data.model';
import { InventoryDataService } from '../shared/inventory-data.service';
import { ItemDataService } from '../shared/item-data.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit, OnDestroy {
  @ViewChild('f') formData: NgForm;
  loadedData: DataModel[] = [];
  isHidden = true;
  getItemData: DataModel;
  idSubs: Subscription;
  dataSubs: Subscription;

  constructor(
    private itemDataService: ItemDataService,
    private inventoryData: InventoryDataService
  ) {}

  ngOnInit() {
    // this.dataSubs = this.itemDataService.updatedPosts.subscribe((data) => {
    //   this.loadedData = data;
    // });
  }

  onSubmit(formData: DataModel) {
    this.inventoryData.onCreateAndStoreData(formData);
    this.isHidden = false;
    setTimeout(() => {
      this.isHidden = true;
    }, 2000);
  }

  ngOnDestroy() {
    this.dataSubs.unsubscribe();
  }
}
