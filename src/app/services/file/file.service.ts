import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {


  constructor(private http: HttpClient) { }


  saveFile(file: File ) {
    const formData = new FormData();
    formData.append("file",file);
    return this.http.post("http://localhost:4200/api/file",formData)
  }
}
