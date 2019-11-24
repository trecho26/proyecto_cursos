import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarCursoPage } from './agregar-curso.page';

describe('AgregarCursoPage', () => {
  let component: AgregarCursoPage;
  let fixture: ComponentFixture<AgregarCursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCursoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
