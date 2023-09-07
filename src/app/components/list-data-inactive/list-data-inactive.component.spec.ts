import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDataInactiveComponent } from './list-data-inactive.component';

describe('ListDataInactiveComponent', () => {
  let component: ListDataInactiveComponent;
  let fixture: ComponentFixture<ListDataInactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDataInactiveComponent]
    });
    fixture = TestBed.createComponent(ListDataInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
