import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '..';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public signUser(userData: user): Observable<user> {
    return this.http.post<user>(`${environment.apiRoot}auth/signin`, userData)
  }
}
