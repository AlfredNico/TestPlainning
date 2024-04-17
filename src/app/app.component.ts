import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions, EventInput } from '@fullcalendar/angular';
import { MissionService } from './services/mission/mission.service';
import { Mission } from './models/mission';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalmissionComponent } from './components/modalmission/modalmission.component';
import { MatCardModule } from '@angular/material/card';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  missionForm: FormGroup;
  /* Add Event Form */
  addEventForm = this.formBuilder.group({
    title: ['', [Validators.required]]
  });
  submitted = false;
  calendarOptions!: CalendarOptions;


  get f() { return this.addEventForm.controls; }

  constructor(
    private missionServce: MissionService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
    ){
      this.missionForm = this.formBuilder.group({
        id: [4], 
        title: ['', Validators.required],
        description: ['', Validators.required],
        color: ['', Validators.required],
        date: ['', Validators.required]
      });
    }


  ngOnInit() {
     this.loadMissions();
  }

  

  eventMouseEnter(info: any) {
    const description = info.event.extendedProps.description;
    // console.log('errze ', description);
    
    if (description) {
      const element = info.el;
      element.setAttribute('data-description', description);
    }
  }

  loadMissions() {
    this.missionServce.getMissions();
    this.missionServce.missions$.subscribe(missions => {
      this.updateCalendarEvents(missions);
    });
  }

  updateCalendarEvents(missions: Mission[]) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      events: missions,
      eventMouseEnter: this.eventMouseEnter.bind(this)
    };
  }

  onSubmit() {
    this.submitted = true;
    this.addEventForm.controls['title'].setValidators([Validators.required]);
    this.addEventForm.controls['title'].updateValueAndValidity();
    if (this.addEventForm.invalid) {
        return;
    }
  }

  addMission() {
    const formData = this.missionForm.value;
    this.missionServce.addMission(formData);
    console.log('add ', formData);
  }

  //Show Modal with Forn on dayClick Event
  handleEventClick(arg: any){
    console.log('HANDLE EVENT CLICKED');
  }

  handleDateClick(date: { dateStr: string; }) {
    console.log('DATE EVENT CLICKED = ', date);
  }

  //Hide Modal PopUp and clear the form validations
  hideForm(){
    this.addEventForm.patchValue({ title : ""});
    this.addEventForm.controls['title'].clearValidators();
    this.addEventForm.controls['title'].updateValueAndValidity();
  }

}
