import { Component, OnInit } from "@angular/core";
import { Dialogs } from "@ionic-native/dialogs/ngx";
import { ModalController } from "@ionic/angular";
import * as moment from "moment";
import { AuthService, Budget, StorageService, ToastService, Transaction, TransactionService, User } from "src/app/core";
import { BudgetService } from "src/app/core/services/budget.service";
import { ModalPage } from "src/app/shared/pages/modal/modal.page";
import { AddBudgetComponent } from "./add-budget/add-budget.component";
@Component({
  selector: "app-budget",
  templateUrl: "./budget.component.html",
  styleUrls: ["./budget.component.scss"],
})
export class BudgetComponent implements OnInit {
  currentDate: string;
  userData: User;
  budgetList: Budget[];
  allTransactions: any[];

  p_bar_value: number;

  public monthFilterValue = [
    { value: 0, viewValue: 'January' },
    { value: 1, viewValue: 'January' },
    { value: 2, viewValue: 'January' },
    { value: 3, viewValue: 'January' },
    { value: 4, viewValue: 'January' },
    { value: 5, viewValue: 'January' },
    { value: 6, viewValue: 'January' },
    { value: 7, viewValue: 'January' },
    { value: 8, viewValue: 'January' },
    { value: 9, viewValue: 'January' },
    { value: 10, viewValue: 'January' },
    { value: 11, viewValue: 'January' },
  ]

  constructor(
    public modalCtrl: ModalController,
    private storage: StorageService,
    private budgetService: BudgetService,
    private toastService: ToastService,
    private transactionService: TransactionService,) { }

  ngOnInit() {
    this.currentDate = moment().format(" Do MMM  YY");
    this.userData = JSON.parse(this.storage.getItem('user'));
    this.getAllBudgets();
  }

  private getAllBudgets() {
    this.budgetService.getAllBudgets(this.userData?.id).subscribe((response) => {
      this.budgetList = response;
      this.budgetList.forEach(budget => this.getAllTransactions(budget));
      console.log(this.budgetList);
    }, (error) => {
      console.log(error, 'error');
      this.toastService.presentToast('Oops! something went wrong.', 'danger');
    })
  }

  public getAllTransactions(budget: Budget) {
    this.transactionService.getTransactionsByBudgetId(budget?.budget_uid).subscribe(response => {
      console.log(response, 'transaction response');
      budget.transactions = response;
      const totalTransactionAmount = response.reduce((accum, item) => (item?.transaction_type !== 'Debit') ? accum : item.transaction_amount, 0)
      budget.totalTransactionAmount = totalTransactionAmount;
      budget.completedBudgetPercentage = (budget?.totalTransactionAmount) ?
        Math.floor(budget?.totalTransactionAmount / budget?.budget_amount * 100) : 0;
      this.allTransactions = response;
    }, (error) => {
      console.log(error)
    })
  }

  async openModal() {
    const modalRef = await this.modalCtrl.create({
      component: AddBudgetComponent,
      componentProps: {
        user: this.userData
      },
    });

    modalRef.onDidDismiss().then((modalDataResponse) => {
      this.getAllBudgets();
    });

    return await modalRef.present();
  }

  async filterBudgets(event) {
    console.log(event);
    let searchTerm = event.srcElement.value;

    if (!searchTerm) {
      this.getAllBudgets();
    }
    else {
      this.budgetList = this.budgetList.filter(currentBudget => {
        if (currentBudget?.budget_name && searchTerm) {
          return (currentBudget?.budget_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    }
  }


}
