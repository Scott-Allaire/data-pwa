import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

export interface DataSet {
  source: string;
  code: string;
}

export interface Reading {
  code: string;
  value: string;
  received: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReadingsService {
  private baseApiURL: string = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  fetchDataSets(): Observable<Map<string, DataSet[]>> {
    const url = this.baseApiURL;
    return <Observable<Map<string, DataSet[]>>>this.httpClient.get(url);
  }

  fetchMostRecent(source: string): Observable<Reading[]> {
    const url = `${this.baseApiURL}/${source}`;
    return <Observable<Reading[]>>this.httpClient.get(url);
  }

  fetchDetail(source: string, code: string): Observable<Reading[]> {
    const url = `${this.baseApiURL}/${source}/${code}`;
    return <Observable<Reading[]>>this.httpClient.get(url);
  }
}

