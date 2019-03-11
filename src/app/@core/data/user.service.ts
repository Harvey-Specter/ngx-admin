import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable,timer} from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap ,switchMap} from 'rxjs/operators';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import {User} from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
} ;

@Injectable()
export class UsersService {

  private userUrl = '/v1/user/getall';
  private saveUserUrl = '/v1/user/save';
  private updateUserUrl = '/v1/user/update';
  private findUserUrl = '/v1/user/find';
  private filterUserUrl = '/v1/user/filter';

  constructor(private http: HttpClient){}

  addUser (user: User): Observable<any> {
    return this.http.post<User>(this.saveUserUrl, user, httpOptions).pipe(
      tap(rs => console.log('savenet----rs',rs)),
      catchError(this.handleError('addUser',[]))
    );
  }

  getUsersFilterEmail (param): Observable<any> {
    return this.http.post<User>(this.filterUserUrl,param,httpOptions)
      .pipe(
        tap(rs => console.log(rs)),
        catchError(this.handleError('getUsers', []))
      );
  }

  getUsers (): Observable<any> {
    return this.http.get<any>(this.userUrl)
      .pipe(
        tap(rs => console.log(rs)),
        catchError(this.handleError('getUsers', []))
      );
  }
  updateUser (data): Observable<any> {
    return this.http.post<any>(this.updateUserUrl,data,httpOptions).pipe(
        tap(rs => console.log(rs)),
        catchError(this.handleError('updateNets', []))
      );
  }

  searchUser(text) {
    // debounce
    return timer(1000)
      .pipe(
        switchMap(() => {
          // Check if username is available
          return this.http.get<any>(this.findUserUrl+'/'+text);
        })
      );
  }

  netNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchUser(control.value)
        .pipe(
          map(res => {
            // if username is already taken
            if ((res as any).length) {
              // return error
              return { 'Exists': true};
            }
          })
        );
    };

  }

  private handleError<T> (operation = 'operation', result?: T) {
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
