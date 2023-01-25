import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerciComponent } from './merci/merci.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const secretRoutes: Routes = 
[
  {path: "merci", component: MerciComponent, data: {Animation: "ThanksPage"}}
]

@NgModule({
  declarations: [
    MerciComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(secretRoutes),
    TranslateModule.forChild({extend: true})
  ]
})
export class SecretModule { }
