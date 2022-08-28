import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostomersComponent } from './costomers.component';

describe('CostomersComponent', () => {
  let component: CostomersComponent;
  let fixture: ComponentFixture<CostomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
