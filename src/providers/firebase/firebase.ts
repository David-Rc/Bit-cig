import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import { doc } from '../../config/config';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public database: AngularFirestore) {
    console.log('Hello FirebaseProvider Provider');
  }

  showList(): Observable<any[]>
  {
    return this.database.collection('global').valueChanges();
  }

  updateList(tap, price)
  {
    return this.database.collection('global').doc(doc.id).set({
      tap: tap,
      price: price,
    }).then(res => { console.log('Item Edited')});
  }

/*   updateTap()
  {

  } */

}
