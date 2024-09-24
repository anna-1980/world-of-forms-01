import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardReviewComponent } from './board-review.component';

describe('BoardReviewComponent', () => {
  let component: BoardReviewComponent;
  let fixture: ComponentFixture<BoardReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
