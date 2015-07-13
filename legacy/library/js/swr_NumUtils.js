function randomNumber() {

    var rand_no = Math.random();
    rand_no = rand_no * 10000000;
    return Math.ceil(rand_no);
} // (randomNumber)


//Todo: Copy to JSLib
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
} // (isNumber)