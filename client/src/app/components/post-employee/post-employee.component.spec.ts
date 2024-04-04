import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEmployeeComponent } from './post-employee.component';

describe('PostEmployeeComponent', () => {
  let component: PostEmployeeComponent;
  let fixture: ComponentFixture<PostEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostEmployeeComponent]
    });
    fixture = TestBed.createComponent(PostEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
