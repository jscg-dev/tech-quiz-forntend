import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DummyService } from '../../../../../domain/src/lib/api/dummy.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'ngq-users-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './users-details.component.html'
})
export class UsersDetailsComponent implements OnInit {
  public constructor(
    private _activateRoue: ActivatedRoute,
    private _dummy: DummyService,
    private _frm: FormBuilder,
    private _router: Router
  ) {}

  protected state: 'new' | 'update' | null = null;
  private _edit: boolean = false

  protected get edit(): boolean {
    return this.state == 'new' ? true : this._edit;
  }

  protected ob!: FormGroup;
  
  public ngOnInit(): void {
    
    this._activateRoue
      .queryParamMap
      .subscribe((resp) => {
        // debugger
        this._edit = (resp.get('edit') ?? 'true') == 'true';
        let copy = this.ob ? this.ob.getRawValue() : {}
        this.ob = this._frm.group({
          id: new FormControl<string | null>({value: null, disabled: true}),
          title: new FormControl<'mr' | 'ms' | 'mrs' | 'miss' | 'dr' | null>({ value: null, disabled: !this.edit }),
          firstName: new FormControl<string | null>({ value: null, disabled: !this.edit }, [Validators.required]),
          lastName: new FormControl<string | null>({ value: null, disabled: !this.edit }, [Validators.required]),
          picture: new FormControl<string | null>({ value: null, disabled: !this.edit }),
          gender: new FormControl<'male' | 'female' | 'other' | null>({ value: null, disabled: !this.edit }),
          email: new FormControl<string | null>({ value: null, disabled: !this.edit }, [Validators.required, Validators.email]),
          phone: new FormControl<string | null>({ value: null, disabled: !this.edit }, [Validators.required]),
          registerDate: new FormControl<Date | null>({ value: null, disabled: true }),
          updatedDate: new FormControl<Date | null>({ value: null, disabled: true })
        });
        this.ob.patchValue(copy);
      })
    this._activateRoue
      .paramMap
      .subscribe((resp) => {
        if(resp.get('id')) {
          this._dummy.GetDetail(resp.get('id')!)
          .subscribe(data => {
              // debugger
              data.registerDate = new Date(data.registerDate!);
              data.updatedDate = new Date(data.updatedDate!);
              this.state = 'update';
              this.ob = this._frm.group({
                id: new FormControl<string | null>({value: null, disabled: true}),
                title: new FormControl<'mr' | 'ms' | 'mrs' | 'miss' | 'dr' | null>({ value: null, disabled: !this.edit }),
                firstName: new FormControl<string | null>({ value: null, disabled: !this.edit }, [Validators.required]),
                lastName: new FormControl<string | null>({ value: null, disabled: !this.edit }, [Validators.required]),
                picture: new FormControl<string | null>({ value: null, disabled: !this.edit }),
                gender: new FormControl<'male' | 'female' | 'other' | null>({ value: null, disabled: !this.edit }),
                email: new FormControl<string | null>({ value: null, disabled: !this.edit }, [Validators.required, Validators.email]),
                phone: new FormControl<string | null>({ value: null, disabled: !this.edit }, [Validators.required]),
                registerDate: new FormControl<Date | null>({ value: null, disabled: true }),
                updatedDate: new FormControl<Date | null>({ value: null, disabled: true })
              })
              this.ob.patchValue(data);
            })
        }
        else {
          this.state = 'new'
        }
      });
  }

  public Back(): void {
    this._router
      .navigate(['users']);
  }

  public Submit(): void {
    debugger
    if(this.state == 'new') {
      this._dummy.Add(this.ob.value)
        .subscribe(resp => {
          this._router.navigate([`users/${resp.id}`], {
            'queryParams': {
              'edit': false
            }
          })
        })
    }
    else {
      this._dummy.Update(this.ob.getRawValue())
        .subscribe(resp => {
          this._router.navigate([`users/${resp.id}`], {
            'queryParams': {
              'edit': false
            }
          })
        })
    }
  }
}
