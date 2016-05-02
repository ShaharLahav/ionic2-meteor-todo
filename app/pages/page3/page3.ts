import {Page, NavController, NavParams,Alert} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {ShoppingLists} from './ShoppingLists'
import {NgZone} from "angular2/core";
import {LongPress} from '../../components/long-press/long-press'


@Page({
  templateUrl: 'build/pages/page3/page3.html',
  directives: [LongPress]
})
export class Page3 extends MeteorComponent {

  public myData: Array<any>;

  par: any;
  constructor(private nav: NavController, private navParams: NavParams, private zone: NgZone) {
    super();
    console.log(navParams.get('l'));
    this.par = navParams.get('l');

    this.zone = new NgZone({ enableLongStackTrace: false });
    
    this.autorun(() => {
      this.zone.run(() => {
        this.myData = ShoppingLists.find({ 'listId': this.par }, { sort: { completed: 1 } }).fetch();
      });
    });

  }


  completeChange(item) {
    console.log(item);
    this.zone.run(() => { ShoppingLists.update({ _id: item._id }, { $set: { name: item.name, listId: item.listId, completed: !item.completed } }); });

    console.log(ShoppingLists.find({ 'listId': this.par }).fetch());
  }

  clicked() {
    let prompt = Alert.create({
      title: 'New Item',
      message: "Enter the name of the item",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            ShoppingLists.insert({name:data.title,listId:this.par,completed:false});
          }
        }
      ]
    });
     this.nav.present(prompt);
   }


}

