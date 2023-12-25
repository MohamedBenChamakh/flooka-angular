import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from 'src/app/models/Content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }


  getContentsByCategoryId(categoryId: string): Observable<Content[]> {
    return this.http.get<Content[]>(`http://localhost:4200/api/category/${categoryId}`);
  }

  getContentById(contentId: string): Observable<Content> {
    return this.http.get<Content>(`http://localhost:4200/api/content/${contentId}`);
  }

  getAllContents(): Observable<Content[]> {
    return this.http.get<Content[]>("http://localhost:4200/api/content");
  }

  saveContent(content: Content) {
    return this.http.post("http://localhost:4200/api/content", content);
  }

}
