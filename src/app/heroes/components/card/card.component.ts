import { Component, Input, input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-card-hero',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit{

  @Input() hero!: Hero ;


  ngOnInit(): void {

  }
}
