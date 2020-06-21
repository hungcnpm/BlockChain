import { Component, OnInit } from '@angular/core';
import { BlockchainService } from './services/blockchain.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public blockchain;
  public ownWalletKey;
  public showInfoMessage = true;

  constructor(private blockchainService: BlockchainService) {
    this.blockchain = blockchainService.blockchainInstance;
    this.ownWalletKey = blockchainService.walletKeys[0].publicKey;
  }

  ngOnInit() {
  }

  thereArePendingTransactions() {
    return this.blockchain.pendingTransactions.length > 0;
  }

  dismissInfoMessage() {
    this.showInfoMessage = false;
  }
}
