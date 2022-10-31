import React from 'react';
import ExampleList from "../features/examples/ExampleList";
import {exampleGroups} from "../features/examples/examples";
import ExampleNav from "../features/examples/ExampleNav";
import {Grid} from "@mantine/core";
import PageHeader from "../components/PageHeader";
import {selectGroupItems} from "../features/examples/examplesSlice";
import {useAppSelector} from "../common/hooks";

interface Props {
}

const Examples: React.FC<Props> = (props) => {

  const groupItems = useAppSelector(selectGroupItems);


  const exampleGroup = exampleGroups.find((eg) => eg.key === 'main-group-basic')?.exampleGroups?.find((eg) => eg.key === 'basic-simple');

  return (
    <div>
      <PageHeader title='Examples'></PageHeader>
      <Grid>
        <Grid.Col span={4}>
          <ExampleNav items={groupItems}></ExampleNav>
        </Grid.Col>
        <Grid.Col span='auto'>
          <ExampleList exampleGroup={exampleGroup}></ExampleList>
        </Grid.Col>
      </Grid>
    </div>
  )
}
export default Examples;
