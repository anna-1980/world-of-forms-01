import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedFormComponent } from './nested-form.component';

describe('NestedFormComponent', () => {
  let component: NestedFormComponent;
  let fixture: ComponentFixture<NestedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestedFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NestedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
