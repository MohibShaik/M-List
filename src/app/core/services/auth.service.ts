import { StorageService } from './storage.service';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '..';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  public createNewUser(userData: User): Observable<User> {
    return this.http.post<User>(`${environment.baseURL}/auth/signup`, userData)
  }

  public login(userData: User): Observable<User> {
    return this.http.post<User>(`${environment.baseURL}/auth/signin`, userData)
  }

  public getToken(): boolean {
    return !!this.storage.getItem("accessToken");
  }

}