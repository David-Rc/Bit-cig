import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// provider
import { FirebaseProvider } from '../../providers/firebase/firebase';

/**
 * Generated class for the GlobalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-global',
  templateUrl: 'global.html',
})
export class GlobalPage {

  public dark;

  public data: number[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public firebase: FirebaseProvider) {
    this.dark = 'dark'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GlobalPage');
    this.showList();
  }

  showList()
  {
    this.firebase.showList().subscribe(data => {
      this.data = data;
    }, e => { console.log('E => ', e)});
  }



}
