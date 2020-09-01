import {Component, OnInit} from '@angular/core';
import {BlockchainService, IWalletKey} from '../../services/blockchain.service';
import {Transaction} from '../../blockchain.js';

@Component({
    selector: 'app-create-wallet',
    templateUrl: './create-wallet.component.html',
    styleUrls: ['./create-wallet.component.scss']
})
export class CreateWalletComponent implements OnInit {
    public WalletKey: IWalletKey;
    public isCreate = false;
    public walletName;

    constructor(private blockchainService: BlockchainService) {
        this.WalletKey = null;
    }

    ngOnInit() {
    }

    createWallet() {

        this.blockchainService.generateWalletKeys();
        let n = this.blockchainService.walletKeys.length;
        this.WalletKey = this.blockchainService.walletKeys[n - 1];
        this.isCreate = true;

        setTimeout(() => {
            this.isCreate = false;
        }, 1300);

    }

}
