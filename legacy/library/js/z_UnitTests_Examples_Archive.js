//    asyncTest("Example _001", function () {
//        key = '_001';
//        $.ajax({
//            type: "POST",
//            contentType: "application/json; charset=utf-8",
//            url: "SetAnalysisWizardStorage.asmx/GetSetAnalysisDefinition",
//            data: "{key:'" + key + "'}",
//            dataType: "json",
//            success: function (result) {


//                var oSA = new SetAnalysisDefinition();
//                var o = JSON.parse(result.d);
//                var savedExpression = o.Expression;
//                oSA.Init(o);
//                oSA.Calculate();
//                equals(oSA.Expression, savedExpression);
//                equals(oSA.SetModifierActions, null);

//            },
//            error: function () {
//                ok(false, "Error calling key " + key);
//            }
//        }); // (ajax)
//        setTimeout(function () {
//            start();
//        }, 100);

//    });

//    asyncTest("Example _002", function () {
//        key = '_002';
//        $.ajax({
//            type: "POST",
//            contentType: "application/json; charset=utf-8",
//            url: "SetAnalysisWizardStorage.asmx/GetSetAnalysisDefinition",
//            data: "{key:'" + key + "'}",
//            dataType: "json",
//            success: function (result) {

//                var oSA = new SetAnalysisDefinition();
//                var o = JSON.parse(result.d);
//                var savedExpression = o.Expression;
//                oSA.Init(o);
//                oSA.Calculate();
//                equals(oSA.Expression, savedExpression);
//                equals(oSA.SetModifierActions, null);

//            },
//            error: function () {
//                ok(false, "Error calling key " + key);
//            }
//        }); // (ajax)
//        setTimeout(function () {
//            start();
//        }, 100);

//    });

function testKey(key) {
    module("Examples from Server " + key);
    test("LoadDefinitionFromServer", function () {

        stop();
        expect(2);
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "SetAnalysisWizardStorage.asmx/GetSetAnalysisDefinition",
            data: "{key:'" + key + "'}",
            dataType: "json",
            success: function (result) {

                var oSA = new SetAnalysisDefinition();
                var o = JSON.parse(result.d);
                var savedExpression = o.Expression;
                oSA.Init(o);
                oSA.Calculate();
                equals(oSA.Expression, savedExpression);
                equals(oSA.SetModifierActions, null);

            },
            error: function () {
                ok(false, "Error calling key " + key);
            }
        }); // (ajax)
        setTimeout(function () {
            start();
        }, 100);

    });
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}