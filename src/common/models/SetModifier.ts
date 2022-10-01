import {bracketize, nullOrEmpty} from "../utils";
import {qualifyElement} from "../set-analysis-utils";

// Todo: add a ctor to make it easier to work with this class
export class SetModifier {

  public Action: string = '';                 // Action
  public Field: string = '';                  // Field
  public OtherField: string = '';             // Other field (indirect SA)
  public FieldOperator = '=';                 // FieldOperator
  public ValuesOrExpression_1: string = '';   // ValuesOrExpression Nr1
  public ValuesOrExpression_2: string = '';   // ValuesOrExpression Nr2
  public SelectionOperator: string = '';      // SelectionOperator
  public IndirectField: string = '';          // Indirect Field for Indirect Set Selections
  public TechnicalModifier: string = '';      // The expression for the set modifier

  // Todo: FieldOperator should be an enum
  // -----------------------------------------------------------------
  // getFieldOperatorDescription()
  // ~~
  // Note: does only work, if `FieldOperator` has already been set
  // -----------------------------------------------------------------
  getFieldOperatorDescription() {
    switch (this.FieldOperator) {
      case "=":
        return "Select records";
      case "+=":
        return "Additionally select records";
      case "-=":
        return "Exclude records";
      case "*=":
        return "Positively intersect with values";
      case "/=":
        return "Negatively intersect with values";
      default:
        return "Not defined";
    }
  }

  // Todo: Action should be an enum
  // -----------------------------------------------------------------
  // getModifier
  // ~~
  // Get the technical modifier
  // -----------------------------------------------------------------
  getModifier() {
    let indirectField: string = '';
    let technicalModifier: string = '';
    switch (this.Action) {
      case "set_remove": // OK; done
        technicalModifier = bracketize(this.Field) + "=";
        break;
      case "set_modify_by_value":
        technicalModifier = bracketize(this.Field) + this.FieldOperator + "{" + this.getFieldOperation() + "}";
        break;
      case "set_modify_by_expression":
        technicalModifier = bracketize(this.Field) + this.FieldOperator + "{" + this.getFieldOperation(true) + "}";
        break;
      case "set_pindirect":
        //Customer = P({1<ProductCategory={'Beverages'}>} Customer)
        indirectField = (nullOrEmpty(this.IndirectField) ? this.Field : this.IndirectField); //Use the target field as default
        technicalModifier = bracketize(this.Field) + this.FieldOperator + "P({1<" + bracketize(this.OtherField) + "={" + this.getFieldOperation(false) + "}>}" + bracketize(indirectField) + ")";
        break;
      case "set_eindirect":
        // same as set_pindirect but with E instead of P
        indirectField = (nullOrEmpty(this.IndirectField) ? this.Field : this.IndirectField); //Use the target field as default
        technicalModifier = bracketize(this.Field) + this.FieldOperator + "E({1<" + bracketize(this.OtherField) + "={" + this.getFieldOperation(false) + "}>}" + bracketize(indirectField) + ")";
        break;
      case "set_pindirect_exp":
        indirectField = (nullOrEmpty(this.IndirectField) ? this.Field : this.IndirectField); //Use the target field as default
        technicalModifier = bracketize(this.Field) + this.FieldOperator + "P({1<" + bracketize(this.OtherField) + "={" + this.getFieldOperation(true) + "}>}" + bracketize(indirectField) + ")";
        break;
      case "set_eindirect_exp":
        indirectField = (nullOrEmpty(this.IndirectField) ? this.Field : this.IndirectField); //Use the target field as default
        technicalModifier = bracketize(this.Field) + this.FieldOperator + "E({1<" + bracketize(this.OtherField) + "={" + this.getFieldOperation(true) + "}>}" + bracketize(indirectField) + ")";
        break;
      default:
        technicalModifier = '';
        break;
    } // (switch (Action)
    debugger;
    this.TechnicalModifier = technicalModifier;
    return technicalModifier;
  }

  // Todo: Selection Operator should be an enum
  getFieldOperation(isExp: boolean = false) {

    // Can be made easier ... just define mask1 and mask2 ... :)
    switch (this.SelectionOperator) {
      case "equal_to":
        return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "$(={0})") : qualifyElement(this.ValuesOrExpression_1)
      case "greater_than":
        //">$(=max(Year))"
        //">2000"
        return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "\">$(={0})\"") : qualifyElement(this.ValuesOrExpression_1, "\">{0}\"",true);
      case "less_than":
        //"<$(=max(Year))"
        //"<2000"
        return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "\"<$(={0})\"") : qualifyElement(this.ValuesOrExpression_1, "\"<{0}\"", true);
      case "greater_than_or_equal":
        //">=$(=max(Year))"
        //">=2000"
        return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "\">=$(={0})\"") : qualifyElement(this.ValuesOrExpression_1, "\">={0}\"", true);
      case "less_than_or_equal":
        //"<=$(=max(Year))"
        //"<=2000"return "\"<=" + this.ValuesOrExpression_1 + "\"";
        return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "\"<=$(={0})\"") : qualifyElement(this.ValuesOrExpression_1, "\"<={0}\"", true);
      case "contains":
        return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "\"*$(={0})*\"") : qualifyElement(this.ValuesOrExpression_1, "\"*{0}*\"", true)
      case "startswith":
        return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "\"$(={0})*\"") : qualifyElement(this.ValuesOrExpression_1, "\"{0}*\"", true)
      case "endswith":
        return (isExp) ? qualifyElement(this.ValuesOrExpression_1, "\"*$(={0})\"") : qualifyElement(this.ValuesOrExpression_1, "\"*{0}\"", true)
      case "between_gt_lt":
        //">2000<2010"
        //">$(=min(Year))<$(=max(Year))
        //Todo: should we allow multiple values?
        return (isExp) ? "\">$(=" + this.ValuesOrExpression_1 + ")<$(=" + this.ValuesOrExpression_2 + ")\"" : "\">" + this.ValuesOrExpression_1 + "<" + this.ValuesOrExpression_2 + "\"";
      case "between_gt=_lt=":
        return (isExp) ? "\">=$(=" + this.ValuesOrExpression_1 + ")<=$(=" + this.ValuesOrExpression_2 + ")\"" : "\">=" + this.ValuesOrExpression_1 + "<=" + this.ValuesOrExpression_2 + "\"";
      case "between_gt_lt=":
        return (isExp) ? "\">$(=" + this.ValuesOrExpression_1 + ")<=$(=" + this.ValuesOrExpression_2 + ")\"" : "\">" + this.ValuesOrExpression_1 + "<=" + this.ValuesOrExpression_2 + "\"";
      case "between_gt=_lt":
        return (isExp) ? "\">=$(=" + this.ValuesOrExpression_1 + ")<$(=" + this.ValuesOrExpression_2 + ")\"" : "\">=" + this.ValuesOrExpression_1 + "<" + this.ValuesOrExpression_2 + "\"";
    }
  }

  getSelectionOperatorDesc() {
    switch (this.SelectionOperator) {
      case "equal_to":
        return "equal to \"{val1}\"";
      case "greater_than":
        return "greater than \"{val1}\"";
      case "less_than":
        return "less than \"{val1}\"";
      case "greater_than_or_equal":
        return "greater than or equal \"{val1}\"";
      case "less_than_or_equal":
        return "less than or equal \"{val1}\"";
      case "contains":
        return "which contain the value \"{val1}\"";
      case "startswith":
        return "starting with \"{val1}\"";
      case "endswith":
        return "ending with  \"{val1}\"";
      case "between_gt_lt":
        return "greater than \"{val1}\" and less than \"{val2}\"";
      case "between_gt=_lt=":
        return "greater or equal \"{val1}\" and less or equal \"{val2}\"";
      case "between_gt_lt=":
        return "greater than \"{val1}\" and less or equal \"{val2}\"";
      case "between_gt=_lt":
        return "greater or equal \"{val1}\" and less than \"{val2}\"";
      default:
        return "unknown";
    }
  }

  // Todo: Action should be an enum
  // -----------------------------------------------------------------
  // getDescription
  // -----------------------------------------------------------------
  getDescription(): string {

    let indirectField = (nullOrEmpty(this.IndirectField) ? this.Field : this.IndirectField);
    //return this.GetFieldOperatorDescription() + ' the value' + ((this.HasMultipleValues()) ? 's ' : ' ') + "\"" + this.ValuesOrExpression_1 + '\" in field \"' + this.Field + "\"";
    switch (this.Action) {
      case "set_remove": //OK, done
        return "Remove selection in field \"" + this.Field + "\"";
      case "set_modify_by_value": //OK; done
        return this.getFieldOperatorDescription() + ` ` + this.getSelectionOperatorDesc().replace("{val1}", this.ValuesOrExpression_1).replace("{val2}", this.ValuesOrExpression_2) + " in field \"" + this.Field + '"';
      case "set_modify_by_expression": //OK; done
        return this.getFieldOperatorDescription() + ` in field "` + this.Field + "\" matching the condition: [" + this.getSelectionOperatorDesc().replace("{val1}", this.ValuesOrExpression_1).replace("{val2}", this.ValuesOrExpression_2) + "]";
      case "set_pindirect": //OK; done
        return 'Select records in "' + this.Field + '" based on the indirect selections in "' + indirectField + '" for those records ' + this.getSelectionOperatorDesc().replace("{val1}", this.ValuesOrExpression_1).replace("{val2}", this.ValuesOrExpression_2) + ' in field "' + this.OtherField + '"';
      case "set_eindirect":
        return 'Select records in "' + this.Field + '" based on the INVERSE indirect selections in "' + indirectField + '" for those records ' + this.getSelectionOperatorDesc().replace("{val1}", this.ValuesOrExpression_1).replace("{val2}", this.ValuesOrExpression_2) + ' in field "' + this.OtherField + '"';
      case "set_pindirect_exp":
        return 'Select records in "' + this.Field + '" but only for those records matching the condition [' + this.getSelectionOperatorDesc().replace("{val1}", this.ValuesOrExpression_1).replace("{val2}", this.ValuesOrExpression_2) + '] in field "' + this.OtherField + '"';
      case "set_eindirect_exp":
        return 'Select records in "' + this.Field + '" but only for those records NOT matching the condition [' + this.getSelectionOperatorDesc().replace("{val1}", this.ValuesOrExpression_1).replace("{val2}", this.ValuesOrExpression_2) + '] in field "' + this.OtherField + '"';
      default:
        return '';
    }
  }

}
