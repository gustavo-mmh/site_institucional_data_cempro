import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouClienteComponent } from './sou-cliente.component';

describe('SouClienteComponent', () => {
  let component: SouClienteComponent;
  let fixture: ComponentFixture<SouClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SouClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SouClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
