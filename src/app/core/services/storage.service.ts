import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() { }

  public setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  public getItem(key: string) {
    return localStorage.getItem(key);
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public updateItem(key, name, value) {
    let data = localStorage.getItem(key);
    let existingData = data ? JSON.parse(data) : {};
    existingData[name] = value;
    localStorage.setItem(key, JSON.stringify(existingData));
  }

  public clearStorage() {
    localStorage.clear();
  }
}
