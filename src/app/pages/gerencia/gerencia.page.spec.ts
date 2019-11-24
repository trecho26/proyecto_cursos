import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GerenciaPage } from './gerencia.page';

describe('GerenciaPage', () => {
  let component: GerenciaPage;
  let fixture: ComponentFixture<GerenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
