import {Grid, Select, Text, TextInput, Button, ActionIcon, SelectItem, Group} from '@mantine/core';
import React from 'react';
import InputWithTooltip from "../InputWithTooltip";
import {IFieldOperator, ISetModifierActionGroup} from "../../common/interfaces";
import {useAppDispatch, useAppSelector} from "../../common/hooks";
import {selectFieldOperators, selectSetModifierActionGroups} from "../../features/resources/resourcesSlice";
import {IconCheck, IconCopy, IconCross, IconX} from "@tabler/icons";
import SetModifierDescription from "./SetModifierDescription";
import {setModifierModalVisibility} from "../../features/wizard/wizardSlice";

interface Props {
}

const SetModifierForm: React.FC<Props> = (props) => {

  const dispatch = useAppDispatch();
  const fieldOperators: IFieldOperator[] = useAppSelector(selectFieldOperators);
  const setModifierActionGroups: ISetModifierActionGroup[] = useAppSelector(selectSetModifierActionGroups);

  const itemsSetModifierActionGroups: SelectItem[] = setModifierActionGroups?.flatMap(group => {
    const groupName = group.label;
    return group.items.map(item => {
      return {group: groupName, label: item.label, value: item.value}
    });
  });

  const handleSave = () => {
    dispatch(setModifierModalVisibility(false));
  }
  const handleClose = () => {
    dispatch(setModifierModalVisibility(false));
  }

  return (
    <div>
      <Text size="md">
        In the form below you can select an action and defined the required parameters for the selected action.<br/>
        After clicking on "Save" the action will be added to the Set Analysis expression.
      </Text>
      <h2>What would you like to do?</h2>
      <Grid>
        <Grid.Col span={12}>
          <InputWithTooltip inputField={<Select data={itemsSetModifierActionGroups} styles={(theme) => ({
            separatorLabel: {
              fontWeight: 'bold',
              fontSize: '1.1rem',
            },
            item: {
              paddingLeft: '2rem'
            }
          })} />} tooltip=''/>
        </Grid.Col>
      </Grid>

      <h2>Field</h2>
      <Grid columns={3}>
        <Grid.Col span='content' style={{width: '50%'}}>
          <Select data={fieldOperators} label='Mode' placeholder='Select operator'/>
        </Grid.Col>
        <Grid.Col span='auto' style={{width: 50}}>
          in
        </Grid.Col>
        <Grid.Col span='content' style={{width: '40%'}}>
          <InputWithTooltip inputField={<TextInput label='Field' placeholder='field name or expression' />} tooltip=''></InputWithTooltip>
        </Grid.Col>
      </Grid>

      <h2>Condition</h2>
      <Grid>
        <Grid.Col>
          <InputWithTooltip inputField={<TextInput label='"Other Field"' placeholder='field name' />} tooltip=''></InputWithTooltip>
        </Grid.Col>
        <Grid.Col>
          <Grid>
            <Grid.Col><InputWithTooltip inputField={<Select data={fieldOperators} label='Operator' />} tooltip='foo' /></Grid.Col>
            <Grid.Col><InputWithTooltip inputField={<TextInput label='Value(s)' />} tooltip='foo' /></Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col>
              <Grid.Col><InputWithTooltip inputField={<TextInput label='Indirect Selection for Field' />} tooltip='foo' /></Grid.Col>
              <Button variant="subtle"><ActionIcon><IconCopy /></ActionIcon>Same as "Target field"</Button>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>

      <h2>Preview</h2>
      <SetModifierDescription />

      <Group position='apart' mt='xl'>
        <Button variant='subtle' onClick={handleClose} color='gray' style={{fontWeight: 'normal'}} type='submit' leftIcon={<IconX />}>Discard & close</Button>
        <Button onClick={handleSave} color='blue' type='submit' leftIcon={<IconCheck />}>Save</Button>
      </Group>

    </div>
  );
}
export default SetModifierForm;
