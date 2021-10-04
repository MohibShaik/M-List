import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { AuthService, ToastService, StorageService, TransactionService, User, Transaction } from 'src/app/core';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  currentDate: string;
  userData: User;
  allTransactions: Transaction[];

  constructor(private authService: AuthService,
    public modalCtrl: ModalController,
    private storage: StorageService,
    private transactionService: TransactionService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.currentDate = moment().format(" Do MMM  YY");
    this.userData = JSON.parse(this.storage.getItem('user'));
    this.getAllTransactions();
  }

  public getAllTransactions() {
    this.transactionService.getAllTransactions(this.userData?.id).subscribe(response => {
      console.log(response, 'transaction response');
      this.allTransactions = response;
    }, (error) => {
      console.log(error)
    })
  }

  public async createNewTransaction() {
    const modalRef = await this.modalCtrl.create({
      component: CreateTransactionComponent,
      componentProps: {
        userData: this.userData
      }
    });
    modalRef.onDidDismiss().then((modalDataResponse) => {
      this.getAllTransactions()
    });
    return await modalRef.present();
  }

}
