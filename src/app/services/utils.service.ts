import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  flattenObjectWithPath(objectToFlat): object {
    const result = {};
    
    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        let l = cur.length;
        for (let i = 0 ; i < l; i++)
        recurse(cur[i], prop + "." + i);
        if (l === 0) result[prop] = [];
      } else {
        let isEmpty = true;
        for (let p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + "." + p : p);
        }
        if (isEmpty && prop) result[prop] = {};
      }
    }
    recurse(objectToFlat, "");
    console.log('result: ', result);
    return result;
  }
}
