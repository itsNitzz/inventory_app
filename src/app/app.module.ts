import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ViewInventoryComponent } from './view-inventory/view-inventory.component';
import { UpdateInventoryComponent } from './update-inventory/update-inventory.component';
import { AddItemComponent } from './add-item/add-item.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { InventoryDataResolver } from './shared/inventoryData-resolver.resolver';

const appRouting: Routes = [
  {
    path: 'view',
    component: ViewInventoryComponent,
    resolve: { inventory: InventoryDataResolver },
  },
  { path: 'add-item', component: AddItemComponent },
  { path: 'add-item/edit/:id', component: UpdateInventoryComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    ViewInventoryComponent,
    UpdateInventoryComponent,
    AddItemComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRouting),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
