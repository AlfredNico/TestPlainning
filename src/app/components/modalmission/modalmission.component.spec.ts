import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalmissionComponent } from './modalmission.component';

describe('ModalmissionComponent', () => {
  let component: ModalmissionComponent;
  let fixture: ComponentFixture<ModalmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
