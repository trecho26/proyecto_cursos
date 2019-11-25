import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CursosImpartirPage } from './cursos-impartir.page';

describe('CursosImpartirPage', () => {
  let component: CursosImpartirPage;
  let fixture: ComponentFixture<CursosImpartirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursosImpartirPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CursosImpartirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
