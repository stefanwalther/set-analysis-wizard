import { SetAnalysisDefinition } from "../model/SetAnalysisDefinition";

describe( 'Basic Expression Tester', () => {

	let saDef;
	beforeEach( ( ) => {
		saDef = new SetAnalysisDefinition();
	} );

	it( 'Sum({$}Sales)', function ( ) {
		saDef.AggregationType = 'Sum';
		saDef.FieldExpression = 'Sales';
		expect(saDef.getResult()).to.be.equal('Sum({}Sales)');
	} );
	it( 'Max({$}Sales)', function ( ) {
		saDef.AggregationType = 'Max';
		saDef.FieldExpression = 'Sales';
		expect(saDef.getResult()).to.be.equal('Max({}Sales)');
	} );

} );