import { Parser } from 'jison';
import fs from 'fs';

let grammar = fs.readFileSync( './src/parser/parser.jison', "utf8" );
let parser = new Parser( grammar );
let parserSource = parser.generate();

describe.only( 'Parser', () => {


	it( 'has generated a source', function ( ) {
		expect( parserSource ).to.be.an.object;
	} );

	describe( 'parses ...', () => {

		it( 'SUM(Sales)', function ( ) {
			var r = parser.parse('SUM(Sales)');
			expect( r ).to.equal( 'SUM' );
		} );
		it( 'Sum(Sales)', function ( ) {
			var r = parser.parse('Sum(Sales)');
			expect( r ).to.equal( 'Sum' );
		} );

	} );



} );