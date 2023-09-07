import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListDataComponent} from "./components/list-data/list-data.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app-list-data'
  },
  {
    path: 'app-list-data',
    component: ListDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
