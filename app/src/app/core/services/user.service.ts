import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.dev";
import { HttpHeaders } from '@angular/common/http';
import { User } from "../store/user";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    url: string;
    // http: HttpClient;
    constructor(private http: HttpClient) {
        this.url = "http://" + environment.hostname + ":" + environment.port + "/api/v1/users";
        this.http = http;
    }

    getUser(id: Number) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              "Access-Control-Allow-Origin": "localhost:52376" 
            })
          };
        return this.http.post<User>(this.url, {id: id}, httpOptions);
    }
}