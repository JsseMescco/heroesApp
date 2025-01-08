import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error404-page',
  template: `<p>Error404Page works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Error404PageComponent { }
