import React, {MouseEventHandler, useEffect} from 'react';
import {Grid, Button, TextInput, Divider, Textarea} from '@mantine/core';
import {useAppDispatch, useAppSelector} from "../../common/hooks";
import {
  setCurrentWizardStep,
  selectSetIdentifierGroups,
  getInitialSetIdentifierGroups,
  getInitialAggregationTypeGroups,
  selectAggregationTypeGroups,
  selectValueSetIdentifier,
  setValueSetIdentifier,
  selectValueAggregationType,
  setValueAggregationType,
  setValueFieldExpression,
  selectValueFieldExpression,
  setValuePersonalComment,
  selectValuePersonalComment
} from '../../features/wizard/wizardSlice';
import SetIdentifierSelect from "./SetIdentifierSelect";
import AggregationTypeSelect from "./AggregationTypeSelect";
import InputWithTooltip from "../InputWithTooltip";

interface Props {

}

const Step1: React.FC<Props> = (props) => {

  const dispatch = useAppDispatch();

  const setIdentifierGroups = useAppSelector(selectSetIdentifierGroups);
  const aggregationTypeGroups = useAppSelector(selectAggregationTypeGroups);
  const valueSetIdentifier = useAppSelector(selectValueSetIdentifier);
  const valueAggregationType = useAppSelector(selectValueAggregationType);
  const valueFieldExpression = useAppSelector(selectValueFieldExpression);
  const valuePersonalComment = useAppSelector(selectValuePersonalComment);

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

  const handleFieldChange = (value: string) => {
    dispatch(setValueFieldExpression(value));
  }

  const handlePersonalCommentChange = (value: string) => {
    dispatch(setValuePersonalComment(value));
  }

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
            <Grid.Col span='auto'>
              <SetIdentifierSelect
                list={setIdentifierGroups}
                selectedKey={valueSetIdentifier}
                placeholder='the selected set of data'
                onChange={(value: string) => {
                  dispatch(setValueSetIdentifier(value));
                }}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={1}>
          <Grid>
            <Grid.Col span='content' style={classes.labelCol}>Calculate the</Grid.Col>
            <Grid.Col span='auto'>
              <AggregationTypeSelect
                list={aggregationTypeGroups}
                selectedKey={valueAggregationType}
                placeholder='aggregated value (=> select the aggregation function)'
                onChange={(value: string) => {
                  dispatch(setValueAggregationType(value));
                }}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={1}>
          <Grid>
            <Grid.Col span='content' style={classes.labelCol}>of &lt;field | bookmark &gt;</Grid.Col>
            <Grid.Col span='auto'>
              <InputWithTooltip
                inputField={<TextInput
                  value={valueFieldExpression}
                  placeholder="field name | bookmark name"
                  withAsterisk
                  onChange={(e) => handleFieldChange(e.target.value)}
                />}
                tooltip="Field name or expression: Enter either a field name or a simple expression here. Examples: Field: Sales, Simple Expression: Sales*FlagBudget</pre><i>Use expressions carefully! Have a look at the QlikView Reference manual for further information!</i><br/><hr /><b>Note:</b><br/>If the field name contains spaces just enter the field name as it is, the necessary brackets ( [ and ] ) will be added automatically."
                tooltipWidth={500}
              ></InputWithTooltip>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Divider></Divider>
        <Grid.Col span={1}>
          <Grid>
            <Grid.Col>
              <Textarea
                value={valuePersonalComment}
                placeholder='Personal notes (optional)'
                autosize
                minRows={2}
                maxRows={4}
                onChange={(e) => handlePersonalCommentChange(e.target.value)}
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
