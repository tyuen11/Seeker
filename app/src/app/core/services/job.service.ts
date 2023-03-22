import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.dev";
import { HttpHeaders } from '@angular/common/http';
import { Job } from "src/app/interfaces";


@Injectable({
    providedIn: 'root',
})
export class JobService {
    url: string;
    // http: HttpClient;
    constructor(private http: HttpClient) {
        this.url = "http://" + environment.hostname + ":" + environment.port + "/api/v1/jobs";
        this.http = http;
    }

    addJob(job: Job) {
        console.log(job);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "localhost:52376"
            })
        };
        console.log(job);
        
        const payload = {
            companyName: job.company,
            dateApplied: job.dateApplied,
            position: job.position,
            status: job.status,
            url: job.url,
            userId: job.uid
        }
        return this.http.post<Job>(this.url + "/add", payload, httpOptions)
    }


}