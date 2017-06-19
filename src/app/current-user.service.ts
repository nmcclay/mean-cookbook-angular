import { Injectable } from '@angular/core';
import {User} from "./user";
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable, BehaviorSubject} from "rxjs";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CurrentUserService {
  private user = new BehaviorSubject<User>(new User());

  constructor(private http: Http) {
  }

  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  setUser(newUser:User) {
    this.user.next(newUser);
  }

  login(username: string, password: string): Promise<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/login', JSON.stringify({ username: username, password: password }), options)
      .toPromise()
      .then((response) => {
        let userJSON = response.json().data.attributes;
        let user = new User(userJSON.firstName, userJSON.lastName, userJSON.email);
        this.setUser(user);
        return user
      }).catch((error) => {
        let errorJSON = JSON.parse(error._body).errors[0];
        return Promise.reject(errorJSON);
      })
  }

  logout(): void {
    this.setUser(new User());
  }
}
