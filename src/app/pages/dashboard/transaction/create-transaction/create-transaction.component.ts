import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Budget, DataService, StorageService, ToastService, TransactionService, User } from 'src/app/core';
import { BudgetService } from 'src/app/core/services/budget.service';



@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
})
export class CreateTransactionComponent implements OnInit {
  @Input() userData: User;
  public newTransactionForm: FormGroup;
  public hadTransactionType = false;
  public date: any;
  public toggleCalender: boolean = false;
  transactionType: any[] = [
    { id: 0, value: "Credit", showSelected: false },
    { id: 1, value: "Debit", showSelected: false },
  ];

  transactionCategories = [
    { id: 1, value: 'Automobile' },
    { id: 2, value: 'Groceries' },
    { id: 3, value: 'Clothing' },
    { id: 4, value: 'Fitness' },
    { id: 5, value: 'Gadgets' },
    { id: 6, value: 'Books' },
    { id: 7, value: 'Credit card bills' },
    { id: 8, value: 'Personal Loans' },
    { id: 9, value: 'Home Loan' },
    { id: 10, value: 'Travel Expenses' }
  ]
  selectedDate: any;
  public budgetList: Budget[];

  constructor(private modalCtr: ModalController,
    private fb: FormBuilder,
    private dataService: DataService,
    private transactionService: TransactionService,
    private storage: StorageService,
    private toastService: ToastService,
    private budgetService: BudgetService,) {

    this.newTransactionForm = this.fb.group({
      type: ["", Validators.required],
      payeeName: ["", Validators.required],
      budgetId: ["", Validators.required],
      transactionDate: ["", Validators.required],
      amount: ["", Validators.required]
    });

  }

  ngOnInit() {
    console.log(this.userData);
    this.getTransactionCategories();
    this.getAllBudgets();
  }

  public getTransactionCategories() {
    this.transactionService.getTransactionCatgories().subscribe((response) => {
      console.log(response)
    }, (error) => {
      this.toastService.presentToast('Oops! something went wrong.', 'danger');
    })
  }

  private getAllBudgets() {
    this.budgetService.getAllBudgets(this.userData?.id).subscribe((response) => {
      this.budgetList = response;
      console.log(this.budgetList);
    }, (error) => {
      console.log(error, 'error');
      this.toastService.presentToast('Oops! something went wrong.', 'danger');
    })
  }

  get f() {
    return this.newTransactionForm.controls;
  }
  async close() {
    await this.modalCtr.dismiss();
  }

  public selectTransactionype(filterKey: number) {
    this.transactionType.map((item) => {
      if (filterKey === item.id) {
        this.newTransactionForm.patchValue({
          type: item.value
        })
        item.showSelected = true;
      } else {
        item.showSelected = false;
      }
    });

  }

  public isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public onDateSelection(event, eleRef) {
    console.log(event);
    this.toggleCalender = !this.toggleCalender;
    this.selectedDate = event.format(" Do MMM  YY");

  }

  public createTransaction() {
    console.log(this.newTransactionForm.value);

    const transactionData = {
      type: this.newTransactionForm.controls.type.value,
      payeeName: this.newTransactionForm.controls.payeeName.value,
      budgetId: this.newTransactionForm.controls.budgetId.value,
      transactionDate: new Date(this.newTransactionForm.controls.transactionDate.value),
      amount: this.newTransactionForm.controls.amount.value,
      userId: this.userData?.id
    }

    this.transactionService.createNewTransaction(transactionData).subscribe(response => {
      console.log(response);
      this.close();
      this.toastService.presentToast('Transaction Added Successfully', 'success');
    }, (error) => {
      console.log(error);
      this.toastService.presentToast('Oops! something went wrong.', 'danger');
    })


  }

}
