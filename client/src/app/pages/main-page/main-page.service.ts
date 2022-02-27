import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class MainService {
    private apiUrl = 'http://localhost:5000/api/';
    constructor(
        private http: HttpClient,

    ) { }

    get(path: string): Observable<any> {
        return this.http.get(`${this.apiUrl}${path}`);
    }

    edit(path: string, id: string, newCard ): Observable<any> {
        const formData = new FormData();
        formData.append('image', newCard.image, newCard.image.name);
        formData.append('vocabulary', newCard.vocabulary);
        formData.append('meaning', newCard.meaning);
        return this.http.put(`${this.apiUrl}${path}\\${id}`, formData);
    }

    delete(path: string, id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}${path}\\${id}`);
    }

    post(path: string, params): Observable<any> {
        const formData = new FormData();
        formData.append('image', params.image, params.image.name);
        formData.append('vocabulary', params.vocabulary);
        formData.append('meaning', params.meaning);
        return this.http.post(`${this.apiUrl}${path}`, formData);
    }
}
