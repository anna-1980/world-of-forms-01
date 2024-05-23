import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingAddFormComponent } from './meeting-add-form.component';

describe('MeetingAddFormComponent', () => {
  let component: MeetingAddFormComponent;
  let fixture: ComponentFixture<MeetingAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingAddFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
