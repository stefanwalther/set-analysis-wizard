define( [
		'./properties',
		'./initialproperties',
		'./lib/js/extensionUtils',
		'text!./swr-set-analysis-wizard.ng.html',
		'text!./lib/css/style.css'
	],
	function ( props, initProps, extensionUtils, template, cssContent ) {
		'use strict';

		extensionUtils.addStyleToHeader( cssContent );

		return {

			definition: props,
			initialProperties: initProps,
			snapshot: {canTakeSnapshot: false}, //Doesn't really make any sense
			template: template,
			controller: ['$scope', function ( $scope ) {

			}]
		};
	} );
