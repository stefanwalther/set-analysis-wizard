/*
http://stackoverflow.com/questions/24397160/jison-google-like-parser
http://stackoverflow.com/questions/27056486/error-handling-in-jison
http://stackoverflow.com/questions/26899381/jison-getting-parsed-token-instead-of-what-is-defined-in-grammar
*/

/*
 * definition ::= aggr_type ( set_expression field_expression )
 *
 * From the documentation
 * set_expression ::= { set_entity { set_operator set_entity } }
 * set_entity ::= set_identifier [ set_modifier ]
 * set_identifier ::= 1 | $ | $N | $_N | bookmark_id | bookmark_name
 * set_operator ::= + | - | * | /
 * set_modifier ::= < field_selection {, field_selection } >
 * field_selection ::= field_name [ = | += | ¬–= | *= | /= ] element_set_expression
 * element_set_expression ::= element_set { set_operator element_set }
 * element_set ::= [ field_name ] | { element_list } | element_function
 * element_list ::= element { , element }
 * element_function ::= ( P | E ) ( [ set_expression ] [ field_name ] )
 * element ::= field_value | " search_mask "
 */

/* lexical grammar */
%lex
%options flex case-insensitive

aggr_type_list                  ("Sum"|"Min"|"Max"|"Only"|"Mode"|"FirstSortedValue")
set_identifier_list             ("1"|"$"|"$N"|"$_N")
set_operatora                   ("+"|"-"|"*"|"/")
field_selection_operators       ("="|"+="|"-="|"*="|"/=")

%%

\s+                             /* skip whitespace */
{aggr_type_list}                return 'aggr_type';
{set_identifier_list}           return 'set_identifier';
{set_operators}                 return 'set_operator';
{field_selection_operators}     return 'field_selection_operator';
\w+                             return "field_expression";
"{"                             return 'curly_open';
"}"                             return 'curly_close';
"("                             return 'par_open';
")"                             return 'par_close';
"<"                             return 'anglebr_open';
">"                             return 'anglebr_close';
/*[a-zA-Z0-9]+                    return 'function_expression'*/
<<EOF>>                         return "EOF";
/lex


%start start
%% /* language grammar */

start
    :  definition EOF
        {return $1;}
    ;

definition
    // Sum(Sales)
    : aggr_type par_open field_expression par_close
        {$$ = $1 + $2 + $3 + $4;}
    // Sum({..}Sales)
    | aggr_type par_open set_expression field_expression par_close
        {$$ = $1 + $2 + $3 + $4 + $5;}
    ;

set_expression
    // {..}
    : curly_open set_entity curly_close
        { $$ = '{' + $2 + '}';}
    ;

set_entity
    //{$} or {1} or ...
    : set_identifier
        { $$ =  $1; }
    //{$..} or {1..} or ...
    | set_identifier set_modifier
        { $$ = $1 + $2; }
    ;

// set_modifier ::= < field_selection {, field_selection } >
set_modifier
    : anglebr_open anglebr_close
        { $$ = '<>'; }
    // <..>
    | anglebr_open field_selection anglebr_close
        { $$ = '<' + $2 + '>'; }
    ;

//  field_selection ::= field_name [ = | += | ¬–= | *= | /= ] element_set_expression
field_selection
    : field_expression
        { $$ = $1; }
    | field_expression field_selection_operator element_set_expression
        { $$ = $1 + $2 + $3; }
    ;

// element_set_expression ::= element_set { set_operator element_set }
element_set_expression
    : field_expression
        { $$ = $1; }
    ;

// element_set ::= [ field_name ] | { element_list } | element_function
element_set
    : ''
    { $$ = $1; }
    ;

field_name
    : ''
    { $$ = $1; }
    ;

field_value
    : ''
    { $$ = $1; }
    ;

search_mask
    : ''
    { $$ = $1; }
    ;

// element_list ::= element { , element }
element_list
    : ''
    { $$ = $1; }
    ;

// element_function ::= ( P | E ) ( [ set_expression ] [ field_name ] )
element_function
    : ''
    { $$ = $1; }
    ;

// element ::= field_value | " search_mask "
element
    : ''
    { $$ = $1; }
    ;










