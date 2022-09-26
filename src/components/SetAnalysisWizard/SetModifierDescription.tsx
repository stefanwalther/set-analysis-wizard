import React from 'react';
import {Box} from "@mantine/core";

interface Props {
  id: string;
  hidden?: boolean;
}

const SetModifierDescription: React.FC<Props> = (props) => {
  return (
    <Box id={props.id} hidden={props.hidden} style={{height: '100px', backgroundColor: 'lightOrange'}}>
      Lore ipusum dolor sit amet
    </Box>
  );
}
export default SetModifierDescription;
