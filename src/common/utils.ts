// -----------------------------------------------------------------
// Bracketizes and trims a field name if necessary
// ~~
// Examples:
// "FieldName"      => Field Name
// "Field Name"     => [Field Name]
// " Field Name "   => [Field Name]
// -----------------------------------------------------------------
const bracketize = (fieldValue: string) => {

  if ( typeof fieldValue !== 'undefined' || !fieldValue) {

    if (trim(fieldValue).indexOf(' ') > 0) {
      return '[' + trim(fieldValue) + ']';
    }
    else {
      return trim(fieldValue);
    }
  }
  else {
    return fieldValue;
  }

}

const multiplyString = (str: string, num: number): string => {
  let i = Math.ceil(Math.log(num) / Math.LN2),
    res = str;
  do {
    res += res;

  } while (0 < --i);
  return res.slice(0, str.length * num);
}

const trim = (s: string) => {
  if (typeof s !== 'undefined' && !s) {
    return s.replace(/^\s+|\s+$/g, "");
  }
  else {
    return s;
  }
}

const nullOrEmpty = (o: any): boolean => {
  return o === null || o.length == 0 || typeof o === 'undefined';

}

//Todo: Can for sure be replaced with something standard ...
const isNumber = (n: any) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// -----------------------------------------------------------------
// Trim all elements of the array
// Relies on the external jQuery trim function ...
// ~~
// Examples:
// {" A", "B "}     => {"A","B"}
// -----------------------------------------------------------------
function trimArray(arr: any) {

  if (Array.isArray(arr)) {
    let newArray: Array<string> = [];
    for (let i = 0; i < arr.length; i++) {
      newArray.push(trim(arr[i]));
    }
    return newArray;
  }
  return null;
}

export { bracketize, isNumber, nullOrEmpty, multiplyString, trim, trimArray };
