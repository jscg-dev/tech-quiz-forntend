import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Page<T> {
  data: T[],
  total: number,
  page: number,
  limit: number
}

export interface User {
  id: string,
  title?: 'mr' | 'ms' | 'mrs' | 'miss' | 'dr',
  firstName: string,
  lastName: string,
  picture?: string,
  gender?: 'male' | 'female' | 'other',
  email: string,
  phone: string,
  registerDate?: Date,
  updatedDate?: Date
}

@Injectable({
  providedIn: 'root'
})
export class DummyService {
  private readonly base: string = 'https://dummyapi.io/data/v1/user'
  private readonly token: { [key: string]: string } = {
    'app-id': '63473330c1927d386ca6a3a5'
  }
  
  constructor(
    private _http: HttpClient
  ) { }

  public GetDetail(id: string): Observable<User> {
    return this._http.get<User>(`${this.base}/${id}`, {
      'headers': {
        ...this.token
      }
    })
  }

  public GetUsers(page: number = 0, limit: number = 5): Observable<Page<User>> {
    return this._http.get<Page<User>>(this.base, {
      'params': {
        limit,
        page
      },
      'headers': {
        ...this.token
      }
    })
  }

  public Add(ob: Partial<User>): Observable<User> {
    return this._http.post<User>(`${this.base}/create`, ob, {
      'headers': {
        ...this.token
      }
    })
  }

  public Update(ob: Partial<User>): Observable<User> {
    return this._http.put<User>(`${this.base}/${ob.id}`, ob, {
      'headers': {
        ...this.token
      }
    })
  }

  public Remove(id: string): Observable<Partial<User>> {
    return this._http.delete(`${this.base}/${id}`, {
      'headers': {
        ...this.token
      }
    })
  }
}
