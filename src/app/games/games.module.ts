import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const gamesRoutes: Routes = [
  {path:"jeux/:name", component:LoaderComponent, data: { animation: 'GamesPage' }}
];

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(gamesRoutes),
    TranslateModule.forChild({extend: true})
  ]
})
export class GamesModule { }
