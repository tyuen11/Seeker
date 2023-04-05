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
            companyName: job.companyName,
            dateApplied: job.dateApplied,
            position: job.position,
            status: job.status,
            url: job.url,
            userId: job.uid
        }
        return this.http.post<Job>(this.url + "/add", payload, httpOptions)
    }

    getJobs(uid: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "localhost:52376"
            })
        };
        const param = "?uid=" + uid;
        return this.http.post<any>(this.url + "/all" + param, {} , httpOptions)
    }

    removeJob(id: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "localhost:52376"
            })
        };
        const param = "?id=" + id;
        return this.http.post<Job>(this.url + "/delete" + param, {} , httpOptions)
    }

}