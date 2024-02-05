import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/apiresponse';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private httpClient: HttpClient) {}

  // Common Function for posting to database
  Post<ReqT, ResT>(model: ReqT, url: string): Observable<APIResponse<ResT>> {
    return this.httpClient.post<APIResponse<ResT>>(
      environment.baseurl + url,
      model
    );
  }

  // Common Function for retrieving data from database
  Fetch<ResT>(url: string): Observable<APIResponse<ResT>> {
    return this.httpClient.get<APIResponse<ResT>>(environment.baseurl + url);
  }
  // Common Function for delete data from database
  Delete<ResT>(url: string): Observable<APIResponse<ResT>> {
    return this.httpClient.delete<APIResponse<ResT>>(environment.baseurl + url);
  }

  // Common Function for updating data into database
  Update<ReqT, ResT>(model: ReqT, url: string): Observable<APIResponse<ResT>> {
    return this.httpClient.put<APIResponse<ResT>>(
      environment.baseurl + url,
      model
    );
  }

  // Common Function for retrieving specific item from database
  Find<ResT>(url: string): Observable<APIResponse<ResT>> {
    return this.httpClient.get<APIResponse<ResT>>(environment.baseurl + url);
  }
}
