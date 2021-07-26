import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() { }

  public setItem(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }

  public getItem(key: string) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  public removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  public updateItem(key, name, value) {
    let data = sessionStorage.getItem(key);
    let existingData = data ? JSON.parse(data) : {};
    existingData[name] = value;
    sessionStorage.setItem(key, JSON.stringify(existingData));
  }

  public clearStorage() {
    sessionStorage.clear();
  }
}
