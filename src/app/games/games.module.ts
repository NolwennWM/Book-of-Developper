import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule, Routes } from '@angular/router';

const gamesRoutes: Routes = [
  {path:"jeux/:name", component:LoaderComponent, data: { animation: 'GamePage' }}
];

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(gamesRoutes)
  ]
})
export class GamesModule { }
