import { Component, EventEmitter, Output} from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.scss']
})
export class LanguageModalComponent {
  @Output() bookEvent = new EventEmitter<string>();
  bookshelf = false;

  constructor(private lService: LanguageService){}

  selectLanguage(lang : string)
  {
    // TODO: ranger le livre quand on clique sur la langue.
    const book = this.lService.changeLanguage(lang);
    this.bookEvent.emit(book);
    this.bookshelf = false;
  }
  showShelf()
  {
    this.bookshelf = !this.bookshelf;
    if(this.bookshelf)
      this.bookEvent.emit("remove");
    else
      this.bookEvent.emit("return");
  }
}
