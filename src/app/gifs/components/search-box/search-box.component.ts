import { Component, ElementRef, viewChild, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.services';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text" 
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="serachTag()"
      #txtTagInput>
  `
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement> 

  constructor(private gifServices: GifsService){};


  serachTag(){
    const newTag = this.tagInput.nativeElement.value;
    this.gifServices.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }

}
