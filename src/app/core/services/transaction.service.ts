import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task, TaskList, Transaction, TransactionCategory, TransactionCategoryList, TransactionList } from '..';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  public getAllTransactions(userId): Observable<Transaction[]> {
    return this.http.get<TransactionList>(`${environment.baseURL}/AllTransactions/${userId}`).pipe(
      map((response) => { return response.data; }));
  }

  public getTransactionsByBudgetId(budgetId: number): Observable<Transaction[]> {
    return this.http.get<TransactionList>(`${environment.baseURL}/budgetTransactions/${budgetId}`).pipe(
      map((response) => { return response.data; }));
  }

  public getTransactionCatgories(): Observable<TransactionCategory[]> {
    return this.http.get<TransactionCategoryList>(`${environment.baseURL}/transaction-categories`).pipe(
      map((response) => { return response.data; }));
  }

  public createNewTransaction(transactionData : any): Observable<any> {
    return this.http.post(`${environment.baseURL}/Transaction`, transactionData)
  }

  public updateTask(taskData, taskId: number): Observable<any> {
    return this.http.put(`${environment.baseURL}/Task/${taskId}`, taskData)
  }

  public deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${environment.baseURL}/Task/${taskId}`)
  }
}
