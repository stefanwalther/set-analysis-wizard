import React from 'react';
import {IExampleList} from "./interfaces/IExampleList";
import ExampleItem from "./ExampleItem";
import {IExampleItem} from "./interfaces/IExampleItem";

interface Props {
  exampleItemList?: IExampleItem[];
  loadExample?: (example: IExampleItem) => void;
}

const ExampleItemList: React.FC<Props> = (props: Props) => {

  const handleClick = (key: string) => {
    console.log(`handleClick ${key}`);
    // const example = props.exampleItemList?.items?.find((e) => {
    //   return e.key === key;
    // });
    // if (example) {
    //   if (props.loadExample) {
    //     props.loadExample(example);
    //   }
    // }
  }


  const exampleItems = props.exampleItemList?.map((example, index) => {
    return (
      <ExampleItem
        key={index.toString()}
        nr={index +1}
        formattedTitle={example.formattedTitle}
        formattedExpression={example.formattedExpression}
        itemKey={example.key}
        onSelect={(key: string) => {
          handleClick(key);
        }}
      ></ExampleItem>
    )
  });

  return (
    <div>
      {exampleItems}
    </div>
  )
}
export default ExampleItemList;
