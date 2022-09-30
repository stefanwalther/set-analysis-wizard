import {
  Grid,
  Select,
  Text,
  TextInput,
  Button,
  ActionIcon,
  SelectItem,
  Group,
  Paper,
  Title,
  Container
} from '@mantine/core';
import React from 'react';
import InputWithTooltip from "../InputWithTooltip";
import {IFieldOperator, ISetModifierActionGroup} from "../../common/interfaces";
import {useAppDispatch, useAppSelector} from "../../common/hooks";
import {
  selectFieldOperators,
  selectSelectionOperators,
  selectSetModifierActionGroups
} from "../../features/resources/resourcesSlice";
import {IconCheck, IconCopy, IconCross, IconX} from "@tabler/icons";
import SetModifierDescription from "./SetModifierDescription";
import {setModifierModalVisibility} from "../../features/wizard/wizardSlice";
import {selectFieldsVisibility, setAction} from "../../features/set-modifier-form/setModifierFormSlice";
import {ISelectionOperator} from "../../common/interfaces/ISelectionOperator";

interface Props {
}

const SetModifierForm: React.FC<Props> = (props) => {

  const dispatch = useAppDispatch();
  const fieldOperators: IFieldOperator[] = useAppSelector(selectFieldOperators);
  const selectionOperators: ISelectionOperator[] = useAppSelector(selectSelectionOperators);
  const setModifierActionGroups: ISetModifierActionGroup[] = useAppSelector(selectSetModifierActionGroups);
  const fieldVisibility = useAppSelector(selectFieldsVisibility);

  const handleActionChange = (value: string | null) => {
    dispatch(setAction(value))
  }

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
    <Paper shadow='0' p='md'>
      <Text size='sm'>
        In the form below you can select an action and defined the required parameters for the selected action.<br/>
        After clicking on "Save" the action will be added to the Set Analysis expression.
      </Text>
      <Title order={5} pt={20}>What would you like to do?</Title>
      <Grid>
        <Grid.Col pl={20} pt={15} span={12}>
          <InputWithTooltip id='sm_action'
                            hidden={!fieldVisibility.sm_action}
                            inputField={
                              <Select
                                data={itemsSetModifierActionGroups}
                                placeholder='Select one of the actions'
                                allowDeselect
                                styles={(theme) => ({
                                  separatorLabel: {
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                  },
                                  item: {
                                    paddingLeft: '2rem'
                                  }
                                })
                                }
                                onChange={(value) => {
                                  handleActionChange(value);
                                }}
                              />
                            }
                            tooltip=''

          />
        </Grid.Col>
      </Grid>

      <Container id='sm_section_field' hidden={!fieldVisibility.sm_section_field}>
        <Title order={5} pt={20}>Field</Title>
        <Grid columns={3}>
          <Grid.Col pl={20} span='content' style={{width: '50%'}}>
            <InputWithTooltip id='sm_field_operator' hidden={!fieldVisibility.sm_field_operator}
                              inputField={<Select data={fieldOperators} label='Mode'
                                                  placeholder='How do you want to change your set?'/>} tooltip={''}/>
          </Grid.Col>
          <Grid.Col span='auto' style={{width: 50}}>
            <div id='sm_field_operator_in' hidden={!fieldVisibility.sm_field_operator_in} className='align-middle'>in
            </div>
          </Grid.Col>
          <Grid.Col span='content' style={{width: '40%'}}>
            <InputWithTooltip id='sm_field' hidden={!fieldVisibility.sm_field}
                              inputField={<TextInput label='Field' placeholder='field name or expression'/>}
                              tooltip=''></InputWithTooltip>
          </Grid.Col>
        </Grid>
      </Container>

      <Container id='sm_section_condition' hidden={!fieldVisibility.sm_section_condition}>
        <Title order={5} pt={20}>Condition</Title>
        <Grid columns={3}>
          <Grid.Col span={1} pl={20}>
            <InputWithTooltip id='sm_other_field' hidden={!fieldVisibility.sm_other_field}
                              inputField={<TextInput label='"Other Field"' placeholder='field name'
                                                     style={{width: '200px'}}/>} tooltip=''></InputWithTooltip>
          </Grid.Col>
          <Grid.Col span={2}>
            <Grid columns={4}>
              <Grid.Col span={2}><InputWithTooltip id='sm_selection_operator'
                                                   hidden={!fieldVisibility.sm_selection_operator}
                                                   inputField={<Select data={selectionOperators} label='Operator'
                                                                       placeholder='select and operator'/>}
                                                   tooltip='foo'/></Grid.Col>
              <Grid.Col span={2}><InputWithTooltip id='sm_value_1' hidden={!fieldVisibility.sm_value_1}
                                                   inputField={<TextInput label='Value(s)'/>} tooltip='foo'/></Grid.Col>
            </Grid>
            <Grid columns={6}>
              <Grid.Col span={4}>
                <InputWithTooltip id='sm_indirect_field' hidden={!fieldVisibility.sm_indirect_field}
                                  inputField={<TextInput label='Indirect Selection for Field'/>} tooltip='foo'/>
              </Grid.Col>
              <Grid.Col span={1} p={0}>
                <Button id='sm_copy_other_field' hidden={!fieldVisibility.sm_copy_other_field} variant="subtle"
                        leftIcon={<IconCopy/>} style={{fontWeight: 'normal'}}>Copy from "Target field"</Button>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Container>

      <Container id='sm_section_preview' hidden={!fieldVisibility.sm_section_preview}>
        <Title order={5}>Preview</Title>
        <SetModifierDescription id='sm_description' hidden={!fieldVisibility.sm_description}/>
      </Container>

      <Group position='apart' mt='xl' pt={10}>
        <Button variant='subtle' onClick={handleClose} color='gray' style={{fontWeight: 'normal'}} type='submit'
                leftIcon={<IconX/>}>Discard & close</Button>
        <Button onClick={handleSave} color='blue' type='submit' leftIcon={<IconCheck/>}>Save</Button>
      </Group>

    </Paper>
  );
}
export default SetModifierForm;
