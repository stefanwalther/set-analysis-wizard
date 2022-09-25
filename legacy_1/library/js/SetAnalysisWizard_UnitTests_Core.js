$(document).ready(function () {

    // Global variables for testing
    var aggrTypes = new Array("Sum", "Minimum", "Maximum", "Count", "Only", "MissingCount", "Avg", "Mode", "FirstSortedValue");
    var fieldOperators = new Array("=", "+=", "-=", "*=", "/=");
    var selectionOperators = new Array("equal_to", "greater_than", "less_than", "greater_than_or_equal", "less_than_or_equal", "contains", "startswith", "endswith", "between_gt_lt", "between_gt=_lt", "between_gt=_lt=", "between_gt_lt=");



    module("Set Analysis Definition - Core");

    test("SetIdentifier", function () {

        expect(20);

        var sad = new SetAnalysisDefinition();
        sad.AggregationType = "Sum";
        sad.FieldExpression = "Sales";

        // current selection
        sad.SetIdentifier = "$";
        sad.Calculate();
        equals(sad.Expression, "Sum({$}Sales)");

        // all values
        sad.SetIdentifier = "1";
        sad.Calculate();
        equals(sad.Expression, "Sum({1}Sales)");

        // everything that the current selection excludes
        sad.SetIdentifier = "1-$";
        sad.Calculate();
        equals(sad.Expression, "Sum({1-$}Sales)");

        // previous selection
        sad.SetIdentifier = "$1";
        sad.Calculate();
        equals(sad.Expression, "Sum({$1}Sales)");

        // next selection
        sad.SetIdentifier = "$_1";
        sad.Calculate();
        equals(sad.Expression, "Sum({$_1}Sales)");

        // 2nd next selection
        sad.SetIdentifier = "$_2";
        sad.Calculate();
        equals(sad.Expression, "Sum({$_2}Sales)");

        // 3rd next selection
        sad.SetIdentifier = "$_3";
        sad.Calculate();
        equals(sad.Expression, "Sum({$_3}Sales)");

        // 2nd previous selection
        sad.SetIdentifier = "$2";
        sad.Calculate();
        equals(sad.Expression, "Sum({$2}Sales)");

        // 3rd previous selection
        sad.SetIdentifier = "$3";
        sad.Calculate();
        equals(sad.Expression, "Sum({$3}Sales)");

        // bookmark - document bookmark
        sad.SetIdentifier = "bookmark";
        sad.Bookmark = "BM01"
        sad.Calculate();
        equals(sad.Expression, "Sum({BM01}Sales)");

        // bookmark - server bookmark
        sad.SetIdentifier = "bookmark";
        sad.Bookmark = "Server\\BM01"
        sad.Calculate();
        equals(sad.Expression, "Sum({Server\\BM01}Sales)");

        for (i = 0; i < aggrTypes.length; i++) {
            sad.AggregationType = aggrTypes[i];
            sad.SetIdentifier = "$";
            sad.Calculate();
            equals(sad.Expression, aggrTypes[i] + "({$}Sales)");
        }

    }); // (SetIdentifier)

    test("Simple SetModifierActions", function () {

        expect(7);

        // Local Init, no Test
        var sad = new SetAnalysisDefinition();
        var sm = new SetModifierAction();

        // Default Values
        sad.AggregationType = "Sum";
        sad.FieldExpression = "Sales";
        sad.SetIdentifier = "$";


        // Test: Remove
        sm.Action = "set_remove";
        sm.Field = "RemoveField";

        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;

        sad.Calculate();
        equals(sad.Expression, "Sum({$<RemoveField=>}Sales)");


        // Test: Select explicitely
        sm.Action = "set_modify_by_value";
        sm.Field = "TargetField";
        sm.FieldOperator = "=";
        sm.SelectionOperator = "equal_to";
        sm.ValuesOrExpression_1 = 100;
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, "Sum({$<TargetField={100}>}Sales)");

        // Test the different field operators
        for (i = 0; i < fieldOperators.length; i++) {
            sm.FieldOperator = fieldOperators[i];

            sad.SetModifierActions = new Array(1);
            sad.SetModifierActions[0] = sm;
            sad.Calculate();
            var resultMask = "Sum({$<TargetField{0}{100}>}Sales)";
            equals(sad.Expression, resultMask.replace("{0}", fieldOperators[i]));
        }


    });


    test("Test SelectionOperators modified by value directly", function () {

        expect(26);

        // Local Init, no Test
        var sad = new SetAnalysisDefinition();
        var sm = new SetModifierAction();
        var result = null;

        // Default Values
        sad.AggregationType = "Sum";
        sad.FieldExpression = "Sales";
        sad.SetIdentifier = "$";
        sm.Action = "set_modify_by_value";
        sm.Field = "TargetField";
        sm.FieldOperator = "=";


        // Test simple Integer field
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "equal_to";
        sm.ValuesOrExpression_1 = 100;
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, "Sum({$<TargetField={100}>}Sales)");

        // Test simple text expression
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "equal_to";
        sm.ValuesOrExpression_1 = 'Beverages';
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, "Sum({$<TargetField={'Beverages'}>}Sales)");

        // Test simple list of delimited integers
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "equal_to";
        sm.ValuesOrExpression_1 = '100,200,300';
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, "Sum({$<TargetField={100,200,300}>}Sales)");

        // Test simple list of delimited strings
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "equal_to";
        sm.ValuesOrExpression_1 = 'A,B,C';
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, "Sum({$<TargetField={'A','B','C'}>}Sales)");

        // Test simple list 2 of delimited strings
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "equal_to";
        sm.ValuesOrExpression_1 = 'ABC, BDCD , CD,DAX XAD';
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, "Sum({$<TargetField={'ABC','BDCD','CD','DAX XAD'}>}Sales)");


        // SelectionOperator Test: greater_than with multiple int
        result = "Sum({$<TargetField={\">100\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "greater_than";
        sm.ValuesOrExpression_1 = '100';
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);



        // SelectionOperator Test: less_than
        result = "Sum({$<TargetField={\"<100\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "less_than";
        sm.ValuesOrExpression_1 = 100;
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // SelectionOperator Test: greater_than_or_equal
        result = "Sum({$<TargetField={\">=100\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "greater_than_or_equal";
        sm.ValuesOrExpression_1 = 100;
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);


        // SelectionOperator Test: less_than_or_equal
        result = "Sum({$<TargetField={\"<=100\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "less_than_or_equal";
        sm.ValuesOrExpression_1 = 100;
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);


        // SelectionOperator Test: contains with int
        result = "Sum({$<TargetField={\"*100*\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "contains";
        sm.ValuesOrExpression_1 = 100;
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // SelectionOperator Test: contains with multiple int
        result = "Sum({$<TargetField={\"*199*\",\"*200*\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "contains";
        sm.ValuesOrExpression_1 = "199,200";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // SelectionOperator Test: contains with string
        result = "Sum({$<TargetField={\"*thern*\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "contains";
        sm.ValuesOrExpression_1 = "thern";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // SelectionOperator Test: contains with MULTIPLE string
        result = "Sum({$<TargetField={\"*thern*\",\"*tern*\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "contains";
        sm.ValuesOrExpression_1 = "thern,tern";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);


        // SelectionOperator Test: startswith with int
        result = "Sum({$<TargetField={\"100*\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "startswith";
        sm.ValuesOrExpression_1 = 100;
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // SelectionOperator Test: startswith with MULTIPLE int
        result = "Sum({$<TargetField={\"198*\",\"201*\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "startswith";
        sm.ValuesOrExpression_1 = "198,201";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // SelectionOperator Test: startswith with string
        result = "Sum({$<TargetField={\"Beverages*\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "startswith";
        sm.ValuesOrExpression_1 = "Beverages";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // SelectionOperator Test: startswith with MULTIPLE string
        result = "Sum({$<TargetField={\"Bev*\",\"Cool*\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "startswith";
        sm.ValuesOrExpression_1 = "Bev,Cool";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);


        // SelectionOperator Test: endswith with int
        result = "Sum({$<TargetField={\"*100\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "endswith";
        sm.ValuesOrExpression_1 = 100;
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // SelectionOperator Test: endswith with multiple int
        result = "Sum({$<TargetField={\"*1\",\"*2\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "endswith";
        sm.ValuesOrExpression_1 = "1,2";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // SelectionOperator Test: endswith with string
        result = "Sum({$<TargetField={\"*Southern\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "endswith";
        sm.ValuesOrExpression_1 = "Southern";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // SelectionOperator Test: endswith with multiple string
        result = "Sum({$<TargetField={\"*thern\",\"*tern\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "endswith";
        sm.ValuesOrExpression_1 = "thern,tern";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // SelectionOperator Test: endwith with multiple values
        result = "Sum({$<TargetField={\"*A\",\"*B\",\"*C\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "endswith";
        sm.ValuesOrExpression_1 = "A,B,C";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // SelectionOperator Test: between_gt_lt
        result = "Sum({$<TargetField={\">100<200\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "between_gt_lt";
        sm.ValuesOrExpression_1 = 100;
        sm.ValuesOrExpression_2 = 200;
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // SelectionOperator Test: between_gt=_lt
        result = "Sum({$<TargetField={\">=100<200\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "between_gt=_lt";
        sm.ValuesOrExpression_1 = 100;
        sm.ValuesOrExpression_2 = 200;
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // SelectionOperator Test: between_gt_lt=
        result = "Sum({$<TargetField={\">100<=200\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "between_gt_lt=";
        sm.ValuesOrExpression_1 = 100;
        sm.ValuesOrExpression_2 = 200;
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // SelectionOperator Test: between_gt=_lt=
        result = "Sum({$<TargetField={\">=100<=200\"}>}Sales)";
        sm.Action = "set_modify_by_value";
        sm.SelectionOperator = "between_gt=_lt=";
        sm.ValuesOrExpression_1 = 100;
        sm.ValuesOrExpression_2 = 200;
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);


    }); // (Test SelectionOperators modified by value directly)

    test("Test SelectionOperators modified by expression", function () {

        expect(12);

        // Local Init, no Test
        var sad = new SetAnalysisDefinition();
        var sm = new SetModifierAction();
        var result = null;

        // Default Values
        sad.AggregationType = "Sum";
        sad.FieldExpression = "Sales";
        sad.SetIdentifier = "$";

        // Simple Expression - equal to
        result = "Sum({$<Year={$(=Max(Year))}>}Sales)";
        sm.Action = "set_modify_by_expression";
        sm.Field = "Year";
        sm.FieldOperator = "=";
        sm.ValuesOrExpression_1 = "Max(Year)";
        sm.SelectionOperator = "equal_to";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // Simple Expression - greater_than
        result = "Sum({$<Year={\">$(=Max(Year))\"}>}Sales)";
        sm.Action = "set_modify_by_expression";
        sm.Field = "Year";
        sm.FieldOperator = "=";
        sm.ValuesOrExpression_1 = "Max(Year)";
        sm.SelectionOperator = "greater_than";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);


        // Simple Expression - less_than
        result = "Sum({$<Year={\"<$(=Max(Year))\"}>}Sales)";
        sm.Action = "set_modify_by_expression";
        sm.Field = "Year";
        sm.FieldOperator = "=";
        sm.ValuesOrExpression_1 = "Max(Year)";
        sm.SelectionOperator = "less_than";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);


        // Simple Expression - greater_than_or_equal
        result = "Sum({$<Year={\">=$(=Max(Year))\"}>}Sales)";
        sm.Action = "set_modify_by_expression";
        sm.Field = "Year";
        sm.FieldOperator = "=";
        sm.ValuesOrExpression_1 = "Max(Year)";
        sm.SelectionOperator = "greater_than_or_equal";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);


        // Simple Expression - less_than_or_equal
        result = "Sum({$<Year={\"<=$(=Max(Year))\"}>}Sales)";
        sm.Action = "set_modify_by_expression";
        sm.Field = "Year";
        sm.FieldOperator = "=";
        sm.ValuesOrExpression_1 = "Max(Year)";
        sm.SelectionOperator = "less_than_or_equal";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);


        // Simple Expression - contains
        result = "Sum({$<Year={\"*$(=Max(Year))*\"}>}Sales)";
        sm.Action = "set_modify_by_expression";
        sm.Field = "Year";
        sm.FieldOperator = "=";
        sm.ValuesOrExpression_1 = "Max(Year)";
        sm.SelectionOperator = "contains";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);


        // Simple Expression - startswith
        result = "Sum({$<Year={\"$(=Max(Year))*\"}>}Sales)";
        sm.Action = "set_modify_by_expression";
        sm.Field = "Year";
        sm.FieldOperator = "=";
        sm.ValuesOrExpression_1 = "Max(Year)";
        sm.SelectionOperator = "startswith";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);


        // Simple Expression - endswith
        result = "Sum({$<Year={\"*$(=Max(Year))\"}>}Sales)";
        sm.Action = "set_modify_by_expression";
        sm.Field = "Year";
        sm.FieldOperator = "=";
        sm.ValuesOrExpression_1 = "Max(Year)";
        sm.SelectionOperator = "endswith";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);


        // Simple Expression - between_gt_lt
        result = "Sum({$<Year={\">$(=Min(Year))<$(=Max(Year))\"}>}Sales)";
        sm.Action = "set_modify_by_expression";
        sm.Field = "Year";
        sm.FieldOperator = "=";
        sm.ValuesOrExpression_1 = "Min(Year)";
        sm.ValuesOrExpression_2 = "Max(Year)";
        sm.SelectionOperator = "between_gt_lt";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // Simple Expression - between_gt=_lt
        result = "Sum({$<Year={\">=$(=Min(Year))<$(=Max(Year))\"}>}Sales)";
        sm.Action = "set_modify_by_expression";
        sm.Field = "Year";
        sm.FieldOperator = "=";
        sm.ValuesOrExpression_1 = "Min(Year)";
        sm.ValuesOrExpression_2 = "Max(Year)";
        sm.SelectionOperator = "between_gt=_lt";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // Simple Expression - between_gt=_lt
        result = "Sum({$<Year={\">=$(=Min(Year))<=$(=Max(Year))\"}>}Sales)";
        sm.Action = "set_modify_by_expression";
        sm.Field = "Year";
        sm.FieldOperator = "=";
        sm.ValuesOrExpression_1 = "Min(Year)";
        sm.ValuesOrExpression_2 = "Max(Year)";
        sm.SelectionOperator = "between_gt=_lt=";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

        // Simple Expression - between_gt_lt=
        result = "Sum({$<Year={\">$(=Min(Year))<=$(=Max(Year))\"}>}Sales)";
        sm.Action = "set_modify_by_expression";
        sm.Field = "Year";
        sm.FieldOperator = "=";
        sm.ValuesOrExpression_1 = "Min(Year)";
        sm.ValuesOrExpression_2 = "Max(Year)";
        sm.SelectionOperator = "between_gt_lt=";
        sad.SetModifierActions = new Array(1);
        sad.SetModifierActions[0] = sm;
        sad.Calculate();
        equals(sad.Expression, result);

    });

});

