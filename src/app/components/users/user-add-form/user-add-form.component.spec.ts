import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddFormComponent } from './user-add-form.component';

describe('UserAddFormComponent', () => {
  let component: UserAddFormComponent;
  let fixture: ComponentFixture<UserAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
