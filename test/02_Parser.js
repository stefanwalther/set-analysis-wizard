import { Parser } from 'jison';
import fs from 'fs';
import _ from 'lodash';

let grammar = fs.readFileSync( './src/parser/parser.jison', 'utf8' );
let expressions = fs.readFileSync( './test/fixtures/expressions.txt', 'utf8' ).split( '\n' );
expressions = expressions.filter( function ( line ) {
	return !_.startsWith( line, 'x' );
} );
let parser = new Parser( grammar );
let parserSource = parser.generate();

describe.only( 'Parser', () => {

	it( 'has generated a source', function () {
		expect( parserSource ).to.be.an.object;
	} );

	describe( 'parses ...', () => {

		expressions.forEach( item => {
			if ( item && !_.isEmpty( item ) ) {
				it( item, function () {
					item = _.trimRight( item, '\r' );
					var r = parser.parse( item );
					expect( r ).to.equal( item );
				} );
			}
		} );
	} );

} );

