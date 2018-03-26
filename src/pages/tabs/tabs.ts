import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {GlobalPage} from "../global/global";
//import {CalendarPage} from "../calendar/calendar";
import {HomePage} from "../home/home";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  globalRoot:any;
  calendarRoot:any;
  homeRoot:any;

  public primary:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.primary = 'primary';
    this.homeRoot = HomePage;
    this.globalRoot = 'GlobalPage';
    this.calendarRoot = 'CalendarPage';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
