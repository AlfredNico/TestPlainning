import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CalendarOptions, EventInput } from '@fullcalendar/angular';
import { MissionService } from './services/mission/mission.service';
import { Mission } from './models/mission';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  event: Mission[] = []
  /* Add Event Form */
  addEventForm = this.fb.group({
    title: ['', [Validators.required]]
  });
  submitted = false;
  calendarOptions!: CalendarOptions;


  get f() { return this.addEventForm.controls; }

  constructor(private fb: FormBuilder, private missionServce: MissionService){}


  ngOnInit() {
    this.missionServce.getMissions().subscribe((res) => {
      console.log('res ', res)
      this.event = res
      
      console.log('z ', this.event)
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this),
        eventClick: this.handleEventClick.bind(this),
        // events: [
          //     { title: 'event 1',   start: '2024-04-14T10:00:00', // Start date and time
          //     end: '2024-04-14T12:00:00', color: 'red' },
          //     { title: 'event 2', date: '2024-04-30', color: 'yellow' }
          //   ]
          events: this.event,
          eventMouseEnter: this.eventMouseEnter.bind(this)

        };
      })
  }

  eventMouseEnter(info: any) {
    const description = info.event.extendedProps.description;
    console.log('errze ', description);
    
    if (description) {
      const element = info.el;
      element.setAttribute('data-description', description);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.addEventForm.controls['title'].setValidators([Validators.required]);
    this.addEventForm.controls['title'].updateValueAndValidity();
    if (this.addEventForm.invalid) {
        return;
    }
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
