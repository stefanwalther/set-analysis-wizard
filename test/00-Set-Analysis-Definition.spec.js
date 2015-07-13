import { SetAnalysisDefinition } from "../model/SetAnalysisDefinition";

describe( 'Set Analysis Definition', () => {
	it( 'is an object', (  ) => {
		expect( SetAnalysisDefinition ).to.be.an.object;
	} );

	describe( 'has defaults', () => {

		let saDef = new SetAnalysisDefinition();

		beforeEach( ( ) => {
			saDef = new	SetAnalysisDefinition();
		} );

		it( 'for the set_identifier', function (  ) {
			expect( saDef.SetIdentifier ).to.equal( '$' );
		} );
		it( 'for the set_operator', function (  ) {
			expect( saDef.SetOperator ).to.equal( '+' );
		} );
	} );

} );