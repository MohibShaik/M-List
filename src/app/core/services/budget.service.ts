import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Budget, BudgetList } from '..';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) { }

  public getAllBudgets(userId : number): Observable<Budget[]> {
    return this.http.get<BudgetList>(`${environment.baseURL}/allBudgets/${userId}`).pipe(
      map((response) => { return response.data; }));
  }

  public createNewBudget(budgetData : Budget): Observable<any> {
    return this.http.post(`${environment.baseURL}/budget`, budgetData)
  }

  public updateTask(budgetData : Budget, budgetId: number): Observable<any> {
    return this.http.put(`${environment.baseURL}/budget/${budgetId}`, budgetData)
  }

  public deleteTask(budgetId: number): Observable<any> {
    return this.http.delete(`${environment.baseURL}/Task/${budgetId}`)
  }
}
