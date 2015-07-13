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
			expect( r ).to.equal( 'SUM(Sales)' );
		} );
		it( 'Sum(Sales)', function ( ) {
			var r = parser.parse('Sum(Sales)');
			expect( r ).to.equal( 'Sum(Sales)' );
		} );
		it( 'Sum({$}Sales)', function ( ) {
			var r = parser.parse('Sum({$}Sales)');
			expect( r ).to.equal( 'Sum({$}Sales)' );
		} );
		it( 'Sum({1}Sales)', function ( ) {
			var r = parser.parse('Sum({1}Sales)');
			expect( r ).to.equal( 'Sum({1}Sales)' );
		} );
		it( 'Sum({1<bla>}Sales)', function ( ) {
			var r = parser.parse('Sum({1<>}Sales)');
			expect( r ).to.equal( 'Sum({1<>}Sales)' );
		} );


	} );



} );