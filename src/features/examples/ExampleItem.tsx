import React from 'react';
import './ExampleItem.scss';
import {Button, Grid, Center, Code} from '@mantine/core';

interface Props {
  nr: number;
  formattedTitle: string;
  expression: string;
  itemKey: string;
}

const ExampleItem: React.FC<Props> = ({nr, formattedTitle, expression, itemKey}: Props) => {
  return (
    <Grid className='example-item--container'>
      <Grid.Col span={1} className='number--container'>
        <Center inline style={{height: '100%'}}>
          <div className='number'>{nr}</div>
        </Center>
      </Grid.Col>
      <Grid.Col span='auto' style={{textAlign: 'left'}} className='content--container'>
        <div className='formattedTitle' dangerouslySetInnerHTML={{__html: formattedTitle}}></div>
        <div className='expression--container'>
          <Code color='yellow'>
            {expression}
          </Code>
        </div>
      </Grid.Col>
      <Grid.Col span='content' className='button--container'>
        <Center inline style={{height: '100%'}}>
          <Button className='button-open'>Open in Wizard</Button>
        </Center>
      </Grid.Col>
    </Grid>)
}
export default ExampleItem;
