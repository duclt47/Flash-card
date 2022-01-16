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
        return this.http.put(`${this.apiUrl}${path}\\${id}`, newCard);
    }

    delete(path: string, id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}${path}\\${id}`);
    }

    post(path: string, params): Observable<any> {
        return this.http.post(`${this.apiUrl}${path}`, params);
    }
}
