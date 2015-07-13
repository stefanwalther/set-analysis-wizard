import { Parser } from 'jison';

export class Parser {
	constructor() {
		
	}
	
	parse( expression ) {

		let parser = new Parser(grammar);
		let parserSource = parser.generate();
		return parser.parse(expression);

	}

	// ****************************************************************************************
	// BNF definition
	// ****************************************************************************************

	/**
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
	 * @type {{}}
	 */
	var grammar = {

	}
}