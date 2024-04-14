import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mission } from 'src/app/models/mission';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private http: HttpClient) { }

  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>('/missions')
  }
}
