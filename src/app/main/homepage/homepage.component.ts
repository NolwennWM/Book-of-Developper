import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(translate: TranslateService) { 
    // translate.setDefaultLang('fr-FR');
    // translate.use('fr-FR');
  }

  ngOnInit(): void {
  }

}
