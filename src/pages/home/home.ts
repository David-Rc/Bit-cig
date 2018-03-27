import { Component } from '@angular/core';
import { NavController, AlertController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirebaseProvider } from '../../providers/firebase/firebase';

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
  public dark: string;

  public moyPrice: number;


  public store: any;



  constructor(public navCtrl: NavController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public events: Events,
    public firebase: FirebaseProvider) {
      this.dark = 'dark';



      this.events.subscribe('price:changed', () => {
        this.storage.get('moyPrice').then((moy) => {
          if(moy)
          {
            this.moyPrice = moy;
          }
        })
      })
  }

  ionViewDidLoad()
  {

    this.firebase.showList().subscribe(data => {
      this.store = data;
    })

    this.storage.get('moyPrice').then((moy) => {
      if(moy)
      {
        this.moyPrice = moy;
      }
    })

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
    this.storage.get('last_tap').then((date) => {
      let dateCurrent = new Date();
      let time = dateCurrent.getTime() - new Date(date).getTime();
      let minutes = Math.round(((time % 86400000) % 3600000) / 60000);
      if(minutes < 5)
      {

        // Remplacer par un animation ?

        let timeLeft = this.inverseTime(minutes)

        let alert = this.alertCtrl.create({
          message: "Vous pourrez recliquer dans " + timeLeft + " minutes :)",
          buttons : [{
            text:'ok',
            role: 'cancel',
          }]
        });

        alert.present();
      } else {
        this.price = this.price + this.moyPrice;
        this.tap++;
        this.data = {'tap': this.tap, 'price': this.price};
        this.storage.set(this.date, JSON.stringify(this.data)).then((date) => {
          this.storage.set('last_tap', new Date()).then((date) => {

            this.store.forEach(item => {
              let tap = Number(item.tap + this.tap);
              let price = Number(item.price + this.price);

              this.firebase.updateList(tap, price);
            })
          })
        });
      }
    })

  }

  inverseTime(minutes)
  {
    switch(minutes)
    {
      case 5:
      return 0;
      case 4:
      return 1;
      case 3:
      return 2;
      case 2:
      return 3;
      case 1:
      return 4;
      case 0:
      return 5;
      default:
      return false;
    }
  }

}
