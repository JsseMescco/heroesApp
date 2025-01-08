import { Component, inject, OnInit } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;
  private _heroesService = inject(HeroService)
  private _activatedRoute = inject(ActivatedRoute)
  private _router = inject(Router)


  ngOnInit(): void {
    this._activatedRoute.params.
      pipe(
        delay(500),
        switchMap(({ id }) => this._heroesService.getHeroById(id))
      ).subscribe(hero => {
        if (!hero) return this._router.navigate(['/heroes/list']);
        console.log(hero)
        this.hero = hero;
        return;
      })
  }

  goBack() {
    this._router.navigate(['/heroes/list'])
  }

}
