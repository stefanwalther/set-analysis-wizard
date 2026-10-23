import React from 'react';
import './ExampleItem.scss';
import {Button, Grid, Center, Code} from '@mantine/core';

interface Props {
  nr: number;
  formattedTitle: string;
  formattedExpression: string;
  itemKey: string;
  onSelect?: (key: string) => void;
}

const ExampleItem: React.FC<Props> = ({nr, formattedTitle, formattedExpression, itemKey, onSelect}: Props) => {
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
            <span dangerouslySetInnerHTML={{__html: formattedExpression}}></span>
          </Code>
        </div>
      </Grid.Col>
      <Grid.Col span='content' className='button--container'>
        <Center inline style={{height: '100%'}}>
          <Button
            className='button-open'
            onClick={() => {
              if (onSelect) {
                onSelect(itemKey);
              }
            }}
          >
            Open in Wizard
          </Button>
        </Center>
      </Grid.Col>
    </Grid>)
}
export default ExampleItem;
