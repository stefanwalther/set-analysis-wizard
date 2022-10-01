import React from 'react';
import {Box} from "@mantine/core";

interface Props {
  id: string;
  hidden?: boolean;
  value: string;
}

const SetModifierDescription: React.FC<Props> = (props) => {
  return (
    <Box id={props.id} hidden={props.hidden} style={{height: '100px', backgroundColor: 'lightOrange'}}>
      {props.value}
    </Box>
  );
}
export default SetModifierDescription;
