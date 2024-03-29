import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from 'src/app/models/Content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {


  constructor(private http: HttpClient) { }


  getContentsByCategoryId(categoryId: string, page: number): Observable<Content[]> {
    let params = new HttpParams().set("page", page.toString());
    return this.http.get<Content[]>(`http://localhost:4200/api/category/${categoryId}`, { params: params });
  }

  getContentById(contentId: string): Observable<Content> {
    return this.http.get<Content>(`http://localhost:4200/api/content/${contentId}`);
  }

  getAllContents(page: number): Observable<Content[]> {
    let params = new HttpParams().set("page", page.toString());
    return this.http.get<Content[]>("http://localhost:4200/api/content", { params: params });
  }

  saveContent(content: Content) {
    return this.http.post("http://localhost:4200/api/content", content);
  }

  likeContent(contentId: string): Observable<Content> {
    return this.http.put<Content>(`http://localhost:4200/api/content/${contentId}/like`,null);
  }

}
