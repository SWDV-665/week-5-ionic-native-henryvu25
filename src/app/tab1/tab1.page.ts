import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../../app/groceries-service.service';
import { InputDialogServiceService } from '../../app/input-dialog-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  //title of the Grocery tab's heading
  title = "Grocery List"



  constructor(public toastController: ToastController, public alertController: AlertController, public dataService: GroceriesServiceService, public inputDialogService: InputDialogServiceService, public socialSharing: SocialSharing) { }


  loadItems() {
    return this.dataService.getItems();
  }
  //take note, this function may not be working
  async editItem(item, index) {
    //toast pop up notifying item removal
    const toast = await this.toastController.create({
      message: 'Editing ' + item.name + " at index " + index,
      duration: 2000
    });
    toast.present();

    this.inputDialogService.showPrompt(item, index);
  }

  addItem() {
    this.inputDialogService.showPrompt();
  }

  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    //toast pop up notifying item removal
    const toast = await this.toastController.create({
      message: 'Removing ' + item.name + " at index " + index,
      duration: 2000
    });
    toast.present();

    this.dataService.removeItem(index);
  }

  async shareItem(item, index) {
    console.log("Sharing Item - ", item, index);
    //toast pop up notifying item removal
    const toast = await this.toastController.create({
      message: 'Sharing ' + item.name + " at index " + index,
      duration: 2000
    });
    toast.present();

    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app."

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared successfully!");
    }).catch((error) => {
      // Sharing via email is not possible
      console.error("Error while sharing", error);
    });

  }




}
