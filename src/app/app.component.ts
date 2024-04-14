import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  /* Add Event Form */
  addEventForm = this.fb.group({
    title: ['', [Validators.required]]
  });
  submitted = false;
  calendarOptions!: CalendarOptions;


  get f() { return this.addEventForm.controls; }

  constructor(private fb: FormBuilder){}


  ngOnInit() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      events: [
          { title: 'event 1', date: '2020-11-05' },
          { title: 'event 2', date: '2020-06-30' }
        ]
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
