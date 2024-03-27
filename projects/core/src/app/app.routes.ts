import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';

export const routes: Routes = [
  {
    'path': '',
    'redirectTo': '/users',
    'pathMatch': 'full'
  },
  {
    'path': 'users',
    'component': UsersComponent,
  },
  {
    'path': 'users/:id',
    'component': UsersDetailsComponent
  },
  {
    'path': 'new-user',
    'component': UsersDetailsComponent
  }
];
