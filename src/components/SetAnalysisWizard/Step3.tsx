import React from 'react';
import {Grid, Textarea} from "@mantine/core";

interface Props {
  result: string;
}

const Step3: React.FC<Props> = ({result}: Props) => {
  return (
    <>
      <Grid>
        <Grid.Col>
          <Textarea
            variant='default'
            value={result}
            minRows={10}
          ></Textarea>
        </Grid.Col>
      </Grid>
    </>
  );
}
export default Step3;
