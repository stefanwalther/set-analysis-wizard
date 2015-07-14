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

		it( 'SUM(bar)', function ( ) {
			var r = parser.parse('SUM(bar)');
			expect( r ).to.equal( 'SUM(bar)' );
		} );
		it( 'Sum(bar)', function ( ) {
			var r = parser.parse('Sum(bar)');
			expect( r ).to.equal( 'Sum(bar)' );
		} );
		it( 'Sum({$}bar)', function ( ) {
			var r = parser.parse('Sum({$}bar)');
			expect( r ).to.equal( 'Sum({$}bar)' );
		} );
		it( 'Sum({1}bar)', function ( ) {
			var r = parser.parse('Sum({1}bar)');
			expect( r ).to.equal( 'Sum({1}bar)' );
		} );
		it( 'Sum({1<foo>}bar)', function ( ) {
			var r = parser.parse('Sum({1<foo>}bar)');
			expect( r ).to.equal( 'Sum({1<foo>}bar)' );
		} );
		it( 'Sum({1<Year=foo>}bar)', function ( ) {
			var r = parser.parse('Sum({1<Year=foo>}bar)');
			expect( r ).to.equal( 'Sum({1<Year=foo>}bar)' );
		} );


	} );



} );