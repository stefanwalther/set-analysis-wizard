import React from 'react';
import {Grid, Button, TextInput, Divider, Textarea} from '@mantine/core';
import {useAppDispatch, useAppSelector} from "../../common/hooks";
import {
  setCurrentWizardStep,
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
import {selectAggregationTypeGroups, selectSetIdentifierGroups} from "../../features/resources/resourcesSlice";
import {ttPersonalNotes, ttValueFieldExpression} from "../../common/tooltips";

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
                selectedValue={valueAggregationType}
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
                  defaultValue={valueFieldExpression}
                  placeholder="field name | expression | bookmark name"
                  withAsterisk
                  onChange={(e) => handleFieldChange(e.target.value)}
                />}
                tooltip={ttValueFieldExpression}
                tooltipWidth={500}
              ></InputWithTooltip>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Divider></Divider>
        <Grid.Col span={1}>
          <Grid>
            <Grid.Col>
              <InputWithTooltip
                inputField={
                  <Textarea
                    defaultValue={valuePersonalComment}
                    placeholder='Personal notes (optional)'
                    autosize
                    minRows={2}
                    maxRows={4}
                    onChange={(e) => handlePersonalCommentChange(e.target.value)}
                  ></Textarea>
                }
                tooltip={ttPersonalNotes}
              />
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
