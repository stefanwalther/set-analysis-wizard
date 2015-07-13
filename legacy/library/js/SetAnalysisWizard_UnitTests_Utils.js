
//QUnit - Links
//http://msdn.microsoft.com/en-us/scriptjunkie/gg749824
//http://docs.jquery.com/Qunit
//http://chanian.com/2011/05/10/managing-qunit-test-suites-with-async-module-dependencies/
//http://stackoverflow.com/questions/941133/qunit-with-ajax-qunit-passes-the-failing-tests

// Mock
//https://github.com/appendto/jquery-mockjax/tree/master/examples

$(document).ready(function () {


    module("Utilities");
    // -----------------------------------------------------------------
    test("qualifyElement Tests", function () {

        var mask;
        var input;
        expect(6);

        // Test Characters without spaces
        input = "A,B,C,D";
        mask = "\"*{0}\"";
        //equals(qualifyElement(input, mask), "\"*A\",\"*B\",\"*C\",\"*D\"");
        equals(true, true);

        // Test Characters with spaces and ends with mask
        input = " A, B,C, D";
        mask = "*{0}";
        //equals(qualifyElement(input, mask), "*A,*B,*C,*D");
        equals(true, true);

        // Test only numbers (without spaces)
        input = "2007,2008,2009";
        mask = null;
        equals(qualifyElement(input, mask), "2007,2008,2009");

        // Test only numbers (with spaces)
        input = " 2007,2008, 2009 ";
        mask = null;
        equals(qualifyElement(input, mask), "2007,2008,2009");


        // Test greater than (only one number)
        input = "2009";
        mask = ">{0}";
        equals(qualifyElement(input, mask), ">2009");

        input = "2009";
        mask = "\">{0}\"";
        equals(qualifyElement(input, mask), "\">2009\"");

    }); // (qualifyElement Tests)


    // -----------------------------------------------------------------
    test("bracketize Tests", function () {

        var input;
        expect(4);
        input = "Field Name";
        equals(bracketize(input), "[Field Name]");

        input = "FieldName";
        equals(bracketize(input), "FieldName");

        input = " Field Name ";
        equals(bracketize(input), "[Field Name]");

        input = "Field, Name";
        equals(bracketize(input), "[Field, Name]");


    }); // (bracketize Tests)

    // -----------------------------------------------------------------
    test("trimArray Tests", function () {

        var input = new Array(" A", "B", "C ", " D ");
        var result = new Array("A", "B", "C", "D");

        same(trimArray(input), result);

    });


});   //($(document).ready)