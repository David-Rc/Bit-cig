import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public tap: number = 0;
  public price: number = 0;
  public img = "assets/imgs/cig.png";

  private options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
  public date = new Date().toLocaleDateString('FR-fr', this.options);

  public data: any;
  public dark;


  constructor(public navCtrl: NavController, public storage: Storage, public alertCtrl: AlertController) {
      this.dark = 'dark';
  }

  ionViewDidLoad()
  {
    this.storage.get(this.date).then((data) => {
      if(data)
      {
        this.data = JSON.parse(data);
        this.tap = this.data.tap;
        this.price = this.data.price;
      } else {
        this.data = {tap: this.tap, price: this.price}
        this.storage.set(this.date, JSON.stringify(this.data)).then((storage) => {
          console.log('storage is set : ', storage);
        })
      }
    })
  }

  tapEvent(e)
  {
    this.price = this.price + 0.4;
    this.tap++;
    this.data = {'tap': this.tap, 'price': this.price};
    this.storage.set(this.date, JSON.stringify(this.data)).then((date) => {
      return true;
    });
  }


}
