import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { ModalPageModule } from './pages/modal/modal.module';



@NgModule({
  declarations: [NumbersOnlyDirective],
  imports: [
    CommonModule,
    ModalPageModule
  ],
  exports: [NumbersOnlyDirective]
})
export class SharedModule { }
