import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSouClienteComponent } from './login-sou-cliente.component';

describe('LoginSouClienteComponent', () => {
  let component: LoginSouClienteComponent;
  let fixture: ComponentFixture<LoginSouClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSouClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSouClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
