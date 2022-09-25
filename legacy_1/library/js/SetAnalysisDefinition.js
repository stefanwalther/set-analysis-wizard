function SetAnalysisDefinition() {

    // Public Properties
    this.SetIdentifier = '$';           // SetIdentifier
    this.SetIdentifierDesc = null;      // Description for the Set Identifier
    this.AggregationType = null;        // AggregationType (just a property bag)
    this.AggregationTypeDesc = null;    // AggregationType Description (just a property bag)
    this.FieldExpression = null;        // FieldExpression
    this.Bookmark = null;               // Id or name of the bookmark
    this.PersonalComment = null;        // PersonalComment
    this.Expression = null;             // Final expression
    this.QlikViewVersion = 100000;      // QlikView compatibility mode used ...
    this.PureDescription = "";        // Pure Description

    this.Version = window.assemblyVersion;           // Version of the application (based on the assembly)

    // Child class ...
    this.SetModifierActions = null;     // Array of SetModifierAction

    // #################################################################
    // Public Methods
    // #################################################################

    //Todo: Comment this
    this.Calculate = function () {
        this.Expression = this.GetSAExpression();
    }   // (Calculate)

    // Initialize the simple values
    this.Init = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                this[key] = obj[key];
            }
        }
    } // (Init)

    this.InitDeep = function (obj) {
        this.Init(obj);
        if (obj.SetModifierActions != null && obj.SetModifierActions.length > 0) {
            var sm_Array = new Array();
            for (var i = 0; i < obj.SetModifierActions.length; i++) {
                var sm = new SetModifierAction();
                sm.InitFromJson(obj.SetModifierActions[i]);
                sm_Array.push(sm);
            }
            this.SetModifierActions = sm_Array;
        }
    }

    // Return only the expression
    //Todo: Old: SADefinition_GetSAExpression
    this.GetSAExpression = function () {

        // {aggr_type}({{set_expression}}{field_expression})
        // sum({{set_expression}}{field_expression})
        var templ = this.getBaseTemplate();

        // First set the aggregation type
        // (sum, count, etc.)
        templ = templ.replace("{aggr_type}", this.AggregationType);

        // Build the set expression
        templ = templ.replace("{set_expression}", this.getSetExpression());

        // Set the field or expression
        templ = templ.replace("{field_expression}", bracketize(this.FieldExpression));

        return templ;

    } // (GetSAExpression)


    this.GetSetIdentifierDescription = function () {

        switch (this.SetIdentifier) {
            case "bookmark":
            case "$+bookmark":
            case "$*bookmark":
            case "$-bookmark":
                return this.SetIdentifierDesc.replace("{0}", this.Bookmark);
                break;
            default:
                return this.SetIdentifierDesc;
                break;
        }

    }

    // Get the description for the SA
    // Change this for working based on an object
    //Todo:Comment
    //Todo:Format comment
    //Todo: Old: SADefinition_GetDescription
    
    
    this.GetDescription = function (saveOnServer) {

        // Constants
        var cSepMain = "// ---------------------------------------------------------------------\n";    // Main Separator
        var cComment = "// ";                                                                           // Comment
        var cLB = "\n";                                                                                 // Line Break
        var cMarkerEndMain = "";                                                                        // Marker for the main set

        var descriptionFinal = this.InitPureDescription(saveOnServer);
        descriptionFinal = descriptionFinal.replace(/{cSepMain}/g, cSepMain);
        descriptionFinal = descriptionFinal.replace(/{cComment}/g, cComment);
        descriptionFinal = descriptionFinal.replace(/{cLB}/g, cLB);
        descriptionFinal = descriptionFinal.replace(/{cMarkerEndMain}/g, cMarkerEndMain);

        return descriptionFinal;

    }   // (GetDescription)

    this.InitPureDescription = function (saveOnServer) {

        if (saveOnServer == null || saveOnServer == 'undefined') {
            saveOnServer = false;
        }

        var desc = '';

        // sep
        desc += "{cSepMain}";

        // 1st line
        desc += '{cComment}Calculate the ';
        desc += this.AggregationTypeDesc + ' of \"';
        //Todo: distinguish between a field an expressions
        desc += this.FieldExpression + '\"{cLB}';

        desc += '{cComment}based on ' + this.GetSetIdentifierDescription() + '{cLB}';
        desc += '{cMarkerEndMain}';

        if ($.isArray(this.SetModifierActions) && this.SetModifierActions.length > 0) {

            // 2nd line
            desc += '{cComment}~~{cLB}';
            desc += '{cComment}but before calculating{cLB}';

            // 3rd line
            var sm_d = new Array(); //temporary array for building the string
            for (var i = 0; i < this.SetModifierActions.length; i++) {
                sm_d.push('{cComment}' + multiplyString(' ', 5) + '- ' + this.SetModifierActions[i].GetDescription());
            }
            desc += sm_d.join('{cLB}');

            desc += '{cLB}';
        }

        // Personal Comment
        if (this.PersonalComment != null && this.PersonalComment != 'undefined' && this.PersonalComment != '') {

            desc += "{cComment}~~~~{cLB}";
            desc += '{cComment}Personal comment:{cLB}';
            //Todo: fix this,  /g does not work??
            desc += '{cComment}' + multiplyString(' ', 4) + this.PersonalComment.replace(/\n/g, '\n//     ') + '{cLB}';
        }


        desc += "{cComment}~~~~{cLB}";
        if (saveOnServer) {
            desc += "{cComment}Reopen or share this result by using the following Url:{cLB}";
            desc += "{cComment}http://tools.qlikblog.at/SetAnalysisWizard/?sa=" + $StorageKey + "{cLB}";
        }
        else {
            desc += "{cComment}Created by http://tools.qlikblog.at/SetAnalysisWizard/ {cLB}";
        }


        // sep-end
        desc += "{cSepMain}";

        this.PureDescription = desc;

        return desc;


    }     // (InitPureDescription)

    // #################################################################
    // Private Methods
    // #################################################################

    // Return the base template for the set analysis expression
    this.getBaseTemplate = function () {

        // sum({set}field)
        var templ = "{aggr_type}({{set_expression}}{field_expression})"
        return templ;

    } // (getBaseTemplate)


    // Return the Set identifier from combo box 
    // (1 | $ | $N |$_N | bookmark_id | bookmark_name)
    this.getSetIdentifier = function () {

        // Deal with the special case of bookmarks
        // In any other case just return the set identifier ...
        switch (this.SetIdentifier) {
            case "bookmark":
                return this.Bookmark;
                break;
            case "$*bookmark":
                return "$*" + this.Bookmark;
                break;
            case "$-bookmark":
                return "$-" + this.Bookmark;
                break;
            case "$+bookmark":
                return "$+" + this.Bookmark;
                break;
            default:
                return this.SetIdentifier;
                break;

        }
    }           // (getSetIdentifier)



    // This is the main function to build the set expression
    this.getSetExpression = function () {
        var val = "";

        var sa_templ = "{set_identifier}<{set_modifier}>";
        val = sa_templ.replace("{set_identifier}", this.getSetIdentifier());
        sm = this.getSetModifier();
        val = val.replace("{set_modifier}", sm);
        if (sm.length == 0) {
            val = val.replace('<>', '');
        }
        return val;

    } // (getSetExpression)

    // Return a string representing all Set Modifiers for the SA expression
    this.getSetModifier = function () {

        var r = ""; // return value
        if (this.SetModifierActions != null && this.SetModifierActions.length > 0) {

            var sm = new Array();
            for (var i = 0; i < this.SetModifierActions.length; i++) {
                sm.push(this.SetModifierActions[i].GetModifier());
            }
            r = sm.join(',');
        }
        return r;
    }  // (getSetModifier)

   

} //(SetAnalysisDefinition)




