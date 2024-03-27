import { CommonModule } from "@angular/common";
import { Component, Directive, TemplateRef, ContentChild, Input } from "@angular/core";

export interface TableBody<T> {
  $implicit: T,
  $index: number
}

@Directive(
  {
    selector: '[body]',
    standalone: true
  }
)
export class TableBodyTemplate<T> {
  public constructor(
    public template: TemplateRef<TableBody<T>>
  ) {}
}

@Component(
  {
    selector: 'ngq-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './table.component.html'
  }
)
export class Table<T> {
  public constructor() {}
  
  @ContentChild(TableBodyTemplate<T>, { 'static': true })
  protected _bodyTemplate!: TableBodyTemplate<T>;

  private _data: T[] | undefined;
  @Input()
  public set data(value: T[] | undefined) {
    this._data = value;
  }
  public get data(): T[] | undefined {
    return this._data;
  }
}