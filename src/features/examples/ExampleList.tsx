import React from 'react';
import {IExampleGroup} from "./interfaces/IExampleGroup";
import ExampleItem from "./ExampleItem";

interface Props {
  exampleGroup?: IExampleGroup;
}

const ExampleList: React.FC<Props> = (props) => {

  const exampleItems = props.exampleGroup?.examples?.map((example, index) => {
    return (
      <ExampleItem key={index.toString()} nr={index +1} formattedTitle={example.formattedTitle} expression={example.expression} itemKey={example.key}></ExampleItem>
    )
  });

  return (
    <div>
      {exampleItems}
    </div>
  )
}
export default ExampleList;
