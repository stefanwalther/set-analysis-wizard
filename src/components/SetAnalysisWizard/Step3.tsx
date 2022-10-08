import React from 'react';
import {Grid, Textarea} from "@mantine/core";

interface Props {
  expressionWithComments: string;
}

const Step3: React.FC<Props> = ({expressionWithComments}: Props) => {



  return (
    <>
      <Grid>
        <Grid.Col>
          <Textarea
            variant='default'
            defaultValue={expressionWithComments}
            minRows={10}
          ></Textarea>
        </Grid.Col>
      </Grid>
    </>
  );
}
export default Step3;
