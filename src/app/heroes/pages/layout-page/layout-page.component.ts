import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent implements OnInit {

  sidebarItems = [
    {
      label: 'listado', icon: 'label', url: './list'
    },
    {
      label: 'Añadir', icon: 'add', url: './new-hero'
    },
    {
      label: 'Buscar', icon: 'search', url: './search'
    }

  ]

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    console.log(this.user)
  }

  get user(): User | undefined {
    return this.authService.currentUser!
  }


  onLogout(): void {
    this.authService.logOut();
    this.router.navigate(['/auth/login']);
  }

}
