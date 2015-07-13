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

aggr_type_list          ("Sum"|"Min"|"Max"|"Only"|"Mode"|"FirstSortedValue")
set_identifier_list     ("1"|"$"|"$N"|"$_N")
set_operator_list       ("+"|"-"|"*"|"/")
field_selection_list    ("="|"+="|"-="|"*="|"/=")

%%

\s+                     /* skip whitespace */
{aggr_type_list}        return 'aggr_type';
{set_identifier_list}   return 'set_identifier';
{set_operator_list}     return 'set_operator';
{field_selection_list}  return 'field_selection';
\w+                     return "field_expression";
"{"                     return 'curly_open';
"}"                     return 'curly_close';
"("                     return 'par_open';
")"                     return 'par_close';
"<"                     return 'anglebr_open';
">"                     return 'anglebr_close';
[a-zA-Z0-9]+            return 'STR'
<<EOF>>                 return "EOF";
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
        {return $1 + $2 + $3 + $4;}
    // Sum({..}Sales)
    | aggr_type par_open set_expression field_expression par_close
        {return $1 + $2 + $3 + $4 + $5;}
    ;

set_expression
    // {..}
    : curly_open set_identifier curly_close
        { $$ = $1 + $2 + $3;}
    ;

set_entity
    //{$} or {1} or ...
    : set_identifier
        { return $1; }
    //{$..} or {1..} or ...
    | set_identifier set_modifier
        return { $$ = $1 + $2; }
    ;
set_modifier
    // <..>
    : anglebr_open STR anglebr_close
    return { $$ = $1 + $2 + $3; }
    ;
