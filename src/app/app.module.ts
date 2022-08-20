import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesModule } from './games/games.module';
import { MainModule } from './main/main.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { SecretModule } from './secret/secret.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    MainModule,
    GamesModule,
    SecretModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
