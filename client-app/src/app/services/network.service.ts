import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Access, AccessCount } from '../models/access.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }

  configUrl = 'http://localhost:3000';
  // configUrl = process.env.BACKEND_PATH;

  getAllAccesses() {
    console.log("GETTING ALL ACCESSES")
    return this.http.get<Access[]>(`${this.configUrl}/api/accesses/`);
  }

  getAccessesCount(startDate: Date | null = null, endDate: Date | null= null) {
    let body: any = {}
    if(startDate){
      body.start_date = startDate.toISOString();
    }
    if(endDate){
      body.end_date = endDate.toISOString();
    }
    console.log("GETTING ALL ACCESSES", body)
    return this.http.post<AccessCount[]>(`${this.configUrl}/api/accesses/counts`, body).pipe(
      catchError(err => { return this.handleError(err) })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
