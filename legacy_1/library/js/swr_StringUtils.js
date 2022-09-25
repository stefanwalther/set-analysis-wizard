



// Upper case the first letter of each word within a string
function upperCaseWords(str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
} //upperCaseWords

function multiplyString(str, num) {
    var i = Math.ceil(Math.log(num) / Math.LN2),
	res = str;
    do {
        res += res;

    } while (0 < --i);
    return res.slice(0, str.length * num);
} // (multiplyString)


function nullOrEmpty(obj) {
    if (obj == null || obj.length == 0 || obj == 'undefined') {
        return true;
    }
    return false;
} // (nullOrEmpty)


function trim(s) {
    if (s != 'undefined' && s != null) {
        return s.replace(/^\s+|\s+$/g, "");
    }
    else {
        return s;
    }
}

function safeHtml(s) {

    var t = s;
    t = t.replace(/</g, '&lt;');
    t = t.replace(/>/g, '&gt;');
    return t;
}


String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
} // (String.prototype.trim)

String.prototype.ltrim = function () {
    return this.replace(/^\s+/, "");
} // (String.prototype.ltrim)

String.prototype.rtrim = function () {
    return this.replace(/\s+$/, "");
} // (String.prototype.rtrim)

