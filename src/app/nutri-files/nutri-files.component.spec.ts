import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutriFilesComponent } from './nutri-files.component';

describe('NutriFilesComponent', () => {
  let component: NutriFilesComponent;
  let fixture: ComponentFixture<NutriFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutriFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutriFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
