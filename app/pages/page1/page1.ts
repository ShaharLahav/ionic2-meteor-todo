import {Page} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {Lists} from './parties';
import {IterableDiffers, Component} from 'angular2/core';
import {NavController, Modal} from 'ionic-angular';
import {Gesture} from 'ionic-angular/gestures/gesture';
import {InputModalPage} from '../input-modal/input-modal';
import {LongPress} from '../../components/long-press/long-press'
import {Page3} from '../page3/page3'


@Page({
    templateUrl: 'build/pages/page1/page1.html',
    directives: [LongPress]
})
export class Page1 extends MeteorComponent {
    public myData: Mongo.Cursor<any>;

    // add(item: string) {
    //     Lists.insert({ name: item });
    // }

    constructor(private nav: NavController) {
        super();
        this.myData = Lists.find({});
    }

    clicked(list) {
        // console.log(list);
        this.nav.push(Page3,{'l':list._id});
    }

    openModal() {
        let modal = Modal.create(InputModalPage);
        this.nav.present(modal);
    }
}
