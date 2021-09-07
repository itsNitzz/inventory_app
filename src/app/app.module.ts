import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ViewInventoryComponent } from './view-inventory/view-inventory.component';
import { UpdateInventoryComponent } from './update-inventory/update-inventory.component';
import { AddItemComponent } from './add-item/add-item.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';

const appRouting: Routes = [
  { path: 'view', component: ViewInventoryComponent },
  { path: 'add-item', component: AddItemComponent },
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
    RouterModule.forRoot(appRouting),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
