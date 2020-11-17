import { Injectable } from '@angular/core';
import { GroceriesServiceService } from '../app/groceries-service.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public dataService: GroceriesServiceService, public alertController: AlertController) { }


  async showPrompt(item?, index?) {
    console.log("Editing Item - ", item, index);


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: item ? 'Edit Item' : 'Add Item',
      message: item ? 'Please update grocery item...' : 'Please add item...',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item ? item.name : null,
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity',
          value: item ? item.quantity : null,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: item => {
            console.log('Confirm Ok', item);
            if (index !== undefined) {
              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(item);
            }

          }
        }
      ]
    });

    await alert.present();

  }


}
