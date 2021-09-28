import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DataModel } from '../shared/data.model';
import { InventoryDataService } from '../shared/inventory-data.service';
import { ItemDataService } from '../shared/item-data.service';

@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrls: ['./update-inventory.component.css'],
})
export class UpdateInventoryComponent implements OnInit {
  formData: FormGroup;
  loadedPosts: DataModel[] = [];
  index: number;
  isupdate = false;

  constructor(
    private itemDataService: ItemDataService,
    private route: ActivatedRoute,
    private inventoryDataService: InventoryDataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = params['id'];
    });

    this.inItForm();
  }

  inItForm() {
    let inventoryItem = JSON.parse(localStorage.getItem('item'))[this.index];
    if (inventoryItem) {
      this.formData = new FormGroup({
        name: new FormControl(inventoryItem.name, Validators.required),
        quantity: new FormControl(inventoryItem.quantity, Validators.required),
        price: new FormControl(inventoryItem.price, Validators.required),
        description: new FormControl(
          inventoryItem.description,
          Validators.required
        ),
      });
    } else {
      this.index = null;
      this.formData = new FormGroup({
        name: new FormControl(null, Validators.required),
        quantity: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
      });
    }
  }

  onUpdate() {
    let updateItem = JSON.parse(localStorage.getItem('item'));
    if (this.index) {
      this.itemDataService.onUpdateInventoryData(
        +this.index,
        this.formData.value
      );
      updateItem[this.index] = this.formData.value;
      localStorage.setItem('item', JSON.stringify(updateItem));
    } else {
      updateItem.push(this.formData.value);
      localStorage.setItem('item', JSON.stringify(updateItem));
      this.itemDataService.addNewData(this.formData.value);
    }

    this.itemDataService.loadedPosts = JSON.parse(localStorage.getItem('item'));

    this.isupdate = true;
    setTimeout(() => {
      this.isupdate = false;
    }, 1500);

    this.inventoryDataService.onCreateAndStoreData();
    this.formData.reset();
  }
}
