import React from 'react';
import {Highlight} from '@mantine/core';

interface Props {
  expression?: string;
  highlightedText?: string;
  onClick: () => void;
}
const Expression: React.FC<Props> = ({expression, highlightedText, onClick}: Props) => {

  const handleClick= () => {
    onClick();
  }

  return (
    <div onClick={handleClick}>
      <Highlight highlight={highlightedText ?? ''}>
      {expression ?? ''}
      </Highlight>
    </div>
  );
}
export default Expression;
