import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
} ;

@Injectable()
export class PermissionGuard implements CanActivate{

  constructor(private http: HttpClient,private router: Router){}

  private checkAuthUrl = '/v1/auth/check';

  public canActivate() : boolean|Observable<any> {

    console.log('PermissionGuard-------',localStorage.getItem('sid'));
    const sid = localStorage.getItem('sid');

    return this.http.post<any>(this.checkAuthUrl, {id:sid}, httpOptions)
      .map((rs) => {
        console.log('checkAuth----rs',rs);
        if(rs.code===-1){
          this.router.navigate(['/auth/login']);
          return false;
        }else {
          //localStorage.setItem('user',rs.data)
          localStorage.setItem('sid', rs.msg);
          localStorage.setItem('user', JSON.stringify(rs.data));
          return true;
        }
      });
  }

}
