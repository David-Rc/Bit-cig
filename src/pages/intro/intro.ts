import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  public type: string;
  public price: number;
  public quantity: number;


  public dark: string;
  public primary: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
    this.dark = 'dark';
    this.primary = 'primary'
  }

  close()
  {
    if(this.price && this.quantity)
    {

      this.storage.set('moyPrice', (this.price/this.quantity)).then((moy) => {
        console.log('INTRO moy => ', moy);
        this.storage.set('intro', true).then(() => {
          this.events.publish('price:changed')
          this.navCtrl.pop();
        })
      })
    } else {
      if(!this.quantity && !this.price)
      {
        this.showAlert("Vous devez indiquer le prix et la quantité.");
      } else if(!this.quantity)
      {
        this.showAlert("Vous devez indiquer la quantité");
      } else if(!this.price)
      {
        this.showAlert('Vous devez indiquer le prix');
      }

    }
  }

  showAlert(message)
  {
    let alert = this.alertCtrl.create({
      message: message,
      buttons: [{
        text: 'Ok',
        role: 'cancel'
      }]
    })

    alert.present();
  }

}
