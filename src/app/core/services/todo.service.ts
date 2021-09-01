import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task, TaskList } from '..';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  public getAllTasks(userId): Observable<Task[]> {
    return this.http.get<TaskList>(`${environment.baseURL}/Task/${userId}`).pipe(
      map((response) => { return response.data; }));
  }

  public createTask(taskData): Observable<any> {
    return this.http.post(`${environment.baseURL}/Task`, taskData)
  }

  public updateTask(taskData, taskId: number): Observable<any> {
    return this.http.put(`${environment.baseURL}/Task/${taskId}`, taskData)
  }

  public deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${environment.baseURL}/Task/${taskId}`)
  }
}
