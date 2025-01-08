import { Component, inject, OnInit } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {
  private readonly _heroesService = inject(HeroService)
  private readonly _activatedRoute = inject(ActivatedRoute)
  private _router = inject(Router)
  private snackBar = inject(MatSnackBar)
  private dialog = inject(MatDialog)

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', {
      nonNullable: true
    }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_image: new FormControl('')
  })

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {

    if (!this._router.url.includes('edit')) return;

    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => this._heroesService.getHeroById(id))
      )
      .subscribe(hero => {
        if (!hero) return this._router.navigateByUrl('/');
        this.heroForm.reset(hero);
        return;
      })

  }

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this._heroesService.updateHero(this.currentHero)
        .subscribe(hero =>
          this.showSnackBar(`${hero.superhero} updated ! `)
        );
      return;
    }

    this._heroesService.addHero(this.currentHero)
      .subscribe(hero => {
        this._router.navigate(['/heroes/edit', hero.id]);
        this.showSnackBar(`${hero.superhero} Created ! `)
      })
    // this._heroesService.updateHero(this.heroForm.value).subscribe(hero => console.log(hero));
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero id is required');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this._heroesService.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(() => {
        this._router.navigate(['/heroes/list']);
      });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result) return;

    //   this._heroesService.deleteHeroById(this.currentHero.id)
    //     .subscribe(resp => {
    //       if (resp)
    //         this._router.navigate(['/heroes/list']);
    //     });

    // });
  }
  showSnackBar(message: string): void {
    this.snackBar.open(message, 'DONE', {
      duration: 2500
    });
  }
}
