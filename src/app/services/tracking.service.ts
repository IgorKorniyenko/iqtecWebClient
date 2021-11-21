import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASEURL, TRACKINGENDPOINTS } from '../shared/api/endpoints';
import { Tracking } from '../shared/models/tracking';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(private http: HttpClient) { }

  getTracks(): Observable<Tracking[]>{
    return this.http.get<Tracking[]>(BASEURL + TRACKINGENDPOINTS.get('getall'));
  }

  putTrack(track: Tracking): Observable<Tracking>{
    return this.http.put<Tracking>(BASEURL + TRACKINGENDPOINTS.get('update'), track);
  }
}
