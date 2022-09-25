SyntaxHighlighter.brushes.QlikViewScript = function()
{
	var functions_interrecord = 'exists fieldindex fieldvalue peek previous lookup ';
	var function_aggregation = 'sum min max only mode aggr minstring maxstring firstvalue lastvalue firstsortedvalue concat count numericcount textcount nullcount missingcount ';
	//statistical aggregation function not complete
	var function_statistical_aggregation = 'avg fractile';
	//financial aggregation functions missing
	//statistical test functions missing
	var conditional_functions = 'if match class alt mixmatch wildmatch5 pick wildmatch';
	var counter_function = 'recno() rowno() iterno() autonumber autonumberhash128 autonumberhash256 fieldvaluecount';
	var datetime_functions = 	'addmonths inquartertodate age inquarter quartername inweek quarterend converttolocaltime inlunarweektodate quarterstart day lastworkdate setdateyearmonth dayend' +
								'localtime second daystart lunarweekend setdateyear dayname linarweekstart daylightsaving lunarweekname today daynumberofyear timezone daynumberofquarter ' +
								'firstworkdate gmt maketime utc makeweekdate hour minute week month weekend makedate weekstart inday monthsend weekday indaytotime monthsstart weekname ' +
								'inmonths monthsname weekyear inweektodate monthstart inmonth monthend yearend inyeartodate monthname yearstart inmonthtodate yearname inmonthstodate inlunarweek now' +
								'year inyear networkdays';
	//missing: distribution functions
	//missing: exponential and logarithmic functions
	var file_functions =		'attribute connectstring filedir fileextension filename filepath filesize filetime getfolderpath qvdcreatetime qvdnoofrecords qvdnooffields qvdfieldname qvdtablename';
	//missing: financial functions
	var formatting_functions =	'num money date time timestamp interval dual';
	var general_numeric_functions = 'bitcount ceil combin div even fabs fact floor fmod frac mod numavg numcount nummax nummin numsum odd permut round sign';
	var interpretation_functions = 'num# money# date# time# timestamp# interval# text';
	var logical_functions = 	'isnum istext ispartialreload';
	//missing: mapping functions
	//missing: mathematical constants
	var null_functions =		'null null() isnull';
	//missing: range functionos
	var string_functions =		'capitalize chr evaluate findoneof index keepchar left len lower ltrim mid ord purgechar repeat replace right rtrim subfield textbetween trim upper hash128 substringcount applycodepage';
	var system_functions =		'osuser qvuser computername reloadtime sqlvalue getcurrentfield getcurrentselections getfieldselections getselectedcount getpossiblecount ' +
								'getexcludedcount getregistrystring qlikviewversion input msgbox getactivesheet documentname documentpath documenttitle';
	var table_functions =		'fieldname fieldnumber nooffields noofrows nooftables';
	//missing: trigonometric and hyperbolic functions
	

	var keywords =	'add as alias binary buffer bundle call concatenate connect crosstable directory disconnnect do loop ' +
					'drop field fields table execute exit script first for next for each force generic hierarchy hierarchybelongsto  ' +
					'if then elseif else end image_size info inner inputfield intervalmatch join keep let load  ' +
					'loosen mapping map using noconcatenate nullasvalue nullasnull outer qualify rem rename replace sample ' +
					'select semantic set sleep sql sqlcolumns sqltables sqltypes star store sub switch case default trace unless unmap unqualify when ';
	var keywordsspecial = 'SECTION ACCESS APPLICATION';
	var keywords_added = 'FROM SQL SELECT RESIDENT ORDER BY WHERE';
				

	this.regexList = [
		{ regex: SyntaxHighlighter.regexLib.singleLineCComments,	css: 'comments' },			// one line comments
		{ regex: SyntaxHighlighter.regexLib.multiLineCComments,		css: 'comments' },			// multiline comments
		{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },			// single quoted strings
		{ regex: /\s*#.*/gm,										css: 'preprocessor' },		// preprocessor tags like #region and #endregion
		{ regex: new RegExp(this.getKeywords(keywords), 'gmi'),		css: 'keyword' },			// keywords
		{ regex: new RegExp(this.getKeywords(keywords_added), 'gmi'),		css: 'keyword' },			// keywords
		{ regex: new RegExp(this.getKeywords(keywordsspecial), 'gm'),		css: 'keyword' },			// keywords (section access, case sensitive)
		{ regex: new RegExp(this.getKeywords(functions_interrecord), 'gmi'),	css: 'functions' },			// functions
		{ regex: new RegExp(this.getKeywords(function_aggregation), 'gmi'),	css: 'functions' },			// functions
		{ regex: new RegExp(this.getKeywords(function_statistical_aggregation), 'gmi'),	css: 'functions' },			// functions
		{ regex: new RegExp(this.getKeywords(conditional_functions), 'gmi'),	css: 'functions' },			// functions
		{ regex: new RegExp(this.getKeywords(counter_function), 'gmi'),	css: 'functions' },			// functions
		{ regex: new RegExp(this.getKeywords(datetime_functions), 'gmi'),	css: 'functions' },			// functions
		{ regex: new RegExp(this.getKeywords(file_functions), 'gmi'),	css: 'functions' },			// functions
		{ regex: new RegExp(this.getKeywords(formatting_functions), 'gmi'),	css: 'functions' },			// functions
		{ regex: new RegExp(this.getKeywords(general_numeric_functions), 'gmi'),	css: 'functions' },			// functions
		{ regex: new RegExp(this.getKeywords(interpretation_functions), 'gmi'),	css: 'functions' },			// functions
		{ regex: new RegExp(this.getKeywords(logical_functions), 'gmi'),	css: 'functions' },			// functions
		{ regex: new RegExp(this.getKeywords(null_functions), 'gmi'),	css: 'functions' },			// functions
		{ regex: new RegExp(this.getKeywords(string_functions), 'gmi'),	css: 'functions' },			// functions
		{ regex: new RegExp(this.getKeywords(system_functions), 'gmi'),	css: 'functions' },			// functions
		{ regex: new RegExp(this.getKeywords(table_functions), 'gmi'),	css: 'functions' }			// functions
		];
	
	this.forHtmlScript(SyntaxHighlighter.regexLib.scriptScriptTags);
};

SyntaxHighlighter.brushes.QlikViewScript.prototype	= new SyntaxHighlighter.Highlighter();
SyntaxHighlighter.brushes.QlikViewScript.aliases	= ['qvscript', 'qvs', 'qvls', 'qvl'];