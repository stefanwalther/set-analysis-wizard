import React from 'react';
import ExampleList from "../features/examples/ExampleList";
import {exampleGroups} from "../features/examples/examples";
import ExampleNav from "../features/examples/ExampleNav";
import {Grid} from "@mantine/core";
import PageHeader from "../components/PageHeader";

interface Props {
}

const Examples: React.FC<Props> = (props) => {

  const exampleGroup = exampleGroups.find((eg) => eg.key === 'main-group-basic')?.exampleGroups?.find((eg) => eg.key === 'basic-simple');

  return (
    <div>
      <PageHeader title='Examples'></PageHeader>
      <Grid>
        <Grid.Col span={3}>
          <ExampleNav></ExampleNav>
        </Grid.Col>
        <Grid.Col span='auto'>
          <ExampleList exampleGroup={exampleGroup}></ExampleList>
        </Grid.Col>
      </Grid>
    </div>
  )
}
export default Examples;
