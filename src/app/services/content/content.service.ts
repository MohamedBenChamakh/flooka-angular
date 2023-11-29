import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from 'src/app/models/Content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  getContentsByCategoryId(categoryId: string): Observable<Content[]> {
    return this.http.get<Content[]>(`http://localhost:4200/api/category/${categoryId}`);
  }

  getContentById(contentId: string): Observable<Content> {
    return this.http.get<Content>(`http://localhost:4200/api/content/${contentId}`);
  }

  constructor(private http: HttpClient) { }

  getAllContents(): Observable<Content[]> {
    return this.http.get<Content[]>("http://localhost:4200/api/content");
  }
}
