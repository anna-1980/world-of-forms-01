import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardReviewDetailsComponent } from './board-review-details.component';

describe('BoardReviewDetailsComponent', () => {
  let component: BoardReviewDetailsComponent;
  let fixture: ComponentFixture<BoardReviewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardReviewDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardReviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
