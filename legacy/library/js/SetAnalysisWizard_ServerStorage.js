$(document).ready(function () {


    // -----------------------------------------------------------------
    // Tiggers saving of the current SA-definition on server
    // ~~
    // Callback function
    // Saving_OnSuccess
    // Saving_OnError
    // -----------------------------------------------------------------
    window.SaveSADefinitionOnServer = function () {

        // First get the current SA definition
        var currentSADefinition = new SetAnalysisDefinition();
        currentSADefinition = SADefinition_FromForm();

        var currentSADefinitionString = JSON.stringify(currentSADefinition); ;

        block('Saving result ...');


        // Trigger saving on server (calling the webservice)
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "SetAnalysisWizardStorage.asmx/SaveSetAnalysisDefinition",
            data: "{key:'" + $StorageKey + "',session:'" + $Session + "',value:'" + escape(currentSADefinitionString) + "'}",
            dataType: "json",
            success: Saving_OnSuccess,
            error: Saving_OnError
        }); // (ajax)

    } // (SaveSADefinitionOnServer)

    // -----------------------------------------------------------------
    // Callback for "SaveSADefinitionOnServer"
    // -----------------------------------------------------------------
    function Saving_OnSuccess(result) {
        try {
            $StorageKey = result.d.Key;
            $Session = result.d.Session;
            Form_Update_ByCurrentSA();

            if (window.$StorageKey != null) {
                $('#lnkShare').removeAttr('disabled');
            }


        } catch (e) {
            errorAlert("An error occured after saving the definition:<br/>" + e.message);
        }
        finally {
            unblock();
        }
        return;

    } // (Saving_OnSuccess)

    // -----------------------------------------------------------------
    //Todo: Comment
    // -----------------------------------------------------------------
    function Saving_OnError(result) {
        unblock();
        errorAlert('An error occured while saving the definition on server:<br/><br/>Status:' + result.status + '<br/>Detailed Info:' + result.statusText);
    } // (Saving_OnError)

    // #################################################################
    // Initialization by QueryString
    // #################################################################
    window.initFromQueryString = function () {

        var q = getParameterByName('sa');
        if (q.length > 0) {
            LoadDefinitionFromServer(q);
        }
    } // (initFromQueryString)

    // -----------------------------------------------------------------
    //Todo: Comment
    // -----------------------------------------------------------------
    window.LoadDefinitionFromServer = function (key, successCallback, errorCallback) {

        block('Loading Set Analysis expression from server ...');

        // Default values
        if (successCallback == 'undefined' || successCallback == null) {
            successCallback = LoadDefinition_OnSuccess;
        }
        if (errorCallback == 'undefined' || errorCallback == null) {
            errorCallback = LoadDefinition_OnError;
        }

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "SetAnalysisWizardStorage.asmx/GetSetAnalysisDefinition",
            data: "{key:'" + key + "'}",
            dataType: "json",
            success: successCallback,
            error: errorCallback
        }); // (ajax)
    }     // (LoadDefinitionFromServer)

    // -----------------------------------------------------------------
    //Todo: UIBlock
    // -----------------------------------------------------------------
    window.LoadDefinition_OnSuccess = function (result) {

        if (result.d != null && result.d.length > 0) {

            var oSA = new SetAnalysisDefinition();
            var o = JSON.parse(result.d);

            oSA.InitDeep(o);
            BindForm(oSA);

        }
        else {

            window.errorAlert('Cannot bind existing definition!!!<br /><br />Please try it again!');

        }
        unblock();
    }  // (LoadDefinition_OnSuccess)

    // -----------------------------------------------------------------
    //Todo: Comment
    // -----------------------------------------------------------------
    window.LoadDefinition_OnError = function (result) {
        window.errorAlert('An error occured while loading the definition from server:<br/><br/>Status: ' + result.status + '<br/>Detailed Info:' + result.statusText);
        unblock();
    } // (LoadDefinition_OnError)


    // -----------------------------------------------------------------
    //
    // -----------------------------------------------------------------
    window.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    } // (getParameterByName)

});