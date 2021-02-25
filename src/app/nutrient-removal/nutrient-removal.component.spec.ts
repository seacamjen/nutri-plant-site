import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientRemovalComponent } from './nutrient-removal.component';

describe('NutrientRemovalComponent', () => {
  let component: NutrientRemovalComponent;
  let fixture: ComponentFixture<NutrientRemovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutrientRemovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrientRemovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
