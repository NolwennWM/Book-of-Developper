import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesModule } from './games/games.module';
import { MainModule } from './main/main.module';
import { NotFoundComponent } from './tools/not-found/not-found.component';
import { SecretModule } from './secret/secret.module';
import { LanguageModalComponent } from './tools/language-modal/language-modal.component';
import { SummaryComponent } from './tools/summary/summary.component';
import { APP_BASE_HREF } from '@angular/common';
// import { ScrollDirective } from './scroll.directive';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LanguageModalComponent,
    SummaryComponent,
    // ScrollDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr-FR',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    }),
    BrowserAnimationsModule,
    MainModule,
    GamesModule,
    SecretModule,
    AppRoutingModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/book'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
