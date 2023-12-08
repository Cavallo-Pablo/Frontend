import { Injectable, inject } from '@angular/core';
import { LoguinRequest } from './loguin-request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoguinService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({ id: 0, email: '' })

  constructor() { }

  private http = inject(HttpClient);
  login(credentials: LoguinRequest): Observable<User> {
    return this.http.get<User>('././assets/data.json').pipe(
      tap((userData: User) => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    )
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('se a producido un error ', error.error);
    } else {
      console.error('Backend retorno el estado: \n', error.status, '\ncon el error: \n', error.error);
    }
    return throwError(() => new Error('Algo fallo, intentelo nuevamente'));
  }

  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }
  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }
}
