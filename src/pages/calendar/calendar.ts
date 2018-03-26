import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  public data = [];
  public dark: string;
  public monthName = [];
  public monthData = [];
  public message: String;
  public tapMonth = [];
  public priceMonth = [];

  public totalMonth = [];

  public primary: string;
  public consult:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.dark = 'dark';
    this.primary = 'primary';
    this.consult = 'dayly';
  }

  ionViewDidLoad() {

    //this.getData();
}

ionViewDidLeave()
{
  this.monthName = [];
  this.data = [];
  this.totalMonth = [];
}

ionViewDidEnter()
{
  this.getData();
}


  getData()
  {
    /**
     *
     * this.storage contient une date au format chaine de caractere en tant que clé.
     * Cette clé permet de recupérer le nombre de cigarettes fumées à la date correspondante;
     * Elle permet également de récupérer le montant total en euro.
     * Dans une boucle for, la clé est converti en Date() et les données sont stockées dans un tableau,
     * puis affiché dans le template HTML.
     *
     */

    // Non maitrise du code : 13/11/2017;


    this.storage.keys().then(keys => {

      console.log("keys => ", keys);

      keys.forEach(key => {
        console.log('key => ', key);
        let test: any = new Date(key)
        let control: boolean = test == 'Invalid Date';
        console.log('Control = ', control)
        if(!control)
        {

          let day = {date: key, tap: null, price: null};
          this.storage.get(key).then((value) => {

            // Redondant
            let json = JSON.parse(value);

            day.tap = json.tap
            day.price = json.price
            this.data.push(day);

            let date = new Date(key);
            let monthYears = this.translateMonth(date) + ' ' + date.getFullYear();

            if(this.monthName.indexOf(monthYears) <= -1)
            {
              this.monthName.push(monthYears);
              this.totalMonth.push({index: monthYears, tap: json.tap, price: json.price})
              this.tapMonth.push(json.tap);
              this.priceMonth.push(json.price);
            } else {
              this.totalMonth[this.monthName.indexOf(monthYears)] = {index: monthYears, tap: (this.totalMonth[this.monthName.indexOf(monthYears)].tap + json.tap), price: (this.totalMonth[this.monthName.indexOf(monthYears)].price + json.price)};
              this.tapMonth[this.monthName.indexOf(monthYears)] = this.tapMonth[this.monthName.indexOf(monthYears)] + json.tap;
              this.priceMonth[this.monthName.indexOf(monthYears)] = this.priceMonth[this.monthName.indexOf(monthYears)] + json.price;
            }
          })

        } else {
          console.log('NEXT')
        }
    })
  });
  }

  translateMonth(date)
  {

    let month = date.getUTCMonth();

    switch(month)
    {
      case 0:
        return "Janvier";
        //break;
      case 1:
        return "Février";
        //break;
      case 2:
        return "Mars";
        //break;
      case 3:
        return "Avril";
        //break;
      case 4:
        return "Mai";
        //break;
      case 5:
        return "Juin";
        //break;
      case 6:
        return "Juillet";
        //break;
      case 7:
        return "Août";
        //break;
      case 8:
        return "Septembre";
        //break;
      case 9:
        return "Octobre";
        //break;
      case 10:
        return "Novembre";
        //break;
      case 11:
        return "Décembre";
        //break;
      default:
        return "Unknown";
        //break;
    }
  }

}
