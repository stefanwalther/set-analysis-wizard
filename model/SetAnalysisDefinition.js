
class SetAnalysisDefinition {
	constructor() {
		this.SetIdentifier = '$';           // SetIdentifier
		this.SetIdentifierDesc = null;      // Description for the Set Identifier
		this.AggregationType = null;        // AggregationType (just a property bag)
		this.AggregationTypeDesc = null;    // AggregationType Description (just a property bag)
		this.FieldExpression = null;        // FieldExpression
		this.Bookmark = null;               // Id or name of the bookmark
		this.PersonalComment = null;        // PersonalComment
		this.Expression = null;             // Final expression
		this.QlikViewVersion = 100000;      // QlikView compatibility mode used ...
		this.PureDescription = "";        	// Pure Description
		this.SetModifierActions = [];		// Collection of SetModifier actions


	}
}
