import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class ApiService {
    private httpHeaders: any;

    constructor(private httpClient: HttpClient) {
        this.httpHeaders = this.buildHttpHeaders();
    }

    get<T>(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.httpClient.get<T>(`${path}`, { headers: this.httpHeaders, params: this.removeNullValuesFromQueryParams(params) })
            .pipe(mergeMap(response => this.mapResponse(response)), catchError(this.handleError));
    }

    post(path: string, body: Object = {}, params: HttpParams = new HttpParams()): Observable<any> {
        return this.httpClient.post(`${path}`, JSON.stringify(body), { headers: this.httpHeaders, params: this.removeNullValuesFromQueryParams(params) })
            .pipe(mergeMap(response => this.mapResponse(response)), catchError(this.handleError))
    }

    put(path: string, body: Object = {}, params: HttpParams = new HttpParams()): Observable<any> {
        return this.httpClient.put(`${path}`, JSON.stringify(body), { headers: this.httpHeaders, params: this.removeNullValuesFromQueryParams(params) })
            .pipe(mergeMap(response => this.mapResponse(response)), catchError(this.handleError));
    }

    patch(path: string, body: Object = {}, params: HttpParams = new HttpParams()): Observable<any> {
        return this.httpClient.patch(`${path}`, JSON.stringify(body), { headers: this.httpHeaders, params: this.removeNullValuesFromQueryParams(params) })
            .pipe(mergeMap(response => this.mapResponse(response)), catchError(this.handleError));
    }

    delete(path: string, params: HttpParams = new HttpParams(), body: Object = {}): Observable<any> {
        return this.httpClient.delete(`${path}`, { body: JSON.stringify(body), headers: this.httpHeaders, params: this.removeNullValuesFromQueryParams(params) })
            .pipe(mergeMap(response => this.mapResponse(response)), catchError(this.handleError));
    }

    private handleError(error: any) {
        return throwError(error.error);
    }

    private mapResponse(response: any) {
        if (response) {
            if ((response.succeeded || response.success) && !response.pageSize) {
                return of(response.data);
            }

            if (response.message || response.exceptionMessage) {
                return throwError({ error: { message: response.message, exceptionMessage: response.exceptionMessage } });
            }
        }

        return of(response);
    }

    private mapPagedResponse(response: any){
        if(response){
            if(response.succeeded || response.success){
                return of(response);
            }
            if(response.message || response.exceptionMessage){
                return throwError({error: {message: response.message, exceptionMessage: response.exceptionMessage}}); 
            }    
        }
        return of(response);
    }

    private buildHttpHeaders() {
        const headers: { [name: string]: string } = {};
        headers['Content-Type'] = 'application/json; charset=utf-8';
        headers['X-Requested-With'] = 'XMLHttpRequest';
        headers['Authorization'] = `Bearer ${window.localStorage.getItem('access_token')}`
        return new HttpHeaders(headers);
    }

    private removeNullValuesFromQueryParams(params: HttpParams): HttpParams {

        // we are checking for the instance of query params and removing null values only if it is the type of HTTP Params otherwise we are returning the object as it is
        if (params instanceof HttpParams) {
            let filteredParams = new HttpParams();
            params.keys().forEach(key => {
                const value = params.get(key);
                if (value !== 'undefined' && value !== 'null') {
                    filteredParams = filteredParams.append(key, value);
                }
            });

            return filteredParams;
        }
        return params;
    }
}