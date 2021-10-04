import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataService, ToastService, TransactionCategory, User } from 'src/app/core';
import { BudgetService } from 'src/app/core/services/budget.service';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss'],
})
export class AddBudgetComponent implements OnInit {
  @Input() user: User;
  public createBudgetForm: FormGroup;
  public categoriesList: TransactionCategory[];

  constructor(private modalCtr: ModalController,
    private fb: FormBuilder,
    private dataService: DataService,
    private budgetService: BudgetService,
    private toastService: ToastService
  ) {
    console.log(this.user, 'userData')
    this.createBudgetForm = this.fb.group({
      budgetCategory: ["", Validators.required],
      budgetCategoryId: [''],
      name: ["", Validators.required],
      amount: ["", Validators.required],
      userId: [''],
      createdDate: ['']
    });

    this.createBudgetForm.controls.budgetCategory.valueChanges.subscribe(data => {
      console.log(data, 'category value');
      if (this.categoriesList) {
        const selectedCategory = this.categoriesList.filter(category => category.transaction_category_name.toLowerCase() === data.toLowerCase());
        console.log(selectedCategory);
        this.createBudgetForm.patchValue({
          budgetCategoryId: selectedCategory[0]?.transaction_category_uid,
          userId: this.user?.id,
          createdDate: new Date(),
        })
      }
    })
  }

  ngOnInit() {
    this.getBudgetCategories();
  }

  async close() {
    await this.modalCtr.dismiss();
  }


  public onSubmittingBudget() {
    console.log(this.createBudgetForm.value);
    if (!this.createBudgetForm.valid) {
      return;
    }

    else {
      this.budgetService.createNewBudget(this.createBudgetForm.value).subscribe(response => {
        console.log(response);
        this.modalCtr.dismiss();
      }, (error) => {
        console.log(error);
        this.toastService.presentToast('Oops! something went wrong.', 'danger');

      })
    }

  }

  private getBudgetCategories() {
    this.dataService.getTransactionCatgories().subscribe(response => {
      console.log(response);
      this.categoriesList = response
    })
  }

}
