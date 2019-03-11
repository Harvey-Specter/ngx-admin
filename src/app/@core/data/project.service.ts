import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable,timer} from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap ,switchMap} from 'rxjs/operators';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import {User} from './user';
import {Project} from './project';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
} ;

@Injectable()
export class ProjectService {

  private projectUrl = '/v1/project/getall';
  private saveProjectUrl = '/v1/project/save';
  private updateProjectUrl = '/v1/project/update';
  private findProjectUrl = '/v1/project/find';
  private saveMemberUrl = '/v1/project/savemember';

  constructor(private http: HttpClient){}

  addProject (project: Project): Observable<any> {
    return this.http.post<User>(this.saveProjectUrl, project, httpOptions).pipe(
      tap(rs => console.log('saveProject----rs',rs)),
      catchError(this.handleError('addProject',[]))
    );
  }
  getProject (): Observable<any> {
    return this.http.get<any>(this.projectUrl)
      .pipe(
        tap(rs => console.log(rs)),
        catchError(this.handleError('Project', []))
      );
  }
  updateProject (data): Observable<any> {
    return this.http.post<any>(this.updateProjectUrl,data,httpOptions).pipe(
        tap(rs => console.log(rs)),
        catchError(this.handleError('updateProject', []))
      );
  }

  saveMember (data): Observable<any> {
    return this.http.post<any>(this.saveMemberUrl,data,httpOptions).pipe(
      tap(rs => console.log(rs)),
      catchError(this.handleError('saveMember', []))
    );
  }

  searchProject(text) {
    // debounce
    return timer(1000)
      .pipe(
        switchMap(() => {
          // Check if username is available
          return this.http.get<any>(this.findProjectUrl+'/'+text);
        })
      );
  }

  projectNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchProject(control.value)
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
