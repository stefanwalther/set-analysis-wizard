import {IExampleGroup} from "./interfaces/IExampleGroup";


export const exampleGroups: IExampleGroup[] = [
  {
    sort: 1,
    key: 'main-group-basic',
    title: 'Basic Examples Without Modifiers',
    exampleGroups: [
      {
        sort: 1,
        key: 'basic-simple',
        title: 'Basic Set Analysis Examples - Simple Expressions',
        description: 'The following examples use very simple and basic Set Analysis expressions.',
        examples: [
          {
            sort: 1,
            key: '001',
            formattedTitle: '<b>Sum</b> of "Sales" based on the <b>current selection</b>',
            expression: 'Sum({$}Sales)'
          },
          {
            sort: 2,
            key: '002',
            formattedTitle: `<b>Count</b> values of field "Customer" based on the <b>current selection</b>`,
            expression: `Count({$}Customer)`
          },
          {
            sort: 3,
            key: '003',
            formattedTitle: `Sum</b> of "Sales" based on <b>all values</b>, ignoring any selection.`,
            expression: `Sum({1}Sales)`
          },
          {
            sort: 4,
            key: '004',
            formattedTitle: `<b>Sum</b> of "Sales" based on the <b>bookmark with the ID</b> "BM01".`,
            expression: `Sum({BM01}Sales)`
          }
        ]
      }
    ]
  },
  {
    sort: 2,
    key: 'main-group-modifiers',
    title: 'Simple Modifiers'
  },
  {
    sort: 3,
    key: 'main-group-indirect',
    title: 'Indirect Set Analysis'
  }
];
