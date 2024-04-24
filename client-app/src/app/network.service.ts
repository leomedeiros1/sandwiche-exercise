import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Access } from './models/access.model';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }

  configUrl = 'http://localhost:3000';
  // configUrl = process.env.BACKEND_PATH;

  getValues() {
    console.log("GETTING VALUES")
    return this.http.get<Access[]>(`${this.configUrl}/api/accesses/`);
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
