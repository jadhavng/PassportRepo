import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewPassportComponent } from './renew-passport.component';

describe('RenewPassportComponent', () => {
  let component: RenewPassportComponent;
  let fixture: ComponentFixture<RenewPassportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenewPassportComponent],
    });
    fixture = TestBed.createComponent(RenewPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
