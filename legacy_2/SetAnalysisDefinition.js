import {Helpers} from './Helpers';

/**
 * SetAnalysisDefinition holds the definition of a Set Analysis Expression, broken down into parts as described in the official documentation.
 *
 * @description:
 *
 * Overall definition (added for the Set Analysis Wizard):
 * definition ::= aggr_type ( set_expression field_expression )
 *
 * From the documentation
 * set_expression ::= { set_entity { set_operator set_entity } }
 * set_entity ::= set_identifier [ set_modifier ]
 * set_identifier ::= 1 | $ | $N | $_N | bookmark_id | bookmark_name
 * set_operator ::= + | - | * | /
 * set_modifier ::= < field_selection {, field_selection } >
 * field_selection ::= field_name [ = | += | ¬–= | *= | /= ] element_set_expression
 * element_set_expression ::= element_set { set_operator element_set }
 * element_set ::= [ field_name ] | { element_list } | element_function
 * element_list ::= element { , element }
 * element_function ::= ( P | E ) ( [ set_expression ] [ field_name ] )
 * element ::= field_value | " search_mask "
 *
 * @see http://help.qlik.com/sense/2.0/en-US/online/Subsystems/Hub/Content/ChartFunctions/SetAnalysis/syntax-for-sets.htm
 *
 *
 */
export class SetAnalysisDefinition {
	constructor () {
		this.aggr_type = 'Sum';				// Aggregation Type, one of Aggregation types
		this.set_identifier = '$';         	// SetIdentifier
		this.set_operator = '+';			// SetOperator

		this.SetIdentifierDesc = null;      // Description for the Set Identifier
		this.AggregationType = 'Sum';        // AggregationType (just a property bag)
		this.AggregationTypeDesc = null;    // AggregationType Description (just a property bag)
		this.FieldExpression = null;        // FieldExpression
		this.Bookmark = null;               // Id or name of the bookmark
		this.PersonalComment = null;        // PersonalComment
		this.SetModifierActions = [];		// Collection of SetModifier actions
	}

	_getBaseDefinition () {
		return "{%aggr_type%}( {{%set_expression%}} {%field_expression%})";
	}

	get Helpers() {
		return new Helpers();
	}

	/**
	 * Returns the full result of the Set Analysis Expression definition.
	 * @returns {*} Returns the Set Analysis Expression definition
	 * @constructor
	 */
	getResult () {
		return this._build();
	}
	parseExpression() {

	}

	get AggregationType () {
		return this.aggr_type;
	}

	set AggregationType ( value ) {
		if ( this.Helpers.AggregationTypes.indexOf( value ) > -1 ) {
			this.aggr_type = value;
		} else {
			console.error('Invalid aggreation type ', value);
			//throw new Error( 'Invalid aggregation type, please use one of the predefined list' );
		}
	}

	/**
	 * Returns the current set_identifier, defaults to '$'.
	 * @returns {*}
	 * @constructor
	 */
	get SetIdentifier () {
		return this.set_identifier;
	}

	set SetIdentifier ( value ) {
		if ( value ) {
			this.set_identifier = value;
		}
	}

	get SetOperator () {
		return this.set_operator;
	}

	set SetOperator ( value ) {
		if ( value ) {
			this.set_operator = value;
		}
	}

	// ****************************************************************************************
	// Main internal methods
	// ****************************************************************************************
	_build() {
		let e = this._getBaseDefinition();
		e = e.replace(/{%aggr_type%}/g, this.AggregationType);
		e = e.replace(/{%set_expression%}/g, this._build_SetExpression());
		e = e.replace(/{%field_expression%}/g, this.FieldExpression);
		return e;
	}

	_build_SetExpression() {
		return '';
	}





}


