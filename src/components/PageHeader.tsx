import React from 'react';

interface Props {
  title: string
}
const PageHeader: React.FC<Props> = ({title}: Props) => {
  return (
    <h2 style={{marginTop:'0px', paddingTop: '1em'}}>{title}</h2>
  )
}
export default PageHeader;
