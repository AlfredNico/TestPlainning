import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MissionService } from 'src/app/services/mission/mission.service';
@Component({
  selector: 'app-modalmission',
  templateUrl: './modalmission.component.html',
  styleUrls: ['./modalmission.component.scss'],

})
export class ModalmissionComponent {

  missionForm = this.fb.group({
    id: '',
    title: ['', Validators.required],
    description: ['', Validators.required],
    color: ['', Validators.required],
    date: ['', Validators.required]
  });

  get title() {
    return this.missionForm.get('title')!;
  }

  get description() {
    return this.missionForm.get('description')!;
  }

  get color() {
    return this.missionForm.get('color')!;
  }

  get date() {
    return this.missionForm.get('date')!;
  }
  get id() {
    return this.missionForm.get('id')!;
  }



  constructor(private fb: FormBuilder, private missionServce: MissionService) {}

  addMission() {
    const actionType = (this.id.value == '' || this.id.value == null) ? 'add' : 'edit';
    if (this.missionForm.invalid) {
      return;
    }
    const formData = this.missionForm.value;
    this.missionServce.addMission(formData, actionType);
  }

  removeMission() {
    const actionType = 'remove';
    this.missionServce.addMission(this.missionForm.value, actionType);
    this.missionForm.reset();
  }

}
