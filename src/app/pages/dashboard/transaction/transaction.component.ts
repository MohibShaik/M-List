import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService, TodoService, ToastService, StorageService } from 'src/app/core';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {

  constructor(private authService: AuthService,
    public modalCtrl: ModalController,
    private storage: StorageService,
    private todoService: TodoService,
    private toastService: ToastService) { }

  ngOnInit() { }

}
