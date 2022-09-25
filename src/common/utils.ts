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

export { bracketize, multiplyString, trim };
