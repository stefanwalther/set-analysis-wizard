import { SetAnalysisDefinition } from "../model/SetAnalysisDefinition";

describe( 'Set Analysis Definition', () => {

	let saDef;
	beforeEach( (  ) => {
		saDef = new SetAnalysisDefinition();
	} );

	it( 'is an object', (  ) => {
		expect( SetAnalysisDefinition ).to.be.an.object;
	} );
	it( 'has helper AggregationTypes of type array', ( ) => {

		expect( saDef.Helpers.AggregationTypes ).to.be.an.array;

	} );

	describe( 'has defaults', () => {

		let saDef = new SetAnalysisDefinition();

		beforeEach( ( ) => {
			saDef = new	SetAnalysisDefinition();

		} );

		it( 'for the set_identifier', function (  ) {
			expect( saDef.SetIdentifier ).to.equal( '$' );
		} );
		it( 'for the aggr_type', function (  ) {
			expect( saDef.AggregationType).to.equal( 'Sum' );
		} );
		it( 'for the set_operator', function (  ) {
			expect( saDef.SetOperator ).to.equal( '+' );
		} );
	} );

	describe( 'Aggregation Type', () => {

		it( 'Can be any type of predefined aggregation types', (  ) => {

			saDef.Helpers.AggregationTypes.forEach( item => {
				saDef.AggregationType = item;
				expect( saDef.AggregationType ).to.equal( item );
			});

		} );

	} );

} );