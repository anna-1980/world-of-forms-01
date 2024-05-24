import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEditFormComponent } from './data-edit-form.component';

describe('DataEditFormComponent', () => {
  let component: DataEditFormComponent;
  let fixture: ComponentFixture<DataEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
