import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListDataComponent} from "./components/list-data/list-data.component";
import {ListDataInactiveComponent} from "./components/list-data-inactive/list-data-inactive.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app-list-data'
  },
  {
    path: 'app-list-data',
    component: ListDataComponent
  },
  {
    path: 'app-list-data-inactive',
    component: ListDataInactiveComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
