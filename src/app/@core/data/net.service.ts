import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable,timer} from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap ,switchMap} from 'rxjs/operators';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import {Net} from './net';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
} ;

@Injectable()
export class NetService {

  private netUrl = '/v1/net/getallnet';
  private saveNetUrl = '/v1/net/save';
  private updateNetUrl = '/v1/net/update';
  private findNetUrl = '/v1/net/find';

  constructor(private http: HttpClient){}

  addNet (net: Net): Observable<any> {
    return this.http.post<Net>(this.saveNetUrl, net, httpOptions).pipe(
      tap(rs => console.log('savenet----rs',rs)),
      catchError(this.handleError('addNet',[]))
    );
  }
  getNets (): Observable<any> {
    return this.http.get<any>(this.netUrl)
      .pipe(
        tap(rs => console.log('net_rs-----',rs)),
        catchError(this.handleError('getNets', []))
      );
  }
  updateNet (data): Observable<any> {
    return this.http.post<any>(this.updateNetUrl,data,httpOptions).pipe(
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
          return this.http.get<any>(this.findNetUrl+'/'+text);
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
