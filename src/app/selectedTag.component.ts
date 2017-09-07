import { Component, Input, SimpleChanges } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
/****************************************************************
 * 
 *  angular2 data table: https://www.npmjs.com/package/angular2-datatable
 * 
 * 
 */
@Component({
    selector: 'selectedTag',
    template: `
    <div class="container">
        <div *ngIf="tag" class="outer">
            <h3>Tag Search: '{{tag}}' [results: {{count}}]</h3>
            <div class="public-list-items" *ngFor="let item of urls">
                - <a href='{{item.url}}'>{{ item.title }}</a>
            </div>
        <div>
    </div>


  `,
  styles:[`
        .public-list-title {
            
        }
        .public-list-items {
            
        } 
          `
    ]
})
export class SelectedTagComponent {

    @Input() tag: string="";
    @Input() config: {}={};
    urls: any[];
    count: number;

    constructor(
      private appService:AppService
    ) { 
    }

    ngOnInit() {}
    ngOnChanges(changes: SimpleChanges) {
      for (let propName in changes) {
        let chng = changes[propName];
        let cur  = JSON.stringify(chng.currentValue);
        let prev = JSON.stringify(chng.previousValue);
  
        console.log(`AllTagsComponent ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);

        this.urls=[];

        if (!this.config || !this.tag){
          this.count = 0;
          return Observable.of([]);
        }

        this.appService.loadUrlsByTag(this.config, [this.tag]).subscribe( data => {
          
          if(data && Array.isArray(data.urls) && data.urls.length>0){
              this.urls = data.urls;
              this.count = this.urls.length;
              
              console.log(data.urls);
              console.log(this.urls);
          } 
          
      });
      }
    
    }
}