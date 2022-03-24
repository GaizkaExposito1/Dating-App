import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from '../_models/Users';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // BaseUrl='https://localhost:5001/api/';
  BaseUrl=environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private https:HttpClient) { }
  login(model:any){
    return this.https.post(this.BaseUrl + 'account/login',model).pipe(
      map((response: User)=> {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
    
  }
  register(model:any){
    return this.https.post(this.BaseUrl + 'account/register',model).pipe(
    map((user:User)=>{
      if(user){
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
      }
    })
  )
  }
  setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }
  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
