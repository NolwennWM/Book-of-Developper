import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AssociationsComponent } from './associations/associations.component';
import { SkillsComponent } from './skills/skills.component';
import { ScrollDirective } from './scroll.directive';
import { ProjectsComponent } from './projects/projects.component';

const mainRoutes: Routes = [
  {path: "home", component: HomepageComponent, data: { animation: 'HomePage' }},
  {path: "accueil", redirectTo: "home", pathMatch: "full"},
  {path: "associations", component: AssociationsComponent, data: {animation: "AssociationsPage"}},
  {path: "projects", component: ProjectsComponent, data: {animation: "ProjectsPage"}},
  {path: "projets", redirectTo: "projects", pathMatch: "full"},
  {path: "skills", component: SkillsComponent, data: {animation: "SkillsPage"}},
  {path: "competences", redirectTo: "skills", pathMatch: "full"},
  {path: "", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  declarations: [
    HomepageComponent,
    AssociationsComponent,
    SkillsComponent,
    ScrollDirective,
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes),
    TranslateModule.forChild({extend: true})
  ]
})
export class MainModule { }
