$(document).ready(function () {

    // Initialize all global variables and calls
    Init();

    
    // Global variables to store the SessionKey and StorageKey
    //Todo: Rename $Session to $SessionKey (both client & server side)
    //Todo: Still used??
    window.$Session = "";
    window.$StorageKey = "";

    // Global variable to store the amount of actions within the action container
    // Note: this is more not a counter but a unique id, so if an action will be
    // deleted setModifiers_Num will not be redimensioned
    window.setModifiers_Num = 0;


    window.exampleLoaded = false; //Indicates, that the example has not been loaded, yet

    // Global variables
    window.$SetExpression = null; //Todo: what's this



});

    // Initalize all global vars
window.Init = function () {

    // Init (Overall initialization)
    InitSetAnalysisWizard();

    // Add all event handler necessary ...
    Form_AddEventHandler();
    ActionForm_AddEventHandler();

    // Main Hide/Show
    $('#divLoading').hide();
    $('#divMain').show();

}

window.GetBaseLink = function () {
    return window.location.protocol + "//" + window.location.hostname + "" + window.location.pathname.replace("QlikView-SetAnalysis_Wizard_and_Generator.aspx", "");
}

window.GetShareLink = function () {
    return GetBaseLink() + "?sa=" + this.$StorageKey;
}


    // #################################################################
    // General UI functionality
    // #################################################################

    // -----------------------------------------------------------------
    // Main function to get the Set Analysis expression ...
    // ~~
    // Description:
    // 
    // Returns:
    //      Returns the output to be used in the textarea to copy everythin
    //      (Description + Expression)
    // -----------------------------------------------------------------
    window.GetSA_Output = function () {

        //Todo: Check that:
        // Maybe recalling is not necessary at all if $SetExpression is up to date all the time
        var s = new SetAnalysisDefinition();
        s = SADefinition_FromForm();
        s.Calculate();
        $SetExpression = s; //Todo: Check again, if we need that?

        var saveOnServer = $('#chkSaveResultOnServer').attr('checked');

        return s.GetDescription(saveOnServer) + '=' + s.GetSAExpression();

    }   // (GetSA_Output)


    // -----------------------------------------------------------------
    // Initialize the application, the form and everything :)
    // -----------------------------------------------------------------
    window.InitSetAnalysisWizard = function () {


        // Check wheater there is a querystring with "sa", if
        // yes, load the value from the webservice
        initFromQueryString();

        //Todo: is this really the right place???
        ActionContainer_AfterUpdate();

        //Todo: is this the right place??
        ActionForm_HideAllUIObjects();

        setQVVersion();

        Form_Update_ByCurrentSA();

        // Accordion - Examples
        // Must be activated before activating tabs!!
        $("#accordion").accordion({
            //animated: 'bounceslide',
            minHeight: 800,
            autoheight: true,
            fillSpace: true

        });



        // Tabify
        $tabs = $("#tabs").tabs();


        // Tooltips
        // Match all <A/> links with a title tag and use it as the content (default).
        $('a.qtippable[title]').qtip();

        $('input').customInput();



    }  // (InitSetAnalysisWizard)


    //Todo: can be deleted because it is replaced by BindActionFrom
    //Todo: Comment & Format Comment
    // Clear/Re-Initializes everything on the page
    window.ClearForm = function () {

        // Reset all Select fields which are marked as "clearable"
        $("select.clearable").each(function () {
            // set its value to its first option
            $(this).val($("#" + $(this).attr("id") + " option:first").val());
        });

        // Reset all Select fields which are marked as "clearable"
        $("input.clearable").each(function () {
            // set its value to its first option
            $(this).val('');
        });

    } // (ClearForm)


    // #################################################################
    // SetAnalysisDefinition - General
    // #################################################################

    // -----------------------------------------------------------------
    // Init_FromForm
    // ~~
    // Inits all values from form and returns a SetAnalysisDefinition-object 
    // (SetAnalysisDefinition and Array of SetModifierActions)
    // -----------------------------------------------------------------
    window.Init_FromForm = function () {

        var objSAD = new SetAnalysisDefinition();
        objSAD = SADefinition_FromForm();
        objSAD.SetModifierActions = ActionContainer_GetObjectsFromContainer();

        return objSAD;


    }


    // -----------------------------------------------------------------
    // BindForm
    // ~~
    // Set all form values from SetAnalysisDefinition object
    // -----------------------------------------------------------------
    window.BindForm = function(setAnalysisDefinition) {

        $('#cboSetIdentifier').val(setAnalysisDefinition.SetIdentifier);
        $('#cboAggregationType').val(setAnalysisDefinition.AggregationType);
        $('#txtFieldExpression').val(setAnalysisDefinition.FieldExpression);
        $('#txtBookmarkId').val(setAnalysisDefinition.Bookmark);
        $('#txtPersonalComment').val(setAnalysisDefinition.PersonalComment);
        $('#cboQVVersion').val(setAnalysisDefinition.QlikViewVersion);

        // Hide/Show Personal Comments depending on the props value
        $('#divPersonalComment').toggle(!nullOrEmpty(setAnalysisDefinition.PersonalComment));
        $('#divPersonalCommentEOF').toggle(nullOrEmpty(setAnalysisDefinition.PersonalComment));


        // Bind the actions container
        if (setAnalysisDefinition.SetModifierActions != null && $.isArray(setAnalysisDefinition.SetModifierActions)) {

            for (var i = 0; i < setAnalysisDefinition.SetModifierActions.length; i++) {
                var o = setAnalysisDefinition.SetModifierActions[i];
                ActionContainer_AddChange_SetModifierAction(o);
            }
        }

        // Init form depending on various selections ...
        Form_Update_BySetIdentifier();

        // Set the output
        Form_Update_ByCurrentSA();


    } // (BindForm)

    // -----------------------------------------------------------------
    // SADefinition_FromForm()
    // ~~
    //Todo: //OLD: InitSADefinitionFromForm
    // Load values (only for the SetAnalysisDefinition (without SetModifierActions)
    // from existing form
    // -----------------------------------------------------------------
    window.SADefinition_FromForm = function () {

        var objSAD = new SetAnalysisDefinition();

        //objSAD.SetIdentifier = $('#cboSetIdentifier').val();
        objSAD.SetIdentifier = $("#cboSetIdentifier :selected").attr("value");
        objSAD.SetIdentifierDesc = $("#cboSetIdentifier :selected").attr("text");

        // Get the type of aggregation from the combo box (sum | avg | xxx)
        objSAD.AggregationType = $("#cboAggregationType :selected").val();

        // Set the description for the AggregationType
        objSAD.AggregationTypeDesc = $("#cboAggregationType :selected").text();

        // Get the field expressions (will be trimmed but not bracketized) 
        objSAD.FieldExpression = trim($("#txtFieldExpression").val());
        objSAD.Bookmark = $('#txtBookmarkId').val();
        objSAD.PersonalComment = $('#txtPersonalComment').val();
        objSAD.QlikViewVersion = $('#cboQVVersion').val();

        objSAD.SetModifierActions = ActionContainer_GetObjectsFromContainer();

        objSAD.Calculate();

        return objSAD;

    }     // (SADefinition_FromForm)


    


    /* ----------------------------------------------------------------------------------*/
    /* Base Templates */
    



    // #################################################################
    // Event Handler Definition + Event Handler MAIN FORM
    // #################################################################

    // -----------------------------------------------------------------
    // Add all event handler needed for the main form
    // -----------------------------------------------------------------
    window.Form_AddEventHandler = function () {

        // -----------------------------------------------------------------
        // Events on Tab 0 - Set Analysis Definition

        // SET IDENTIFIER (current selection, all values, etc.)

        $('#cboSetIdentifier').bind('click change', function () {
            Form_Update_BySetIdentifier();
            Form_Update_ByCurrentSA();
        });
        // Events for keyup (only if the key is arrow-up or arrow-down)
        $('#cboSetIdentifier').keyup(function (event) {
            if (event.keyCode == '38' || event.keyCode == '40') {
                Form_Update_BySetIdentifier();
                Form_Update_ByCurrentSA();
            }
        });

        // BOOKMARK (NAME OR ID)
        $('#txtBookmarkId').bind('keyup', Form_Update_ByCurrentSA);

        // Personal Comment
        //Todo: Delete the old one ...
        //$('#txtPersonalComment').keyup(function () { Form_Update_ByCurrentSA(); }).attr("onkeyup", function () { Form_Update_ByCurrentSA(); });
        $('#txtPersonalComment').bind('keyup', Form_Update_ByCurrentSA);


        // AGGREGATION TYPE (sum, count, etc.)
        $('#cboAggregationType').bind('click change', Form_Update_ByCurrentSA);
        // Events for keyup (only if the key is arrow-up or arrow-down)
        $('#cboAggregationType').keyup(function (event) {
            if (event.keyCode == '38' || event.keyCode == '40') {
                Form_Update_ByCurrentSA();
            }
        });


        // FIELD OR EXPRESSION
        $('#txtFieldExpression').bind('keyup', Form_Update_ByCurrentSA);


        // PERSONAL COMMENT - Click Event (Header)

        $('#lnkPersonalCommentRemove').bind('click', function () {
            $('#divPersonalComment').toggle('slow');
            $('#divPersonalCommentEOF').toggle('slow');
        });
        $('#lnkAddPersonalComment').bind('click', function () {
            $('#divPersonalComment').toggle('slow');
            $('#divPersonalCommentEOF').toggle('slow');
        });


        // Button "Add an action" trigger
        $('#a_addSetModifierAction').bind('click', function () {
            OpenActionFormDialog(null);
        }); //(a_addSetModifierAction.click)



        // -----------------------------------------------------------------
        // Other Events

        // jump to the Detailed Expression
        $('#divSAPreview').click(function () { $tabs.tabs('select', 1); });


        // -----------------------------------------------------------------
        // Events for tab selecting
        $tabs.bind('tabsselect', function (event, ui) {

            // Objects available in the function context:
            //ui.tab     // anchor element of the selected (clicked) tab
            //ui.panel   // element, that contains the selected/clicked tab contents
            //ui.index   // zero-based index of the selected (clicked) tab
            if (ui.index == 2 && !exampleLoaded) {
                //Todo: Change this
                //loadEx('Set-Analysis-Example--Simple-Expressions.aspx'); //Default example page
                loadEx('Set-Analysis-Example--Simple-Expressions.aspx'); //Default example page

                exampleLoaded = true;
            }

        });



        // -----------------------------------------------------------------
        // Events on Tab 1 - Result
        $('#lnkSelectAll').click(function () { $('#txtOutput').select(); });

        $('#chkSaveResultOnServer').bind('click change', function () {
            if ($('#chkSaveResultOnServer').attr('checked')) {
                SaveSADefinitionOnServer();
            }
            else {
                // Just refresh the output
                Form_Update_ByCurrentSA();
                $('#lnkShare').attr('disabled', 'disabled');
            }
        }); // (chkSaveResultOnServer.Click)


        // Share button
        $('#lnkShare').bind('click', function () {
            $('#txtShareLink').val(GetShareLink());
            $("#divShareDialog")
                .dialog({
                    width: '550px',
                    modal: true,
                    buttons: {
                        OK: function () {
                            $(this).dialog('close');
                        }
                    } // (buttons)
                }); // Share Dialog
        });

        // (Events on Tab 1 - Result)


        // -----------------------------------------------------------------
        // Events for Tab 5 - Debug
        $('#cmdGetDebugOutput').click(function () {

            var setAnalysisDefinition = new SetAnalysisDefinition();
            setAnalysisDefinition = SADefinition_FromForm();
            setAnalysisDefinition.InitPureDescription(false);   // Initialize the pure description to save it ...

            var json = JSON.stringify(setAnalysisDefinition)
            $('#txtDebugOutput').val(json);

        });

        $('#cmdDebugClearForm').click(function () {
            ClearForm();
            // GoTo first tab
            $tabs.tabs('select', 0);

        }); //(cmdDebugClearForm.Click)


        //Todo: Probably this will be changed ...
        $('#cboQVersion').click(function () { setQVVersion(); });

    }         // (Form_AddEventHandler)

    // -----------------------------------------------------------------
    // Write the output to all defined destinations (tab 1 + tab 2)
    // -----------------------------------------------------------------
    window.Form_Update_ByCurrentSA = function () {

        var output = GetSA_Output();

        $('#txtOutput').val(output);

        // After GetSA_Output $SetExpression is up to date, so we can directly call this
        $('#divSAPreview').text($SetExpression.Expression);
        //$('#divSAPreview').html($SetExpression.Expression.replace('<', '&lt;').replace('>', '&gt;'));

    }     // (Form_Update_ByCurrentSA)

    // #################################################################
    // Event Handler Definition + Event Handler ACTION FORM
    // #################################################################

    // -----------------------------------------------------------------
    // Add all event handlers for the action-form
    // -----------------------------------------------------------------
    window.ActionForm_AddEventHandler = function () {


        //Todo: should be capsulated (event + detailed function)
        // event trigger for the dialog form
        $('#cboSetModifierAction').click(function () { ActionForm_Update(); }).attr("onclick", function () { ActionForm_Update(); });
        //$('#cboSetModifierAction').change(function () { ActionForm_Update(); }).attr("onchange", function () { ActionForm_Update(); });
        // Events for keyup (only if the key is arrow-up or arrow-down)
        $('#cboSetModifierAction').keyup(function (event) {
            if (event.keyCode == '38' || event.keyCode == '40') {
                ActionForm_Update();
            }
        });


        $('#cboSelectionOperator').click(function () { ActionForm_Bind_BySelectionOperator(null); }).attr("onclick", function () { ActionForm_Bind_BySelectionOperator(null); });
        //$('#cboSelectionOperator').change(function () { ActionForm_Bind_BySelectionOperator(null); }).attr("onchange", function () { ActionForm_Bind_BySelectionOperator(null); });
        // Events for keyup (only if the key is arrow-up or arrow-down)
        $('#cboSelectionOperator').keyup(function (event) {
            if (event.keyCode == '38' || event.keyCode == '40') {
                ActionForm_Bind_BySelectionOperator(null);
            }
        });

        $('#sm_fieldoperator').click(function () { ActionForm_UpdatePreview(); }).attr("onclick", function () { ActionForm_UpdatePreview(); });
        //$('#cboSelectionOperator').change(function () { ActionForm_Bind_BySelectionOperator(null); }).attr("onchange", function () { ActionForm_Bind_BySelectionOperator(null); });
        // Events for keyup (only if the key is arrow-up or arrow-down)
        $('#sm_fieldoperator').keyup(function (event) {
            if (event.keyCode == '38' || event.keyCode == '40') {
                ActionForm_UpdatePreview();
            }
        });

        $('#sm_field').keyup(function (event) { ActionForm_UpdatePreview(); });
        $('#sm_value_1').keyup(function (event) { ActionForm_UpdatePreview(); });
        $('#sm_value_2').keyup(function (event) { ActionForm_UpdatePreview(); });
        $('#sm_otherfield').keyup(function (event) { ActionForm_UpdatePreview(); });
        $('#sm_indirectfield').bind('keyup change', ActionForm_UpdatePreview);

        $('#aCopyOtherField').bind('click', function () {
            $('#sm_indirectfield').val($('#sm_field').val());
            ActionForm_UpdatePreview();
        });

        // Save on enter ...
        $('#divActionDialog').keyup(function (e) {
            if (e.keyCode == 13) {
                $('.ui-dialog').find('button:first').trigger('click');
            }
        });

        // Exit on escape ... 
        $('#divActionDialog').keyup(function (e) {
            if (e.keyCode == 27) {
                $('.ui-dialog').find('button:second').trigger('click');
            }
        });

    }   // (ActionForm_AddEventHandler)


    //Todo: This does not really makes sense!
    //Either bind by SelectionOperator or bind by ...?!!
    window.ActionForm_Bind_BySelectionOperator = function (setModifierAction) {

        if (setModifierAction == null) {
            setModifierAction = Action_ByForm();
        }

        switch (setModifierAction.SelectionOperator) {
            case "equal_to":
            case "greater_than":
            case "less_than":
            case "greater_than_or_equal":
            case "less_than_or_equal":
            case "contains":
                $('#div_sm_value_and').hide();
                $('#div_sm_value_2').hide();
                break;
            case "between_gt_lt":
            case "between_gt=_lt":
            case "between_gt=_lt=":
            case "between_gt_lt=":
                $('#div_sm_value_and').css('display', 'inline-block');
                $('#div_sm_value_2').css('display', 'inline-block');
                break;
            default:
                break;
        }

        _bindActionFormPreview(setModifierAction);



    } // (ActionForm_Bind_BySelectionOperator)

    // #################################################################
    // ACTION - UI related
    // #################################################################
    window.Action_ByForm = function () {

        var o = new SetModifierAction();
        o.Action = $('#cboSetModifierAction').val();
        o.Field = trim($('#sm_field').val());
        o.OtherField = trim($('#sm_otherfield').val());
        o.FieldOperator = trim($('#sm_fieldoperator').val());
        o.ValuesOrExpression_1 = trim($('#sm_value_1').val());
        o.ValuesOrExpression_2 = trim($('#sm_value_2').val());
        o.SelectionOperator = $('#cboSelectionOperator').val();
        o.IndirectField = $('#sm_indirectfield').val();
        return o;

    }   // (Action_ByForm)




    // #################################################################
    // BlockUI Lib
    // #################################################################

    // -----------------------------------------------------------------
    // blockUI - functionality ....
    // -----------------------------------------------------------------
    window.block = function (msg) {
        var displayMsg = (msg == null) ? "Loading ..." : msg;
        $('#domMessage_H1').html(displayMsg);
        if ($.blockUI != 'undefined') {
            $.blockUI({
                message: $('#domMessage'),
                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#eeeeee',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#000000'
                },
                overlayCSS: {
                    backgroundColor:    '#ccc',
                    opacity:            .8
                }
            });
        }
    }  // (block)

    window.unblock = function () {
        if ($.unblockUI != 'undefined') {
            $.unblockUI();
        }
    } // (unblock)



    // -----------------------------------------------------------------
    // Event handler for cboSetIdentifier
    // ~~
    // Layout function which should check the state
    // of all fields depending on "cboSetIdentifier" (main form)
    // ("current selection", "all values", etc.)
    // -----------------------------------------------------------------
    window.Form_Update_BySetIdentifier = function () {

        var s = $('#cboSetIdentifier').val();

        // default actions
        $('#divBookmark').hide();

        switch (s) {
            case "bookmark":
            case "$+bookmark":
            case "$*bookmark":
            case "$-bookmark":
                $('#divBookmark').css('display', 'inline-block');
                break;
            default:
                break;
        }

    } //(Form_Update_BySetIdentifier)






    // #################################################################
    // QV Version
    // #################################################################

    // -----------------------------------------------------------------
    // Configure form based on QlikView version
    // ~~
    // Based on the selected QV version some features
    // should be shown or hidden
    // -----------------------------------------------------------------
    window.setQVVersion = function () {

        var v = $('#cboQVVersion').val();

        disableQVRelatedFeatures();

    }

    // Disable all QV version related features ...
    window.disableQVRelatedFeatures = function () {

        // Remove direct/indirect set analysis
        $('#cboSetModifierAction option[value=set_pindirect]').hide();
        $('#cboSetModifierAction option[value=set_eindirect]').hide();
    }


    // #################################################################
    // Error Dialog
    // #################################################################
    window.errorAlert = function (msg, title) {
        if (title == null) {
            title = "An error occured!";
        }
        $('#divErrorMsg').html(msg);
        $("#divErrorDialog")
                .dialog({
                    width: '500px',
                    modal: true,
                    title: title,
                    buttons: {
                        OK: function () {
                            $(this).dialog('close');
                        }
                    } // (buttons)
                }); // error dialog
    }    // (errorAlert())




    // #################################################################
    // Dialog
    // #################################################################

    // -----------------------------------------------------------------
    // Open the dialog for defining a SetModifier action
    // or editing an existing one ...
    // ~~
    // Hints:
    // If an existing one should be edited, the parameter "setModifierAction"
    // needs to be passed, otherwise this parameter can be left null
    // -----------------------------------------------------------------
    window.OpenActionFormDialog = function (setModifierAction, existingId) {

        // Init the dialog's settings
        ActionForm_Bind(setModifierAction);

        $("#divActionDialog")
        //.data('sm_a', setModifierAction)
                .dialog({
                    width: '980px',
                    modal: true,
                    buttons: {
                        Save: function () {
                            //classes (für Styling) ...
                            //http://stackoverflow.com/questions/1138291/jquery-dialog-save-cancel-button-styling
                            //className
                            //
                            //Icon hinzufügen:
                            //http: //stackoverflow.com/questions/1138291/jquery-dialog-save-cancel-button-styling
                            var o = new SetModifierAction();
                            o = Action_ByForm();
                            ActionContainer_AddChange_SetModifierAction(o, existingId);
                            $(this).dialog('close');

                            // refresh the output
                            Form_Update_ByCurrentSA();

                        },
                        Cancel: function () {
                            $(this).dialog('close');
                            Form_Update_ByCurrentSA();
                        }
                    } // (buttons)
                }); // dialog

        $("#divActionDialog").dialog('option', 'position', [50, 100]);
    }    // (OpenActionFormDialog)

    


    // #################################################################
    // ActionContainer
    // #################################################################

    // -----------------------------------------------------------------
    // ActionContainer_AddChange_SetModifierAction()
    // ~~
    // Parameters:
    //  oP - Set Modifier Action object
    //  existingId of the item (optional)
    // Property sm_a holds the SetModiferActions
    // Property sm holds a unique id for the object in the action container
    // -----------------------------------------------------------------
    window.ActionContainer_AddChange_SetModifierAction = function (oP, existingId) {

        // id-counter to be used withing this function
        // if the id is passed (existingId), this number will be used
        // otherwise the setModifiers_Num will be increased and used
        var numToUse = 0;
        var objectId = ''; // internal var to hold the object id of the action-row

        // Check if we should increase the counter to get a new unique id or 
        // use the existing one (which will cause that the existing object will
        // be replaced
        if (existingId < 0 || existingId == 'undefined' || existingId == null) {
            setModifiers_Num = setModifiers_Num + 1;
            numToUse = setModifiers_Num;
        }
        else {
            numToUse = existingId;
        }
        objectId = "divSetModifier_" + numToUse;

        var o = $("#divSetModifier").clone(true);
        o.attr('id', objectId);
        o.attr('sm', numToUse);

        //Todo: Check this
        //Todo: Document this step, no idea at the moment what's happening here ... :)
        //more elegant: http://paste.pocoo.org/show/87509/
        o.find('.lblSetModifierLabel').text(oP.GetDescription());



        // -----------------------------------------------------------------
        // EDIT FUNCTIONALITY
        // -----------------------------------------------------------------
        //o.find('.setModifier_EditButton').attr("value", "Edit " + numToUse);
        o.find('.setModifier_EditButton').attr("id", "setModifier_EditButton_" + numToUse);
        o.find('.setModifier_EditButton').attr("sm", numToUse);
        o.find('.setModifier_EditButton').click(function () {

            var currentNr = $(this).attr("sm");
            // Get the current Set Modifier Action
            var setModifierAction = $('#divSetModifier_' + currentNr).data('sm_a');

            // open the dialog and bind the form
            // (binding will be done at the beginning of OpenActionFormDialog)
            OpenActionFormDialog(setModifierAction, currentNr);

        });

        // -----------------------------------------------------------------
        // DELETE FUNCIONALITY
        // -----------------------------------------------------------------
        // Set the value to find the row ...
        o.find('.setModifier_DeleteButton').attr("sm", numToUse);
        // Define the event handler for the delete button to
        // delete the setModifier definition
        o.find('.setModifier_DeleteButton').click(function () {
            var currentNr = $(this).attr("sm");

            $("#divSetModifier_" + currentNr).remove();
            ActionContainer_AfterUpdate();
            Form_Update_ByCurrentSA();
        });

        // -----------------------------------------------------------------
        // HIGHLIGHT FUNCTIONIONALITY
        // -----------------------------------------------------------------
        // Set the value to find the row ...



        o.bind('mouseover', function () {
            var currentNr = $(this).attr("sm");
            var setModifierAction = $('#divSetModifier_' + currentNr).data('sm_a'); // Get the current Set Modifier Action
            setModifierAction.GetModifier(); // I am not really sure at this moment why we have to do this, why is it not initialized??
            var highlightedExpression = safeHtml($SetExpression.Expression).replace(safeHtml(setModifierAction.TechnicalModifier), "<span class='hightLighted'>" + safeHtml(setModifierAction.TechnicalModifier) + "</span>");
            //alert(setModifierAction.TechnicalModifier);
            //alert(highlightedExpression);
            $('#divSAPreview').html(highlightedExpression);
        });
        o.bind('mouseout', function () {
            $('#divSAPreview').text($SetExpression.Expression);
        });

        o.find('.setModifier_HighlightButton').attr("sm", numToUse);
        o.find('.setModifier_HighlightButton').bind('mouseover', function () {
            //            var currentNr = $(this).attr("sm");
            //            var setModifierAction = $('#divSetModifier_' + currentNr).data('sm_a'); // Get the current Set Modifier Action
            //            setModifierAction.GetModifier(); // I am not really sure at this moment why we have to do this, why is it not initialized??
            //            var highlightedExpression = safeHtml($SetExpression.Expression).replace(safeHtml(setModifierAction.TechnicalModifier), '<span class=\"hightLighted\">' + safeHtml(setModifierAction.TechnicalModifier) + '</span>');
            //            $('#divSAPreview').html(highlightedExpression);

        }); // (setModifier_HighlightButton => mouseover)

        // Onmouse out Event for the button
        o.find('.setModifier_HighlightButton').bind('mouseout', function () {
            //$('#divSAPreview').text($SetExpression.Expression);
        }); // (setModifier_HighlightButton => mouseout)

        // Set the object for the set modifier action
        o.data('sm_a', oP);
        $(o).show();



        // -----------------------------------------------------------------
        // ADD TO DOM
        // If we are dealing with an existing id, then replace the object,
        // otherwise add it to the container
        // -----------------------------------------------------------------
        if (existingId < 0 || existingId == 'undefined' || existingId == null) {
            o.appendTo('#divActionContainer');
        }
        else {
            var oExisting = $('#' + objectId);
            oExisting.replaceWith(o);
        }

        ActionContainer_AfterUpdate();


    }          // (ActionContainer_AddChange_SetModifierAction)


    // -----------------------------------------------------------------
    // ActionContainer_GetObjectsFromContainer()
    // -----------------------------------------------------------------
    // return an array of the setModifier objects
    // read from divActionContainer
    // ~~
    // Note: will be used by one of the objects !!!
    // -----------------------------------------------------------------
    window.ActionContainer_GetObjectsFromContainer = function () {

        var size = $('#divActionContainer').children().size();
        var a = new Array();

        $.each($('#divActionContainer').children(), function () {
            var newAction = new SetModifierAction();
            newAction.Init($(this).data('sm_a'));
            a.push(newAction);
        });

        return a;
    }    // (ActionContainer_GetObjectsFromContainer)


    // -----------------------------------------------------------------
    // Configure the Action Container:
    // ~~
    // If no items are saved a div with message should be shown
    // otherwise the div with the items should be shown
    // ~~
    // ==>  this can/should be called every time the content of the action
    //      container changes ...!
    // -----------------------------------------------------------------
    window.ActionContainer_AfterUpdate = function () {

        // empty => display message
        if ($('#divActionContainer').children().length == 0) {

            $('#divActionContainer').hide();
            $('#divActionContainerEmpty').show();
        }
        // We have records
        else {


            $('#divActionContainer').show();
            $('#divActionContainerEmpty').hide();

            // this is perfect place to render the displaying of odd and even rows
            $('#divActionContainer .clsSetModifier').removeClass('even odd'); //First remove all classes
            // Then add them
            $('#divActionContainer .clsSetModifier:even').addClass('even');
            $('#divActionContainer .clsSetModifier:odd').addClass('odd');


        }
    } // (ActionContainer_AfterUpdate)



    // #################################################################
    // Action form (dialog)
    // #################################################################

    // -----------------------------------------------------------------
    // Primary function to bind the action form to an existing
    // SetModifierAction (value or null) = (existing or new)
    // ~~
    // Bind the form to a SetModifierAction
    // -----------------------------------------------------------------
    window.ActionForm_Bind = function (setModifierAction) {


        // If the action is null or undefined (so we are dealing with a new
        // SetModifierAction ==> clean the form
        if (setModifierAction == 'undefined' || setModifierAction == null) {

            // Reset all Select fields which are marked as "af_clearable"
            $("select.af_clearable").each(function () {
                // set its value to its first option
                $(this).val($("#" + $(this).attr("id") + " option:first").val());
            });

            // Reset all values in text boxes with the class "af_clearable"
            $("input.af_clearable").each(function () {
                // set its value to its first option
                $(this).val('');
            });

            // Since we have disable the onchange event, let's trigger one of the existing events
            ActionForm_Update();
        }
        else {
            $('#cboSetModifierAction').val(setModifierAction.Action);
            $('#sm_field').val(setModifierAction.Field);
            $('#cboSelectionOperator').val(setModifierAction.SelectionOperator);
            $('#sm_fieldoperator').val(setModifierAction.FieldOperator);
            $('#sm_value_1').val(setModifierAction.ValuesOrExpression_1);
            $('#sm_value_2').val(setModifierAction.ValuesOrExpression_2);
            $('#sm_otherfield').val(setModifierAction.OtherField);
            $('#sm_indirectfield').val(setModifierAction.IndirectField);

            ActionForm_BindByAction(setModifierAction);
            ActionForm_Bind_BySelectionOperator(setModifierAction);
        }

    }  // (ActionForm_Bind)

    //Todo: Document this
    // Bind the ActionForm
    window.ActionForm_Update = function () {

        var o = new SetModifierAction();
        o = Action_ByForm();
        ActionForm_BindByAction(o);

        _bindActionFormPreview(o);

    }  // (ActionForm_Update)

    // Update the Preview of the Action Form (semantic meaning)
    window.ActionForm_UpdatePreview = function () {

        var o = new SetModifierAction();
        o = Action_ByForm();
        _bindActionFormPreview(o);
    }  // (ActionForm_UpdatePreview)


    //Todo: This encapsulation is SHIT!!!
    //Todo: Is this still used?
    // Internal function
    window._bindActionFormPreview = function (setModifierAction) {
        // Bind the description
        $('#spanActionPreviewDescription').html(setModifierAction.GetDescription());

    } // (_bindActionFormPreview)


    //Todo: Layouting and description
    // Bind the ActionForm dialog by the "predefined action"
    //Todo: old bindActionFormForAction
    window.ActionForm_BindByAction = function (setModifierAction) {

        ActionForm_HideAllUIObjects();

        //Todo: Cleanup (delete the deleted ones ....)
        switch (setModifierAction.Action) {
            case "set_remove":
                $('#div_sm_field').show();
                break;
            case "set_select_additionally":
            case "set_modify_by_value":
                $('#divActionForm_Condition').show();
                $('#div_sm_field').css('display', 'inline-block');
                $('#div_sm_fieldoperator').css('display', 'inline-block');
                $('#div_sm_fieldoperator_in').css('display', 'inline-block');
                $('#div_sm_selectionoperator').css('display', 'inline-block');
                $('#div_sm_value_1').css('display', 'inline-block');

                $('.lblValueExpression').text('Value(s)');
                $('#tipValue_1').show();
                $('#tipValue_2').show();
                break;
            case "set_modify_by_expression":
                $('#divActionForm_Condition').show();
                $('#div_sm_field').css('display', 'inline-block');
                $('#div_sm_fieldoperator').css('display', 'inline-block');
                $('#div_sm_fieldoperator_in').css('display', 'inline-block');
                $('#div_sm_selectionoperator').css('display', 'inline-block');
                $('#div_sm_value_1').css('display', 'inline-block');
                $('.lblValueExpression').text('Expression(s)');
                $('#tipExpression_1').show();
                $('#tipExpression_2').show();
                break;
            case "set_pindirect":
            case "set_eindirect":
                $('#divActionForm_Condition').show();
                $('#div_sm_field').css('display', 'inline-block');
                $('#div_sm_fieldoperator').css('display', 'inline-block');
                $('#div_sm_fieldoperator_in').css('display', 'inline-block');
                $('#div_sm_otherfield').css('display', 'inline-block');
                $('#div_sm_selectionoperator').css('display', 'inline-block');
                $('#div_sm_value_1').css('display', 'inline-block');
                $('.lblValueExpression').text('Value(s)');
                $('#tipValue_1').show();
                $('#tipValue_2').show();
                $('#div_sm_indirectfield').css('display', 'inline-block');
                break;
            case "set_pindirect_exp":
            case "set_eindirect_exp":
                $('#divActionForm_Condition').show();
                $('#div_sm_field').css('display', 'inline-block');
                $('#div_sm_fieldoperator').css('display', 'inline-block');
                $('#div_sm_fieldoperator_in').css('display', 'inline-block');
                $('#div_sm_otherfield').css('display', 'inline-block');
                $('#div_sm_selectionoperator').css('display', 'inline-block');
                $('#div_sm_value_1').css('display', 'inline-block');
                $('.lblValueExpression').text('Expression(s)');
                $('#tipExpression_1').show();
                $('#tipExpression_2').show();
                $('#div_sm_indirectfield').css('display', 'inline-block');


                break;
            default:
                break;
        } //(switch setModifierAction.Action)

        ActionForm_Bind_BySelectionOperator(setModifierAction);


    }  // (ActionForm_BindByAction)

    //Todo: Description
    //Todo: Format Description
    window.ActionForm_HideAllUIObjects = function () {

        $('#div_sm_field').hide();

        $('#div_sm_field').hide();

        // Container !!!
        $('#divActionForm_Condition').hide();
        $('#div_sm_selectionoperator').hide();
        $('#div_sm_otherfield').hide();

        $('#div_sm_fieldoperator').hide();
        $('#div_sm_fieldoperator_in').hide();


        $('#div_sm_value_1').hide();
        $('#div_sm_value_2').hide();
        $('#div_sm_value_and').hide();

        // Dependent QTips
        $('#tipValue_1').hide();
        $('#tipValue_2').hide();
        $('#tipExpression_1').hide();
        $('#tipExpression_2').hide();

        // Indirect Field
        $('#div_sm_indirectfield').hide();


    }  // (ActionForm_HideAllUIObjects)


    // #################################################################
    // Examples
    // #################################################################
    window.loadEx = function (name) {
        $('#divExampleContent').load(name + '?rnd=' + randomNumber() + ' #divExampleContainer', function () {
            $('#divExampleContent a.lnkOpen').button();

            // this is perfect place to render the displaying of odd and even rows
            $('#divExampleContainer .examplePage_Details div').removeClass('example_odd example_even'); //First remove all classes
            // Then add them
            $('#divExampleContainer .examplePage_Details:even div').addClass('example_even');
            $('#divExampleContainer .examplePage_Details:odd div').addClass('example_odd');

        });

        


    } // (loadEx)



