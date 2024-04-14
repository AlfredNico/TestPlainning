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


  onSubmit() {
    this.submitted = true;
    this.addEventForm.controls['title'].setValidators([Validators.required]);
    this.addEventForm.controls['title'].updateValueAndValidity();
    if (this.addEventForm.invalid) {
        return;
    }
  }

  ngOnInit() {
    this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this),
      events: [
        { title: 'event 1', date: '2020-11-05' },
        { title: 'event 2', date: '2020-06-30' }
      ]
    };
  }

  //Show Modal with Forn on dayClick Event
  handleDateClick(arg: any) {
    console.log('args = ', arg);
  }

  //Hide Modal PopUp and clear the form validations
  hideForm(){
    this.addEventForm.patchValue({ title : ""});
    this.addEventForm.controls['title'].clearValidators();
    this.addEventForm.controls['title'].updateValueAndValidity();
  }

}
