import React from 'react';

interface Props {
  expression?: string;
  onClick: () => void;
}
const Expression: React.FC<Props> = ({expression, onClick}: Props) => {

  const handleClick= () => {
    onClick();
  }

  return (
    <div onClick={handleClick}>
      {expression}
    </div>
  );
}
export default Expression;
