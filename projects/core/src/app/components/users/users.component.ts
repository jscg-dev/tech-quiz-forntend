import { Component, OnInit } from '@angular/core';
import { DummyService, User } from '../../../../../domain/src/lib/api/dummy.service';
import { CommonModule } from '@angular/common';
import { Table, TableBodyTemplate } from '../../../../../domain/src/table/table.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ngq-users',
  standalone: true,
  imports: [
    CommonModule,
    Table,
    TableBodyTemplate,
    FormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.sass'
})
export class UsersComponent implements OnInit {
  constructor(
    private _dummy: DummyService,
    private _router: Router
  ) {}

  public data: User[] | undefined;

  protected pagination: any = {
    limit: 5,
    selected: 0
  }

  public ngOnInit(): void {
    this.Getusers();
  }

  public ChangePage($i: number): void {
    this.pagination.selected = $i;
    this.Getusers();
  }

  public Getusers(): void {
    this._dummy
      .GetUsers(this.pagination.selected, this.pagination.limit)
      .subscribe(resp => {
        this.data = resp.data;
        this.pagination.limit = resp.limit;
        this.pagination.pages = Array.from({'length': Math.ceil(resp.total / resp.limit)}).map((e, $i) => $i + 1);
      })
  }

  public Details(id: string, edit: boolean): void {
    this._router.navigate([`/users/${id}`], {
      'queryParams': {
        edit
      }
    })
  }

  public New(): void {
    this._router.navigate(['new-user'])
  }

  public RemoveUser(id: string): void {
    this._dummy.Remove(id)
      .subscribe(() => {
        this.Getusers();
      });
  }
}
