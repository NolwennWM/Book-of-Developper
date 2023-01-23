import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AssociationsComponent } from './associations/associations.component';
import { SkillsComponent } from './skills/skills.component';

const mainRoutes: Routes = [
  {path: "home", component: HomepageComponent, data: { animation: 'HomePage' }},
  {path: "accueil", redirectTo: "home", pathMatch: "full"},
  {path: "", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  declarations: [
    HomepageComponent,
    AssociationsComponent,
    SkillsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes),
    TranslateModule.forChild({extend: true})
  ]
})
export class MainModule { }
