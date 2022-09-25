//Todo: Some documentation would be really nice :)
// Object definition for SetModifier
// (which is used in array of SetModifiers)
function SetModifierAction() {

    this.Action = null;                 // Action
    this.Field = null;                  // Field
    this.OtherField = null;             // Other field (indirect SA)
    this.FieldOperator = '=';           // FieldOperator
    this.ValuesOrExpression_1 = null;   // ValuesOrExpression Nr1
    this.ValuesOrExpression_2 = null;   // ValuesOrExpression Nr2
    this.SelectionOperator = null;      // SelectionOperator
    this.IndirectField = null;          // Indirect Field for Indirect Set Selections
    this.TechnicalModifier = null;  // The expression for the set modifier

    // -----------------------------------------------------------------
    // Initialization
    // -----------------------------------------------------------------

    // Initialize values from simple object
    this.Init = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                this[key] = obj[key];
            }
        }
    } // (Init)

    // Initialize object from Json object
    this.InitFromJson = function (oJson) {
        for (var key in oJson) {
            if (oJson.hasOwnProperty(key)) {
                this[key] = oJson[key];
            }
        }
    } // (InitFromJson)

   

    // -----------------------------------------------------------------
    // HasMultipleValues()
    // ~~
    // Check if ValueOrExpression contains multiple values
    // -----------------------------------------------------------------
    //Todo: Still used?
    this.HasMultipleValues = function () {
        //Todo: implement a trim (if necessary) ...
        var a = this.ValuesOrExpression_1.split(',');
        if ($.isArray(a)) {
            if (a.length > 1) {
                return true;
            }
        }
        return false;
    } // (HasMultipleValues)



    // -----------------------------------------------------------------
    // GetFieldOperatorDescription()
    // ~~
    // Note: does only work, if this.FieldOperator has already been set
    // -----------------------------------------------------------------
    this.GetFieldOperatorDescription = function () {
        switch (this.FieldOperator) {
            case "=":
                return "Select records";
                break;
            case "+=":
                return "Additionally select records";
                break;
            case "-=":
                return "Exclude records";
                break;
            case "*=":
                return "Positively intersect with values";
                break;
            case "/=":
                return "Negatively intersect with values";
                break;
            default:
                return "Not defined";
                break;
        }
    } // (GetFieldOperatorDescription)

    // -----------------------------------------------------------------
    // GetModifier
    // ~~
    // Get the technical modifier
    // -----------------------------------------------------------------
    this.GetModifier = function () {
        var indirectField;
        var technicalModifier;
        switch (this.Action) {
            case "set_remove": // OK; done
                technicalModifier = bracketize(this.Field) + "=";
                break;
            case "set_modify_by_value":
                technicalModifier = bracketize(this.Field) + this.FieldOperator + "{" + this.GetFieldOperation() + "}";
                break;
            case "set_modify_by_expression":
                technicalModifier = bracketize(this.Field) + this.FieldOperator + "{" + this.GetFieldOperation(true) + "}";
                break;
            case "set_pindirect":
                //Customer = P({1<ProductCategory={'Beverages'}>} Customer)
                indirectField = (nullOrEmpty(this.IndirectField) ? this.Field : this.IndirectField); //Use the target field as default
                technicalModifier = bracketize(this.Field) + this.FieldOperator + "P({1<" + bracketize(this.OtherField) + "={" + this.GetFieldOperation(false) + "}>}" + bracketize(indirectField) + ")";
                break;
            case "set_eindirect":
                // same as set_pindirect but with E instead of P
                indirectField = (nullOrEmpty(this.IndirectField) ? this.Field : this.IndirectField); //Use the target field as default
                technicalModifier = bracketize(this.Field) + this.FieldOperator + "E({1<" + bracketize(this.OtherField) + "={" + this.GetFieldOperation(false) + "}>}" + bracketize(indirectField) + ")";
                break;
            case "set_pindirect_exp":
                indirectField = (nullOrEmpty(this.IndirectField) ? this.Field : this.IndirectField); //Use the target field as default
                technicalModifier = bracketize(this.Field) + this.FieldOperator + "P({1<" + bracketize(this.OtherField) + "={" + this.GetFieldOperation(true) + "}>}" + bracketize(indirectField) + ")";
                break;
            case "set_eindirect_exp":
                indirectField = (nullOrEmpty(this.IndirectField) ? this.Field : this.IndirectField); //Use the target field as default
                technicalModifier = bracketize(this.Field) + this.FieldOperator + "E({1<" + bracketize(this.OtherField) + "={" + this.GetFieldOperation(true) + "}>}" + bracketize(indirectField) + ")";
                break;
            default:
                technicalModifier = '';
                break;
        } // (switch (Action)
        debugger;
        this.TechnicalModifier = technicalModifier;
        return technicalModifier;
    }     // (GetModifier())

    this.GetFieldOperation = function (isExp) {

        if (isExp == null || isExp == 'undefined') {
            isExp = false;
        }

        // Can be made easier ... just define mask1 and mask2 ... :)
        switch (this.SelectionOperator) {
            case "equal_to":
                return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "$(={0})") : qualifyElement(this.ValuesOrExpression_1);
                break;
            case "greater_than":
                //">$(=max(Year))"
                //">2000"
                return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "\">$(={0})\"") : qualifyElement(this.ValuesOrExpression_1, "\">{0}\"",true);
                break;
            case "less_than":
                //"<$(=max(Year))"
                //"<2000"
                return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "\"<$(={0})\"") : qualifyElement(this.ValuesOrExpression_1, "\"<{0}\"", true);
                break;
            case "greater_than_or_equal":
                //">=$(=max(Year))"
                //">=2000"
                return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "\">=$(={0})\"") : qualifyElement(this.ValuesOrExpression_1, "\">={0}\"", true);
                break;
            case "less_than_or_equal":
                //"<=$(=max(Year))"
                //"<=2000"return "\"<=" + this.ValuesOrExpression_1 + "\"";
                return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "\"<=$(={0})\"") : qualifyElement(this.ValuesOrExpression_1, "\"<={0}\"", true);
                break;
            case "contains":
                return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "\"*$(={0})*\"") : qualifyElement(this.ValuesOrExpression_1, "\"*{0}*\"", true)
                break;
            case "startswith":
                return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "\"$(={0})*\"") : qualifyElement(this.ValuesOrExpression_1, "\"{0}*\"", true)
                break;
            case "endswith":
                return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "\"*$(={0})\"") : qualifyElement(this.ValuesOrExpression_1, "\"*{0}\"", true)
                break;
            case "between_gt_lt":
                //">2000<2010"
                //">$(=min(Year))<$(=max(Year))
                //Todo: should we allow multiple values?
                return (isExp) ? "\">$(=" + this.ValuesOrExpression_1 + ")<$(=" + this.ValuesOrExpression_2 + ")\"" : "\">" + this.ValuesOrExpression_1 + "<" + this.ValuesOrExpression_2 + "\"";
                break;
            case "between_gt=_lt=":
                return (isExp) ? "\">=$(=" + this.ValuesOrExpression_1 + ")<=$(=" + this.ValuesOrExpression_2 + ")\"" : "\">=" + this.ValuesOrExpression_1 + "<=" + this.ValuesOrExpression_2 + "\"";
                break;
            case "between_gt_lt=":
                return (isExp) ? "\">$(=" + this.ValuesOrExpression_1 + ")<=$(=" + this.ValuesOrExpression_2 + ")\"" : "\">" + this.ValuesOrExpression_1 + "<=" + this.ValuesOrExpression_2 + "\"";
                break;
            case "between_gt=_lt":
                return (isExp) ? "\">=$(=" + this.ValuesOrExpression_1 + ")<$(=" + this.ValuesOrExpression_2 + ")\"" : "\">=" + this.ValuesOrExpression_1 + "<" + this.ValuesOrExpression_2 + "\"";
                break;
        }

    } // (GetFieldOperation)


    this.GetSelectionOperatorDesc = function () {
        switch (this.SelectionOperator) {
            case "equal_to":
                return "equal to \"{val1}\"";
                break;
            case "greater_than":
                return "greater than \"{val1}\"";
                break;
            case "less_than":
                return "less than \"{val1}\"";
                break;
            case "greater_than_or_equal":
                return "greater than or equal \"{val1}\"";
                break;
            case "less_than_or_equal":
                return "less than or equal \"{val1}\"";
                break;
            case "contains":
                return "which contain the value \"{val1}\"";
                break;
            case "startswith":
                return "starting with \"{val1}\"";
                break;
            case "endswith":
                return "ending with  \"{val1}\"";
                break;
            case "between_gt_lt":
                return "greater than \"{val1}\" and less than \"{val2}\"";
                break;
            case "between_gt=_lt=":
                return "greater or equal \"{val1}\" and less or equal \"{val2}\"";
                break;
            case "between_gt_lt=":
                return "greater than \"{val1}\" and less or equal \"{val2}\"";
                break;
            case "between_gt=_lt":
                return "greater or equal \"{val1}\" and less than \"{val2}\"";
                break;
            default:
                return "unknown";
                break;
        } // (switch)
    } // (GetSelectionOperatorDesc)

    // -----------------------------------------------------------------
    // GetDescription
    // -----------------------------------------------------------------
    this.GetDescription = function () {

        var indirectField = (nullOrEmpty(this.IndirectField) ? this.Field : this.IndirectField);
        //return this.GetFieldOperatorDescription() + ' the value' + ((this.HasMultipleValues()) ? 's ' : ' ') + "\"" + this.ValuesOrExpression_1 + '\" in field \"' + this.Field + "\"";
        switch (this.Action) {
            case "set_remove": //OK, done
                return "Remove selection in field \"" + this.Field + "\"";
                break;
            case "set_modify_by_value": //OK; done
                return this.GetFieldOperatorDescription() + " " + this.GetSelectionOperatorDesc().replace("{val1}", this.ValuesOrExpression_1).replace("{val2}", this.ValuesOrExpression_2) + " in field \"" + this.Field + "\"";
                break;
            case "set_modify_by_expression": //OK; done
                return this.GetFieldOperatorDescription() + " in field \"" + this.Field + "\" matching the condition: [" + this.GetSelectionOperatorDesc().replace("{val1}", this.ValuesOrExpression_1).replace("{val2}", this.ValuesOrExpression_2) + "]";
                break;
            case "set_pindirect": //OK; done
                return 'Select records in \"' + this.Field + '\" based on the indirect selections in \"' + indirectField + '\" for those records ' + this.GetSelectionOperatorDesc().replace("{val1}", this.ValuesOrExpression_1).replace("{val2}", this.ValuesOrExpression_2) + ' in field \"' + this.OtherField + '\"';
                break;
            case "set_eindirect":
                return 'Select records in \"' + this.Field + '\" based on the INVERSE indirect selections in \"' + indirectField + '\" for those records ' + this.GetSelectionOperatorDesc().replace("{val1}", this.ValuesOrExpression_1).replace("{val2}", this.ValuesOrExpression_2) + ' in field \"' + this.OtherField + '\"';
                break;
            case "set_pindirect_exp":
                return 'Select records in \"' + this.Field + '\" but only for those records matching the condition [' + this.GetSelectionOperatorDesc().replace("{val1}", this.ValuesOrExpression_1).replace("{val2}", this.ValuesOrExpression_2) + '] in field \"' + this.OtherField + '\"';
                break;
            case "set_eindirect_exp":
                return 'Select records in \"' + this.Field + '\" but only for those records NOT matching the condition [' + this.GetSelectionOperatorDesc().replace("{val1}", this.ValuesOrExpression_1).replace("{val2}", this.ValuesOrExpression_2) + '] in field \"' + this.OtherField + '\"';
                break;
            default:
                return null;
                break;
        }
    } // (GetDescription)


} //(SetModifierAction Class )