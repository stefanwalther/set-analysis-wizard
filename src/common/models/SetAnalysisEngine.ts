import {bracketize, multiplyString} from "../utils";
import {ISetModifier} from "../interfaces";
import {ISetAnalysisDefinitionProps} from "../../features/wizard/interfaces/ISetAnalysisDefinitionProps";
import {SetModifier} from "./SetModifier";

export class SetAnalysisEngine implements ISetAnalysisDefinitionProps {
  SetIdentifier: string = "$";
  SetIdentifierDesc?: string;
  AggregationType: string = "";
  AggregationTypeDesc?: string;
  FieldExpression: string = "";
  Bookmark: string = "";
  PersonalComment?: string;
  Expression: string = "";
  PureDescription?: string;

  SetModifiers: ISetModifier[] = [];

  // constructor();
  constructor(props?: ISetAnalysisDefinitionProps) {
    if (typeof props !== 'undefined') {
      Object.assign(this, props);
    }
  }

  public Calculate = () => {
    this.Expression = this.getSaExpression();
    this.PureDescription = this.getDescription();
  }

  public Init = (props: ISetAnalysisDefinitionProps) => {
    Object.assign(this, props);
  }

  public getSaExpression = (): string => {

    // {aggr_type}({{set_expression}}{field_expression})
    // sum({{set_expression}}{field_expression})
    let templ = this.getBaseTemplate();

    // First set the aggregation type
    // (sum, count, etc.)
    templ = templ.replace("{aggr_type}", this.AggregationType);

    // Build the set expression
    templ = templ.replace("{set_expression}", this.getSetExpression());

    // Set the field or expression
    templ = templ.replace("{field_expression}", bracketize(this.FieldExpression));

    return templ;
  }

  public getSetIdentifierDescription = () => {
    switch (this.SetIdentifier) {
      case "bookmark":
      case "$+bookmark":
      case "$*bookmark":
      case "$-bookmark":
        return this.SetIdentifierDesc?.replace("{0}", this.Bookmark);
      default:
        return this.SetIdentifierDesc;
    }
  }

  public getDescription = () => {

    // Constants
    const cSepMain = "// ---------------------------------------------------------------------\n";    // Main Separator
    const cComment = "// ";                                                                           // Comment
    const cLB = "\n";                                                                                 // Line Break
    const cMarkerEndMain = "";                                                                        // Marker for the main set

    let descriptionFinal = this.initPureDescription();
    descriptionFinal = descriptionFinal.replace(/{cSepMain}/g, cSepMain);
    descriptionFinal = descriptionFinal.replace(/{cComment}/g, cComment);
    descriptionFinal = descriptionFinal.replace(/{cLB}/g, cLB);
    descriptionFinal = descriptionFinal.replace(/{cMarkerEndMain}/g, cMarkerEndMain);

    return descriptionFinal;

  }

  public initPureDescription = () => {

    let desc = '';

    // sep
    desc += "{cSepMain}";

    // 1st line
    desc += '{cComment}Calculate the ';
    desc += this.AggregationTypeDesc + ' of "';
    //Todo: distinguish between a field an expressions
    desc += this.FieldExpression + '"{cLB}';

    desc += '{cComment}based on ' + this.getSetIdentifierDescription() + '{cLB}';
    desc += '{cMarkerEndMain}';

    if (Array.isArray(this.SetModifiers) && this.SetModifiers.length > 0) {

      // 2nd line
      desc += '{cComment}~~{cLB}';
      desc += '{cComment}but before calculating{cLB}';

      // 3rd line
      let sm_d = []; //temporary array for building the string
      for (let i = 0; i < this.SetModifiers.length; i++) {
        sm_d.push('{cComment}' + multiplyString(' ', 5) + '- ' + this.SetModifiers[i] /* getDescription() */);
      }
      desc += sm_d.join('{cLB}');

      desc += '{cLB}';
    }

    // Personal Comment
    if (this.PersonalComment !== null && this.PersonalComment !== 'undefined' && this.PersonalComment !== '' && typeof this.PersonalComment !== 'undefined') {

      desc += "{cComment}~~~~{cLB}";
      desc += '{cComment}Personal comment:{cLB}';
      //Todo: fix this,  /g does not work??
      desc += '{cComment}' + multiplyString(' ', 4) + this.PersonalComment.replace(/\n/g, '\n//     ') + '{cLB}';
    }


    // Todo(2022): needs to changed ...
    // desc += "{cComment}~~~~{cLB}";
    // if (saveOnServer) {
    //   desc += "{cComment}Reopen or share this result by using the following Url:{cLB}";
    //   desc += "{cComment}http://tools.qlikblog.at/SetAnalysisWizard/?sa={cLB}";
    // }
    // else {
    // }

    // Todo(2022): add something else here ...
    //desc += "{cComment}Created by http://tools.qlikblog.at/SetAnalysisWizard/ {cLB}";

    // sep-end
    desc += "{cSepMain}";

    this.PureDescription = desc;

    return desc;

  }


  /// private methods

  // Return the base template for the set analysis expression
  private getBaseTemplate = (): string => {

    // sum({set}field)
    return "{aggr_type}({{set_expression}}{field_expression})";

  }

  // Return the Set identifier from combo box
  // (1 | $ | $N |$_N | bookmark_id | bookmark_name)
  private getSetIdentifier = (): string => {

    // Deal with the special case of bookmarks
    // In any other case just return the set identifier ...
    switch (this.SetIdentifier) {
      case "bookmark":
        return this.Bookmark;
      case "$*bookmark":
        return "$*" + this.Bookmark;
      case "$-bookmark":
        return "$-" + this.Bookmark;
      case "$+bookmark":
        return "$+" + this.Bookmark;
      default:
        return this.SetIdentifier;
    }
  }

  // This is the main function to build the set expression
  private getSetExpression = () => {
    let val = "";

    const sa_templ = "{set_identifier}<{set_modifier}>";
    val = sa_templ.replace("{set_identifier}", this.getSetIdentifier());
    let sm = this.getSetModifier();
    val = val.replace("{set_modifier}", sm);
    if (sm.length === 0) {
      val = val.replace('<>', '');
    }
    return val;
  }

  // Return a string representing all Set Modifiers for the SA expression
  private getSetModifier = () => {

    let retVal = "";
    if (typeof this.SetModifiers !== 'undefined' && this.SetModifiers !== null && this.SetModifiers.length > 0) {

      let sm = [];
      for (let i = 0; i < this.SetModifiers.length; i++) {
        let smExpression = new SetModifier(this.SetModifiers[i]);
        sm.push(smExpression.getModifier());
      }
      retVal = sm.join(',');
    }
    return retVal;
  }

}
