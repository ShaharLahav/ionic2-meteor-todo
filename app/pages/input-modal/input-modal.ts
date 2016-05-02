import {Page, NavController, ViewController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {Lists} from '../page1/parties';
/*
  Generated class for the InputModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
    templateUrl: 'build/pages/input-modal/input-modal.html',
})
export class InputModalPage  extends MeteorComponent {
    public myData: Mongo.Cursor<any>;
    title:string;
    description:string;
    
    constructor(public nav: NavController, private viewController: ViewController) {
        super();
        // this.nav = nav;
        this.myData = Lists.find({name:'ds'});
    }
    
    dismiss() {
        
        this.viewController.dismiss()
    }
    
    clicked() {
        console.log(this.title);
        console.log(this.description);
        let item = {
            name: this.title,
            description: this.description
        };
        let id = Lists.insert(item);
        console.log(id);
        
         this.viewController.dismiss()
    }
}
