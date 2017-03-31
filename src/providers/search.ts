import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class SearchProvider {

  constructor(public http: Http) {
    console.log('Hello Search Provider');
  }


  /**
   * getSearchResults
   */
  public getSearchResults(query: string): Promise<Array<Object>> {
    return new Promise<Array<Object>>((resolve, reject) => {
      if (typeof query !== 'undefined') {
        this.http.get(`https://cors-anywhere.herokuapp.com/v2.sg.media-imdb.com/suggests/${query[0]}/${query}.json`)
          .subscribe(data => resolve(this._parseResponse(data['_body'], query)));
      }
      else {
        resolve([]);
      }
    })
  }

  private _parseResponse(imdbResponse: string, query: string): Array<Object> {
    let results = Array<Object>();
    // replace spaces the query string with _
    query = (query).split(' ').join('_');
    // remove the imdb part from the start of the response
    let jsonResponse = imdbResponse.replace(`imdb$${query}(`, '');
    jsonResponse = jsonResponse.substring(0, jsonResponse.length - 1);
    jsonResponse = JSON.parse(jsonResponse);
    // if there is a response then create an array
    if (typeof jsonResponse['d'] !== 'undefined') {
      let j: Array<Object> = jsonResponse['d'];
      j.forEach(value => {
        if (typeof value['q'] !== 'undefined') {
          results.push(value);
        }
      })

      return results;
    }

  }

}