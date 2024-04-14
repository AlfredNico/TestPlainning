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
  //Add user form actions

  get f() { return this.addEventForm.controls; }

 onSubmit() {

  this.submitted = true;
  // stop here if form is invalid and reset the validations
  this.addEventForm.controls['title'].setValidators([Validators.required]);
  this.addEventForm.controls['title'].updateValueAndValidity();
  if (this.addEventForm.invalid) {
      return;
  }
}
constructor(private fb: FormBuilder){}
  title = 'angularadmintemplates';
  calendarOptions!: CalendarOptions;

  ngOnInit() {
    this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this),
      events: [
        { title: 'event 1', date: '2020-11-05' },
        { title: 'event 2', date: '2020-06-30' }
      ]
    };
    //Add User form validations
  }
//Show Modal with Forn on dayClick Event
  handleDateClick(arg: any) {
    // $("#myModal").modal("show");
    // $(".modal-title, .eventstarttitle").text("");
    // $(".modal-title").text("Add Event at : "+arg.dateStr);
    // $(".eventstarttitle").text(arg.dateStr);
    console.log('args = ', arg);


  }
  //Hide Modal PopUp and clear the form validations
  hideForm(){
    this.addEventForm.patchValue({ title : ""});
    this.addEventForm.controls['title'].clearValidators();
    this.addEventForm.controls['title'].updateValueAndValidity();
  }

}
