import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDashComponent } from './doc-dash.component';

describe('DocDashComponent', () => {
  let component: DocDashComponent;
  let fixture: ComponentFixture<DocDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocDashComponent]
    });
    fixture = TestBed.createComponent(DocDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
