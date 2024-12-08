import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.intefaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
})
export class GifsCardComponent implements OnInit{
  
  @Input()
  public gif!: Gif;
  


  ngOnInit(): void {
    if (!this.gif)  throw new Error('Propiedad de gif requerida');
    
  }



}
