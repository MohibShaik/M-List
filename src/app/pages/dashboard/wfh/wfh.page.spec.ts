import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WfhPage } from './wfh.page';

describe('WfhPage', () => {
  let component: WfhPage;
  let fixture: ComponentFixture<WfhPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfhPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WfhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
