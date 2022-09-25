import {_} from 'lodash';
export class Helpers {

	constructor () {
	}

	/**
	 * Returns a list of aggregation types available.
	 * @returns {Array}
	 * @constructor
	 */
	get AggregationTypes () {
		let items = [];
		this.AggregationTypeGroups.forEach( group => {
			group.items.forEach( item => {
				items.push( item );
			})
		});
		return items;
	}

	get AggregationTypeGroups () {

		return [{
			"name": "Basic Aggregation Functions",
			"items": [
				"Sum",
				"Min",
				"Max",
				"Only",
				"Mode",
				"FirstSortedValue"
			]
		},
			{
				"name": "String Aggregation Functions",
				"items": [
					"MinString",
					"MaxString",
					"Concat"
				]
			},
			{
				"name": "Counter Aggregation Functions",
				"items": [
					"Count",
					"NumericCount",
					"TextCount",
					"NullCount",
					"MissingCount"
				]
			},
			{
				"name": "Statistical Aggregation Functions",
				"items": [
					"Avg",
					"stdev",
					"median",
					"fractile",
					"skew",
					"kurtosis",
					"correl",
					"sterr",
					"steyx",
					"linest_m",
					"linest_b",
					"linest_r2",
					"linest_sem",
					"linest_seb",
					"linest_sey",
					"linest_df",
					"linest_f",
					"linest_ssreg",
					"linest_ssresid"
				]
			},
			{
				"name": "Financial Aggregation Functions",
				"items": [
					"irr",
					"xirr",
					"npv",
					"xnpv"
				]
			},
			{
				"name": "Statistical Test Functions",
				"items": [
					"chi2test_p",
					"chi2test_df",
					"chi2test_chi2",
					"TTest_t",
					"TTest_df",
					"TTest_sig",
					"TTest_dif",
					"TTest_sterr",
					"TTest_conf",
					"TTest_lower",
					"TTest_upper",
					"TTestw_t",
					"TTestw_df",
					"TTestw_sig",
					"TTestw_dif",
					"TTestw_sterr",
					"TTestw_conf",
					"TTestw_lower",
					"TTestw_upper",
					"TTest1_t",
					"TTest1_df",
					"TTest1_sig",
					"TTest1_dif",
					"TTest1_sterr",
					"TTest1_conf",
					"TTest1_lower",
					"TTest1_upper",
					"TTest1w_t",
					"TTest1w_df",
					"TTest1w_sig",
					"TTest1w_dif",
					"TTest1w_sterr",
					"TTest1w_conf",
					"TTest1w_lower",
					"TTest1w_upper",
					"ZTest_z",
					"ZTest_sig",
					"ZTest_dif",
					"ZTest_sterr",
					"ZTest_conf",
					"ZTestw_z",
					"ZTestw_sig",
					"ZTestw_dif",
					"ZTestw_sterr",
					"ZTestw_conf"
				]
			}]
	}
}