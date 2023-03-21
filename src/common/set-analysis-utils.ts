// -----------------------------------------------------------------
//  Todo: Description!!!
//  Todo: Types for input params
// ~~
// Parameters:
// el       string representing the values, e.g. "2007,2008,2009" or "AB,AC,AF"
// mask     mask to be used for this element
//          e.g.:
//          "*{0}" will return "*AB","*AC","*AF" for "AB,AC,AF",
// -----------------------------------------------------------------
import {isNumber, nullOrEmpty, trimArray} from "./utils";

const qualifyElement = (el: any, mask: any = '', isWildCardExp: boolean = false) => {

  // empty, null or 0-string => return el
  if (el === null || el === 'undefined' || el.length === 0) {
    return el;
  }

  // if we have a number, just return the number
  if (isNumber(el)) {
    return (!nullOrEmpty(mask)) ? mask.replace('{0}', el) : el;
  }

  // Qualify if we have a delimited string ...
  if (el.indexOf(',') > 0) {
    let values = el.split(',');
    values = trimArray(values);

    let returnArr = [];
    for (let i = 0; i < values.length; i++) {
      let newVal = null;
      let val = values[i];
      let stringDel = '';
      // Here we should decide if we have an array of numbers, strings or mixed
      if (isNumber(val)) {
        stringDel = '';
      } else {
        stringDel = '\'';
      }
      newVal = (!nullOrEmpty(mask)) ? mask.replace('{0}', values[i]) : values[i];

      // If we do not have a wildcard expression, we have to delimit the string/value
      if (!isWildCardExp) {
        newVal = stringDel + newVal + stringDel;
      }
      returnArr.push(newVal);
    }
    return returnArr.join(',');
  }

  // we just have a single string
  // it will be trimmed in any case
  else {
    return (!nullOrEmpty(mask)) ? mask.replace('{0}', el.trim()) : "'" + el.trim() + "'";
  }
}

export {qualifyElement};
