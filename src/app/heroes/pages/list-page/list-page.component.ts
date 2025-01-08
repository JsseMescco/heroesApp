import { Component, inject, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {
  heroes: Hero[] = [];
  private readonly _heroService = inject(HeroService)
  ngOnInit(): void {
    this._heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
