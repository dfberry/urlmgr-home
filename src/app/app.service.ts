import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class AppService {

  constructor(private http: Http) {}
  
  loadConfig() {
    return this.http
    .get('/config.json')
    .map((response: Response) => response.json());
  }
  loadCloud(config) {

    if(!config || !config.apiUrl) return Observable.throw('error constructing api url');

    let url = config.apiUrl + 'tags/all';

    return this.http
    .get(url)
    .map((response: Response) => {
      let json = response.json();
      let tags = json.data.tags;
      return tags;
    }).map(this.prepTagsForCloud);

  }
 

  //    determine weight
  prepTagsForCloud(tags){
    if(tags && tags.length>0){

      // sort from biggest to smallest count
      // ignoring text of tag 
      tags.sort(function(a,b){
        return  b.count - a.count;
      });

      //if more than 20 items, take top 20 
      //more items doesn't make sense in a tag cloud
      if(tags.length>20) tags = tags.slice(0,19);

      // 20% slice - 5 levels of font size
      let slice = Math.ceil(tags.length / 5) ;
      let sliceWeight = 25;
      let currentSlice = slice;
      
      // right now the link doesn't mean anything because it is all private links
      tags.forEach((tag,index) => {
        
        console.log(tag);
        tag.text = tag.tag;
        
        tag.link = "#tag=" + encodeURI(tag.tag); 
        console.log(tag.link);

        if (index<currentSlice){
          tag.weight = sliceWeight;
        } else {
          currentSlice += slice;
          sliceWeight -= slice;
          tag.weight = sliceWeight;
        }
      });

      return tags;
    } 
  }

  loadUrlList(config): Observable<any>{

      let url = config.apiUrl + "urls/public/";
      let options = undefined;

      return this.http.get(url, options)
      .map((response: Response) => {
        let json = response.json();
        let urls = json.data.urls;
        return urls;
      });
  }
  /*
  // public url list
  // array of tags
  loadUrlsByTag(config,tags): Observable<any>{

      let url = config.apiUrl + "/url/tags";
      let options = undefined;        

      return this.http.post(url, {tags: tags})
      .map((response: Response) => {
          let mydata = response.json();
          console.log(mydata);
          return mydata.data;
      }).catch(this._handleErrorObservable);
  }
  _handleErrorObservable(err:any){
      console.log("url.service _handleErrorObservable returned " + JSON.stringify(err));

      console.log(err); //log this
      //throw(err);
      return Observable.of(err); // pass back for ux
  }*/
}