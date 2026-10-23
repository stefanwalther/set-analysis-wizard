import React from 'react';
import ExampleItemList from "../features/examples/ExampleItemList";
import ExampleNav from "../features/examples/ExampleNav";
import {Grid} from "@mantine/core";
import PageHeader from "../components/PageHeader";
import {selectExampleList, selectSelectedItems} from "../features/examples/examplesSlice";
import {useAppSelector} from "../common/hooks";
import {ISetAnalysisDefinitionProps} from "../features/wizard/interfaces/ISetAnalysisDefinitionProps";

interface Props {
}

const Examples: React.FC<Props> = (props) => {

  const groupItems = useAppSelector(selectExampleList);
  const exampleList = useAppSelector(selectSelectedItems)?.items;

  const handleLoadExpression = (setAnalysisDefinitionProps: ISetAnalysisDefinitionProps) => {
    console.log('props', setAnalysisDefinitionProps);
  }

  return (
    <div>
      <PageHeader title='Examples'></PageHeader>
      <Grid>
        <Grid.Col span={4}>
          <ExampleNav items={groupItems}></ExampleNav>
        </Grid.Col>
        <Grid.Col span='auto'>
          <ExampleItemList exampleItemList={exampleList}></ExampleItemList>
        </Grid.Col>
      </Grid>
    </div>
  )
}
export default Examples;
