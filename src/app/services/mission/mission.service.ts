import { NgPlural } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, toArray } from 'rxjs';
import { Mission } from 'src/app/models/mission';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private missionsSubject: BehaviorSubject<Mission[]> = new BehaviorSubject<Mission[]>([]);
  public missions$: Observable<Mission[]> = this.missionsSubject.asObservable();

  constructor(private http: HttpClient) { 
    
  }

  getMissions(): void {
    this.http.get<Mission[]>('/missions').pipe(
      map((res) => {
        this.missionsSubject.next(res);
      })
    ).subscribe();
  }

  addMission(mission: Mission): void {
    const missions = this.missionsSubject.getValue();
    missions.push(mission);
    this.missionsSubject.next(missions);
  }

  // addMission(value: Mission[]) {
  //   this.missions.next(value)
  // }
}
