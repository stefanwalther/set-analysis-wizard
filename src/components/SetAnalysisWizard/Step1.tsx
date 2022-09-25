import React, {MouseEventHandler, useEffect} from 'react';
import {Grid, Button, TextInput, Divider, Textarea} from '@mantine/core';
import {useAppDispatch, useAppSelector} from "../../common/hooks";
import {
  setCurrentWizardStep,
  selectSetIdentifierGroups,
  getInitialSetIdentifierGroups,
  getInitialAggregationTypeGroups,
  selectAggregationTypeGroups
} from '../../features/wizard/wizardSlice';
import SetIdentifierSelect from "./SetIdentifierSelect";
import AggregationTypeSelect from "./AggregationTypeSelect";

interface Props {

}

const Step1: React.FC<Props> = (props) => {

  const dispatch = useAppDispatch();

  const setIdentifierGroups = useAppSelector(selectSetIdentifierGroups);
  const aggregationTypeGroups = useAppSelector(selectAggregationTypeGroups);

  // Todo: should better be moved somewhere else
  useEffect(() => {
    return () => {
      dispatch(getInitialSetIdentifierGroups());
      dispatch(getInitialAggregationTypeGroups());
    };
  }, []);


  const handleClickNext = (e: any) => {
    e.preventDefault();
    dispatch(setCurrentWizardStep(1));
  };

  const classes = {
    labelCol: {
      fontWeight: 'bold',
      paddingTop: 13,
      color: 'dimgray'
    }
  }

  return (
    <div>
      <Grid columns={1}>
        <Grid.Col span={1}>
          <Grid columns={2}>
            <Grid.Col span='content' style={classes.labelCol}>Based on</Grid.Col>
            <Grid.Col span='auto'><SetIdentifierSelect list={setIdentifierGroups}
                                           placeholder='the selected set of data'/></Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={1}>
          <Grid>
            <Grid.Col span='content' style={classes.labelCol}>Calculate the</Grid.Col>
            <Grid.Col span='auto'><AggregationTypeSelect list={aggregationTypeGroups} placeholder='aggregated value (=> select the aggregation function)'/></Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={1}>
          <Grid>
            <Grid.Col span='content' style={classes.labelCol}>of &lt;field | bookmark &gt;</Grid.Col>
            <Grid.Col span='auto'>
              <TextInput
                placeholder="field name | bookmark name"
                withAsterisk
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Divider></Divider>
        <Grid.Col span={1}>
          <Grid>
            <Grid.Col>
              <Textarea
                placeholder='Personal notes (optional)'
                autosize
                minRows={2}
                maxRows={4}
              ></Textarea>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={12} style={{textAlign: 'right'}}>
          <Button onClick={handleClickNext}>Next Step: Modify the Set</Button>
        </Grid.Col>
      </Grid>
    </div>
  );
}
export default Step1;
