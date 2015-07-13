$(document).ready(function () {



    var baseLink = "http://localhost/qlikblog.Tools.SetAnalysisWizard.Web/QlikView-SetAnalysis_Wizard_and_Generator.aspx";

    //var keys = ['_001', '_002', '_003', '_004', '_005', '_006', '_007', '_008', '_009', '_010', '_1ZZ2', '_29C5', '_2X65', '_4E53', '_DA4H', '_DN96', '_IPB4', '_J791', '_NDL1', '_NHFW', '_OEFA', '_OXLC', '_XKFS', '_OTI1','_NT6B'];
    //var key = '_001';
    var waitMilliseconds = 0;

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "UnitTesting.asmx/GetTestKeys",
        dataType: "json",
        success: function (result) {

           startExampleTest(result.d, waitMilliseconds);

        },
        error: function () {
            ok(false, "Error calling web service");
        }
    }); // (ajax)



    function startExampleTest(keys, waitMilliSeconds) {

        module("Examples");
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            testKeyAsync(key);
        }


        function testKeyAsync(testKey) {
            asyncTest("Example " + testKey, function () {
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "SetAnalysisWizardStorage.asmx/GetSetAnalysisDefinition",
                    data: "{key:'" + testKey + "'}",
                    dataType: "json",
                    success: function (result) {

                        var oSA = new SetAnalysisDefinition();
                        var o = JSON.parse(result.d);
                        var savedExpression = o.Expression;
                        oSA.InitDeep(o);
                        oSA.Calculate();
                        equals(oSA.Expression, savedExpression);

                    },
                    error: function () {
                        ok(false, "Error calling key " + testKey);
                    }
                }); // (ajax)
                setTimeout(function () {
                    start();
                }, waitMilliseconds);

            });
        }

    }
    



});