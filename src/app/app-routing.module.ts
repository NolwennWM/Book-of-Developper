import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './tools/not-found/not-found.component';
import { SummaryComponent } from './tools/summary/summary.component';

const routes: Routes = [
  {path: "summary", component: SummaryComponent, data: { animation: "SummaryPage" }},
  {path:"**", component: NotFoundComponent, data: { animation: 'NotFoundPage' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
