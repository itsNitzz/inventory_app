import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DataModel } from '../shared/data.model';
import { InventoryDataService } from '../shared/inventory-data.service';
import { ItemDataService } from '../shared/item-data.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit, OnDestroy {
  isAdded = false;
  @ViewChild('f', { static: true }) formValue: NgForm;

  constructor(
    private itemDataService: ItemDataService,
    private inventoryDataService: InventoryDataService
  ) {}

  ngOnInit() {}

  onSubmit(formData: DataModel) {
    if (JSON.parse(localStorage.getItem('item'))) {
      this.itemDataService.loadedPosts = JSON.parse(
        localStorage.getItem('item')
      );
      this.itemDataService.addNewData(formData);
      localStorage.setItem(
        'item',
        JSON.stringify(this.itemDataService.loadedPosts)
      );
    } else {
      this.itemDataService.addNewData(formData);
      localStorage.setItem(
        'item',
        JSON.stringify(this.itemDataService.loadedPosts)
      );
    }

    this.isAdded = true;
    setTimeout(() => {
      this.isAdded = false;
    }, 1000);

    this.inventoryDataService.onCreateAndStoreData();
    this.formValue.reset();
  }

  ngOnDestroy() {
    // this.dataSubs.unsubscribe();
  }
}
