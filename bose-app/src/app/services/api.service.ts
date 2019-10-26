import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiURL = 'http://35.230.98.121:7000/';
  linkUrl = '';
  audioUrl = "";


  getAudio(link: string): Promise<Blob> {
    const file = this.http.get(this.apiURL + "?url=" + link, {
      responseType: 'blob'
  }).toPromise();
    return file;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
