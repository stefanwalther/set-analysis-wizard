// -----------------------------------------------------------------
// Bracketizes and trims a field name if necessary
// ~~
// Examples:
// "FieldName"      => Field Name
// "Field Name"     => [Field Name]
// " Field Name "   => [Field Name]
// -----------------------------------------------------------------
function bracketize(fieldValue) {

    if (fieldValue != 'undefined' && fieldValue != null) {

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

} // (bracketize)



// -----------------------------------------------------------------
// Trim all elements of the array
// Relies on the external jQuery trim function ...
// ~~
// Examples:
// {" A", "B "}     => {"A","B"}
// -----------------------------------------------------------------
function trimArray(arr) {

    if ($.isArray(arr)) {
        var newArray = new Array();
        for (var i = 0; i < arr.length; i++) {
            newArray.push($.trim(arr[i]));
        }
        return newArray;
    }
    return null;
}



// -----------------------------------------------------------------
//Todo: Description!!!
// ~~
// Parameters:
// el       string representing the values, e.g. "2007,2008,2009" or "AB,AC,AF"
// mask     mask to be used for this element
//          e.g.:
//          "*{0}" will return "*AB","*AC","*AF" for "AB,AC,AF",
// -----------------------------------------------------------------
function qualifyElement(el, mask, isWildCardExp) {

    // default value for isWildCardExp
    if (isWildCardExp == 'undefined' || isWildCardExp == null) {
        isWildCardExp = false;
    }

    // empty, null or 0-string => return el
    if (el == null || el == 'undefined' || el.length == 0) {
        return el;
    }

    // if we have a number, just return the number
    if (isNumber(el)) {
        return (!nullOrEmpty(mask)) ? mask.replace('{0}', el) : el;
    }

    // Qualify if we have a delimited string ...
    if (el.indexOf(',') > 0) {
        var vals = el.split(',');
        vals = trimArray(vals);

        var returnArr = new Array();
        for (var i = 0; i < vals.length; i++) {
            var newVal = null;
            var val = vals[i];
            var stringDel = '';
            // Here we should decide if we have an array of numbers, strings or mixed
            if (isNumber(val)) {
                stringDel = '';
            }
            else {
                stringDel = '\'';
            }
            newVal = (!nullOrEmpty(mask)) ? mask.replace('{0}', vals[i]) : vals[i];

            // If we do not have a wildcard expression, we have to delimit the string/value
            if (!isWildCardExp) {
                newVal = stringDel + newVal + stringDel;
            }
            returnArr.push(newVal);
        }
        return returnArr.join(',');
    }
    // we just have a single string
    else {
        return (!nullOrEmpty(mask)) ? mask.replace('{0}', el) : "'" + el + "'";
    }
}