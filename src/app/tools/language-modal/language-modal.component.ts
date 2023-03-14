import { Component, EventEmitter, Output} from '@angular/core';
import { LanguageService } from '../../service/language.service';

@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.scss']
})
export class LanguageModalComponent {
  @Output() bookEvent = new EventEmitter<string>();
  bookshelf = false;

  constructor(private lService: LanguageService){}
  /**
   * Change la langue et émet un évènement indiquant un nouvel état du livre.
   * @param lang langue sélectionnée
   */
  selectLanguage(lang : string): void
  {
    const book = this.lService.changeLanguage(lang);
    this.bookEvent.emit(book);
    this.bookshelf = false;
  }
  /**
   * Inverse l'état de la bibliothèque puis émet un évènement indiquant l'état dans lequel doit être le livre.
   */
  showShelf(): void
  {
    this.bookshelf = !this.bookshelf;
    if(this.bookshelf)
      this.bookEvent.emit("remove");
    else
      this.bookEvent.emit("return");
  }
}
