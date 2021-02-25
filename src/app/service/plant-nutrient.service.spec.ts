import { TestBed } from '@angular/core/testing';

import { PlantNutrientService } from './plant-nutrient.service';

describe('PlantNutrientService', () => {
  let service: PlantNutrientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantNutrientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
