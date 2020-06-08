import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BlockchainService, IWalletKey } from '../../services/blockchain.service';
import { Transaction } from '../../blockchain.js';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  public newTx = new Transaction();
  public ownWalletKey: IWalletKey;
  public toAddressWallet: Array<IWalletKey>;
  public canCreate = false;
  constructor(private blockchainService: BlockchainService, private router: Router) {
    this.newTx = new Transaction();
    this.ownWalletKey = blockchainService.walletKeys[0];
    this.toAddressWallet = blockchainService.walletKeys;
  }

  ngOnInit() {
  }

  createTransaction() {
    const newTx = this.newTx;

    // Set the FROM address and sign the transaction
    newTx.fromAddress = this.ownWalletKey.publicKey;
    newTx.signTransaction(this.ownWalletKey.keyObj);

    try {
      let balance = this.blockchainService.blockchainInstance.checkBalance(newTx.fromAddress, newTx.amount);
      console.log(balance); 
      if(balance < 0){
        alert("Số dư không đủ hoặc số coin bạn đang chờ xác nhận đã bằng với số dư ví của bạn"); 
      }
      else if(newTx.toAddress === this.ownWalletKey.publicKey)
      {
        alert("Bạn không thể gửi coin cho chính mình");
      }
      else
       {
        this.blockchainService.addTransaction(this.newTx);
        this.canCreate =  true;
       }
    } catch (e) {
      alert(e);
      return;
    }
    if(this.canCreate){
      this.router.navigate(['/new/transaction/pending', { addedTx: true }]);
    }
    this.newTx = new Transaction();
  }
}
