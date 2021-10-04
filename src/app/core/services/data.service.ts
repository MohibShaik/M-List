import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Task, TransactionCategory, TransactionCategoryList } from "../index";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) { }

  public getTransactionCatgories(): Observable<TransactionCategory[]> {
    return this.http.get<TransactionCategoryList>(`${environment.baseURL}/transaction-categories`).pipe(
      map((response) => { return response.data; }));
  }


}
