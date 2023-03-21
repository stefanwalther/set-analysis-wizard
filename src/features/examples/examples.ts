import {IExampleList} from "./interfaces/IExampleList";
import {ActionEnum} from "../set-modifier-form/enums/ActionEnum";


export const exampleGroups: IExampleList[] = [
  {
    sort: 1,
    key: 'main-group-basic',
    level: 1,
    title: 'Basic Examples Without Modifiers',
    navTitle: `Examples Without Modifiers`,
  },
  {
    sort: 1001,
    key: 'basic-simple',
    level: 2,
    title: 'Basic Set Analysis Examples - Simple Expressions',
    navTitle: `Simple Expressions`,
    description: 'The following examples use very simple and basic Set Analysis expressions.',
    items: [
      {
        sort: 1,
        key: '001',
        formattedTitle: '<b>Sum</b> of "Sales" based on the <b>current selection</b>',
        formattedExpression: 'Sum({$}Sales)',
        props: {
          SetIdentifier: "$",
          AggregationType: "Sum",
          FieldExpression: "Sales",
          PersonalComment: "Calculate the sum of \"Sales\" (based on the current selection).",
          Expression: "Sum({$}Sales)",
          SetModifiers: [],
        }
      },
      {
        sort: 2,
        key: '002',
        formattedTitle: `<b>Count</b> values of field "Customer" based on the <b>current selection</b>`,
        formattedExpression: `Count({$}Customer)`,
        props: {
          "SetIdentifier": "$",
          "AggregationType": "Count",
          "FieldExpression": "Customer",
          "Bookmark": "",
          "PersonalComment": "Count values of field \"Customer\" based on the current selection.",
          "Expression": "Count({$}Customer)",
          "SetModifiers": []
        }
      },
      {
        sort: 3,
        key: '003',
        formattedTitle: `Sum</b> of "Sales" based on <b>all values</b>, ignoring any selection.`,
        formattedExpression: `Sum({1}Sales)`,
        props: {
          "SetIdentifier": "1",
          "AggregationType": "Sum",
          "FieldExpression": "Sales",
          "Bookmark": "",
          "PersonalComment": "Sum of \"Sales\" based on all values, ignoring any selection.",
          "Expression": "Sum({1}Sales)",
          "SetModifiers": []
        }
      },
      {
        sort: 4,
        key: '004',
        formattedTitle: `<b>Sum</b> of "Sales" based on the <b>bookmark with the ID</b> "BM01".`,
        formattedExpression: `Sum({BM01}Sales)`,
        props: {
          "SetIdentifier": "",
          "AggregationType": "",
          "FieldExpression": "",
          "Bookmark": "",
          "PersonalComment": "",
          "Expression": "",
          "SetModifiers": []
        }
      },
      {
        sort: 5,
        key: '005',
        formattedTitle: `Calculate the sum of "Sales" for <b>everything that the current selection excludes</b>.`,
        formattedExpression: `Sum({1-$}Sales)`,
        props: {
          "SetIdentifier": "",
          "AggregationType": "",
          "FieldExpression": "",
          "Bookmark": "",
          "PersonalComment": "",
          "Expression": "",
          "SetModifiers": []
        }
      },
      {
        sort: 6,
        key: '006',
        formattedTitle: `Calculate the <b>sum</b> of "Sales" based on the <b>previous selection</b>.`,
        formattedExpression: `Sum({$1}Sales)`,
        props: {
          "SetIdentifier": "",
          "AggregationType": "",
          "FieldExpression": "",
          "Bookmark": "",
          "PersonalComment": "",
          "Expression": "",
          "SetModifiers": []
        }
      },
      {
        sort: 7,
        key: `007`,
        formattedTitle: `Calculate the <b>sum</b> of "Sales" based on the <b>next selection</b>.`,
        formattedExpression: `Sum({$_1}Sales)`,
        props: {
          "SetIdentifier": "",
          "AggregationType": "",
          "FieldExpression": "",
          "Bookmark": "",
          "PersonalComment": "",
          "Expression": "",
          "SetModifiers": []
        }
      },
      {
        sort: 8,
        key: `008`,
        formattedTitle: `Calculate the sum of "Sales" based on the <b>2nd previous selection</b>.`,
        formattedExpression: `Sum({$2}Sales)`,
        props: {
          "SetIdentifier": "",
          "AggregationType": "",
          "FieldExpression": "",
          "Bookmark": "",
          "PersonalComment": "",
          "Expression": "",
          "SetModifiers": []
        }
      },
      {
        sort: 10,
        key: `010`,
        formattedTitle: `Calculate the <b>sum of the expression</b> "ItemsSold*ItemPrice" based on the <b>current
              selection</b>.`,
        formattedExpression: `Sum({$}ItemsSold*ItemPrice)`,
        props: {
          "SetIdentifier": "",
          "AggregationType": "",
          "FieldExpression": "",
          "Bookmark": "",
          "PersonalComment": "",
          "Expression": "",
          "SetModifiers": []
        }
      }
    ]
  },
  {
    sort: 1002,
    key: 'basic-bookmarks',
    level: 2,
    title: `Basic Set Analysis Examples - Using Bookmarks`,
    navTitle: `Using Bookmarks`,
    description: `The following examples use very simple and basic Set Analysis expressions based on bookmarks.`,
    items: [
      {
        sort: 1,
        key: `009`,
        formattedTitle: `Calculate the <b>average</b> of "Sales" based on the <b>server bookmark</b> with the id
              "BM01".`,
        formattedExpression: `Avg({Server\\BM01}Sales)`,
        props: {
          "SetIdentifier": "",
          "AggregationType": "",
          "FieldExpression": "",
          "Bookmark": "",
          "PersonalComment": "",
          "Expression": "",
          "SetModifiers": []
        }
      },
      {
        sort: 2,
        key: `NT6B`,
        formattedTitle: `Calculate the <b>Sum</b> of "Sales" based on the <b>document bookmark</b> with the id
              "BM01".`,
        formattedExpression: `Sum({Document\\BM01}Sales)`,
        props: {
          "SetIdentifier": "",
          "AggregationType": "",
          "FieldExpression": "",
          "Bookmark": "",
          "PersonalComment": "",
          "Expression": "",
          "SetModifiers": []
        }
      },
      {
        sort: 3,
        key: `S4ZS`,
        formattedTitle: `Calculate the sum of sales based on the <b>current selection AND the server-bookmark</b> with the Id "BM01".`,
        formattedExpression: `Sum({$+Server\\BM01}Sales)`,
        props: {
          "SetIdentifier": "",
          "AggregationType": "",
          "FieldExpression": "",
          "Bookmark": "",
          "PersonalComment": "",
          "Expression": "",
          "SetModifiers": []
        }
      },
      {
        sort: 4,
        key: `6ON8`,
        formattedTitle: `Calculate the Sum of "Sales" based on the current selection except those records belonging to the bookmark with the Id 'Server\\BM01'.`,
        formattedExpression: `Sum({$-Server\\BM01}Sales)`,
        props: {
          "SetIdentifier": "",
          "AggregationType": "",
          "FieldExpression": "",
          "Bookmark": "",
          "PersonalComment": "",
          "Expression": "",
          "SetModifiers": []
        }
      }
    ]
  },
  {
    sort: 2,
    key: 'main-group-modifiers',
    level: 1,
    title: 'Simple Modifiers',
    navTitle: `Simple Modifiers`,
    description: ``
  },
  {
    sort: 1,
    key: `ad-hoc-expressions`,
    level: 2,
    title: `Using Ad Hoc Expressions`,
    navTitle: `Ad Hoc Expressions`,
    description: `These examples use <i>Ad Hoc Expressions</i> within a Set Analysis Expressions (<span class="redBold">marked red</span>).`,
    items: [
      {
        sort: 1,
        key: `4E53`,
        formattedTitle: `Sum of Sales based on the current selection, but calculate only Sales in the last/current year.`,
        formattedExpression: `Sum({$&lt;Year={<span class="redBold">$(=max(Year))</span>}&gt;}Sales)`,
        props: {
          "SetIdentifier": "$",
          "AggregationType": "Sum",
          "FieldExpression": "Sales",
          "Bookmark": "",
          "PersonalComment": "Sum of Sales based on the current selection, but calculate only Sales in the last/current year.",
          "Expression": "Sum({$<Year={$(=max(Year))}>}Sales)",
          "SetModifiers": [
            {
              "uid": `aab47968-d1f9-d1a6-b6b7-d277a3b8b3d6`,
              "Action": ActionEnum.set_modify_by_expression,
              "Field": "Year",
              "OtherField": "",
              "FieldOperator": "=",
              "ValuesOrExpression_1": "max(Year)",
              "ValuesOrExpression_2": "",
              "SelectionOperator": "equal_to",
              "IndirectField": "",
              "TechnicalModifier": "",
            }
          ]
        }
      },
      {
        sort: 2,
        key: `OXLC`,
        formattedTitle: `Return Sum of Sales only for the year before the maximum year.`,
        formattedExpression: `Sum({&lt;Year={<span class="redBold">$(=Max(Year)-1)</span>}&gt;}Sales)`,
        props: {
          "SetIdentifier": "$",
          "AggregationType": "Sum",
          "FieldExpression": "Sales",
          "Bookmark": "",
          "PersonalComment": "Return Sum of Sales only for the year before the maximum year.",
          "Expression": `Sum({$<Year={$(=Max(Year)-1)}>}Sales)`,
          "SetModifiers": [
            {
              uid: '6d9525b7-05a6-8882-7562-f5e4772ed855',
              "Action": ActionEnum.set_modify_by_expression,
              "Field": "Year",
              "OtherField": "",
              "FieldOperator": "=",
              "ValuesOrExpression_1": "Max(Year)-1",
              "ValuesOrExpression_2": "",
              "SelectionOperator": "equal_to",
              "IndirectField": "",
              "TechnicalModifier": "",
            }
          ]
        }
      }
    ]
  },
  {
    sort: 2,
    key: `search-expressions`,
    level: 1,
    title: `Using Search Expressions`,
    navTitle: `Search Expressions`,
    description: `The examples below demonstrate the ability of defining search expressions within a Set Analysis expression.`,
    items: [
      {
        sort: 1,
        key: `29C5`,
        formattedTitle: `Sum of Sales based on the current selection, but calculate only Sales for those years <b>before the maximum year.</b><br /><br />(e.g. if the maximum year is 2010, you will only get 2008 and 2009).`,
        formattedExpression: ``, //Todo(examples): figure out how to do this red-formatting ...
        props: {
          "SetIdentifier": "",
          "AggregationType": "",
          "FieldExpression": "",
          "Bookmark": "",
          "PersonalComment": "",
          "Expression": "",
          "SetModifiers": []
        }
      },
      {
        sort: 2,
        key: `DA4H`,
        formattedTitle: `Return the Sum of Sales for all years greater than 2009.`,
        formattedExpression: ``, //Todo(examples): figure out how to do this red-formatting ...
        props: {
          "SetIdentifier": "",
          "AggregationType": "",
          "FieldExpression": "",
          "Bookmark": "",
          "PersonalComment": "",
          "Expression": "",
          "SetModifiers": []
        }
      },
      {
        sort: 3,
        key: `NHFW`,
        formattedTitle: `Calculate the Sum of Sales considering only records in the field Region <b>containing the value</b> "easter", so this will return Sales for "Eastern", "Western" but not for "Northern" and "Southern".`,
        formattedExpression: ``, //Todo(examples): figure out how to do this red-formatting ...
        props: {
          "SetIdentifier": "",
          "AggregationType": "",
          "FieldExpression": "",
          "Bookmark": "",
          "PersonalComment": "",
          "Expression": "",
          "SetModifiers": []
        }
      },
      {
        sort: 4,
        key: `1ZZ2`,
        formattedTitle: `Calculate the Sum of Sales considering only records in the field Region ending with "thern", so this will return Sales for "Northern", "Southern", but not for "Eastern" and "Western".`,
        formattedExpression: ``, //Todo(examples): figure out how to do this red-formatting ...
        props: {
          "SetIdentifier": "",
          "AggregationType": "",
          "FieldExpression": "",
          "Bookmark": "",
          "PersonalComment": "",
          "Expression": "",
          "SetModifiers": []
        }
      }
    ]
  },
  {
    sort: 3,
    key: 'main-group-indirect',
    level: 3,
    title: 'Indirect Set Analysis',
    navTitle: `Indirect Set Analysis`,
    description: ``,
    items: [
      {
        sort: 1,
        key: `OTI1`,
        formattedTitle: `Returns the Sum of Sales for the current selection, but only for those customers that have bought the product "Shoe".`,
        formattedExpression: `Sum({$&lt;Customer=P({1&lt;Product={'Shoe'}&gt;}Customer)&gt;}Sales)`,
        props: {
          "SetIdentifier": "$",
          "SetIdentifierDesc": "the current selection",
          "AggregationType": "Sum",
          "AggregationTypeDesc": "the current selection",
          "FieldExpression": "Sales",
          "Bookmark": "",
          "PersonalComment": "Returns the Sum of Sales for the current selection, but only for those customers that have bought the product \"Shoe\".",
          "Expression": `Sum({$<Customer=P({1<Product={'Shoe'}>}Customer)>}Sales)`,
          "SetModifiers": [
            {
              'uid': '3774be55-3e14-a200-c185-66fe060edcc5',
              "Action": ActionEnum.set_pindirect,
              "Field": "Customer",
              "OtherField": "Product",
              "FieldOperator": "=",
              "ValuesOrExpression_1": "Shoe",
              "ValuesOrExpression_2": "",
              "SelectionOperator": "equal_to",
              "IndirectField": "Customer",
              "TechnicalModifier": "",
            }
          ]
        }
      },
      {
        sort: 2,
        key: `ZYP3`,
        formattedTitle: `Return the Sum of Sales for the current selection, but only for those customers who have ever supplied the product "Shoe".`,
        formattedExpression: ``,
        props: {
          "SetIdentifier": "",
          "AggregationType": "",
          "FieldExpression": "",
          "Bookmark": "",
          "PersonalComment": "",
          "Expression": "",
          "SetModifiers": []
        }
      }
    ]
  }
];
