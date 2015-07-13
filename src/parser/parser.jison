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

aggr_type_list      ("Sum"|"Min"|"Max"|"Only"|"Mode"|"FirstSortedValue")

%%

\s+                  /* skip whitespace */
{aggr_type_list}     return 'aggr_type';
/*[a-zA-Z0-9]+         return 'STR'*/
"{"                  return 'curly_open';
"}"                  return 'curly_close';
"("                  return 'par_open';
")"                  return 'par_close';
\w+                  return "field_expression";
<<EOF>>              return "EOF";
/lex


%start start
%% /* language grammar */

start
    :  definition EOF
        {return $1;}
    ;

definition
    : aggr_type par_open field_expression par_close
     {return $1;}
    ;