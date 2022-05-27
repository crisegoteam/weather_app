import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }
  deleteItem(key: string) {
    localStorage.removeItem(key);
  }
}
