import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailExpireComponent } from './email-expire.component';

describe('EmailExpireComponent', () => {
  let component: EmailExpireComponent;
  let fixture: ComponentFixture<EmailExpireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailExpireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailExpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
