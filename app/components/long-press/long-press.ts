import {Directive, ElementRef, Input, OnInit, OnDestroy} from 'angular2/core';
import {ActionSheet, NavController} from 'ionic-angular'
import {Gesture} from 'ionic-angular/gestures/gesture';
import {Lists} from '../../pages/page1/parties'
import {ShoppingLists} from '../../pages/page3/ShoppingLists'


/*
  Generated class for the LongPress directive.

  See https://angular.io/docs/ts/latest/api/core/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[longPress]' // Attribute selector
})
export class LongPress implements OnInit, OnDestroy {
  el: HTMLElement;
  pressGesture: Gesture;
  @Input('longPress') obj: any;

  constructor(el: ElementRef, private nav: NavController) {
    this.el = el.nativeElement;

  }

  ngOnInit() {
    this.pressGesture = new Gesture(this.el);
    this.pressGesture.listen();
    this.pressGesture.on('press', e => {
      let actionSheet = ActionSheet.create({
        title: 'Modify your album',
        buttons: [
          {
            text: 'Delete',
            role: 'destructive',
            icon: 'trash',
            handler: () => {
              // console.log(this.el.textContent.trim());
              console.log(this.obj);
              console.log(Lists.find({ _id: this.obj }).fetch());
              // console.log(Lists.find({ _id: this.obj }).length>0);
              if (Lists.find({ _id: this.obj }).fetch().length > 0)
                console.log(Lists.remove({ _id: this.obj }));
              else if (ShoppingLists.find({ _id: this.obj }).fetch().length > 0)
                console.log(ShoppingLists.remove({ _id: this.obj }));
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'redd',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ],
      });
      this.nav.present(actionSheet);
    })
  }

  ngOnDestroy() {
    this.pressGesture.destroy();
  }
}
