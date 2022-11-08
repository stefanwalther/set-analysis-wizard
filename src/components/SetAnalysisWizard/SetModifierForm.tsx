import {Button, Container, Grid, Group, Paper, Select, SelectItem, Text, TextInput, Title} from '@mantine/core';
import React, {ChangeEvent, useState} from 'react';
import InputWithTooltip from "../InputWithTooltip";
import {IFieldOperator, ISetModifier, ISetModifierActionGroup} from "../../common/interfaces";
import {useAppDispatch, useAppSelector} from "../../common/hooks";
import {
  selectFieldOperators,
  selectSelectionOperators,
  selectSetModifierActionGroups
} from "../../features/resources/resourcesSlice";
import {IconCheck, IconCopy, IconX} from "@tabler/icons";
import SetModifierDescription from "./SetModifierDescription";
import {saveSetModifier, setModifierModalVisibility} from "../../features/wizard/wizardSlice";
import {
  initFormState,
  selectFieldsVisibility,
  setAction,
  setField,
  setFieldOperator,
  setIndirectField,
  setOtherField,
  setSelectionOperator,
  setValue1
} from "../../features/set-modifier-form/setModifierFormSlice";
import {ISelectionOperator} from "../../common/interfaces/ISelectionOperator";
import {openConfirmModal} from "@mantine/modals";
import {selectEnvironment} from "../../features/ui/uiSlice";
import {Environment} from "../../common/enums/Environment";
import {
  ttSmAction,
  ttSmField,
  ttSmFieldOperation,
  ttSmIndirectField,
  ttSmOtherField,
  ttSmSelectionOperator,
  ttSmValue1
} from "../../common/tooltips";
import './SetModifierForm.scss'
import {useForm} from "@mantine/form";
import {ActionEnum} from "../../features/set-modifier-form/enums/ActionEnum";

interface Props {
  state: ISetModifier
}

const SetModifierForm: React.FC<Props> = ({state}: Props) => {

  const dispatch = useAppDispatch();
  const fieldOperators: IFieldOperator[] = useAppSelector(selectFieldOperators);
  const selectionOperators: ISelectionOperator[] = useAppSelector(selectSelectionOperators);
  const setModifierActionGroups: ISetModifierActionGroup[] = useAppSelector(selectSetModifierActionGroups);
  const fieldVisibility = useAppSelector(selectFieldsVisibility);
  const environment = useAppSelector(selectEnvironment);

  const form = useForm({
      initialValues: {
        sm_action: '',
        sm_field: ''
      },
      validateInputOnChange: true,
      validate: (values) => {
        console.log('useForm:values', values);
        if (values.sm_action === '') {
          return {
            sm_action: 'Selection is required'
          }
        }
        if (values.sm_action as ActionEnum === ActionEnum.set_remove) {
          console.log('we have set remove');
          return {
            sm_field: values.sm_field.length === 0 ? 'Field is required' : null
          }
        } else if (values.sm_action as ActionEnum === ActionEnum.undefined) {
          return {}
        }
        return {}
      }
    }
  );

  const handleActionChange = (value: string | null) => {
    dispatch(setAction(value))
  }

  const handleSave = () => {
    // form.validate();
    if (!form.isValid()) {
      console.error('Form is not valid');
      return;
    } else {
      // Handles both add & save scenarios ...
      dispatch(saveSetModifier(state));
      dispatch(initFormState());
      dispatch(setModifierModalVisibility(false));
    }
  }

  const handleResetForm = () => {
    dispatch(initFormState());
  }

  /**
   * Handles the event to discard changes, and close the form.
   */
  const handleDiscardClose = () => openConfirmModal({
    title: 'Please confirm your action',
    children: (
      <Text size="sm">
        Do you want to discard your changes and close the form?<br/>
        Note: Any changes made to this Set Modifier will be lost!
      </Text>
    ),
    labels: {confirm: 'Continue', cancel: 'Cancel'},
    confirmProps: {color: 'red'},
    onCancel: () => {
    },
    onConfirm: () => discardAndClose(),
    zIndex: 1
  });

  const discardAndClose = () => {
    dispatch(initFormState());
    dispatch(setModifierModalVisibility(false));
  }

  const itemsSetModifierActionGroups: SelectItem[] = setModifierActionGroups?.flatMap(group => {
    const groupName = group.label;
    return group.items.map(item => {
      return {group: groupName, label: item.label, value: item.value}
    });
  });


  return (
    <Paper shadow='0' p='md'>
      <Text size='sm'>
        In the form below you can select an action and define the required parameters for the selected action.<br/>
        After clicking on "Save" the action will be added to your Set Analysis definition.
      </Text>
      <Title order={5} pt={20}>What would you like to do?</Title>
      <Grid>
        <Grid.Col pl={20} pt={15} span={12}>
          <InputWithTooltip id='sm_action'
                            hidden={!fieldVisibility.sm_action}
                            inputField={
                              <Select
                                name='sm_action'
                                data={itemsSetModifierActionGroups}
                                placeholder='Select one of the actions'
                                allowDeselect
                                value={state?.Action}
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
                            tooltip={ttSmAction}

          />
        </Grid.Col>
      </Grid>

      <Container id='sm_section_field' hidden={!fieldVisibility.sm_section_field}>
        <Title order={5} pt={20}>Field</Title>
        <Grid columns={3} align='flex-end'>
          <Grid.Col pl={20} span='content' style={{width: '50%'}}>
            <InputWithTooltip id='sm_field_operator'
                              hidden={!fieldVisibility.sm_field_operator}
                              inputField={
                                <Select
                                  data={fieldOperators}
                                  label='Action'
                                  value={state.FieldOperator}
                                  onChange={(value: string) => {
                                    dispatch(setFieldOperator(value))
                                  }
                                  }
                                  placeholder='How do you want to change your set?'
                                />}
                              tooltip={ttSmFieldOperation}/>
          </Grid.Col>
          <Grid.Col span='auto' style={{width: 50, textAlign: 'center'}}>
            <div id='sm_field_operator_in'
                 hidden={!fieldVisibility.sm_field_operator_in}
                 className='align-middle'>
              <b>in</b>
            </div>
          </Grid.Col>
          <Grid.Col span='content' style={{width: '40%'}}>
            <InputWithTooltip id='sm_field'
                              hidden={!fieldVisibility.sm_field}
                              inputField={
                                <TextInput
                                  label='Field'
                                  defaultValue={state.Field}
                                  placeholder='field name or expression'
                                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    dispatch(setField(e.target.value));
                                  }
                                  }
                                />
                              }
                              tooltip={ttSmField}></InputWithTooltip>
          </Grid.Col>
        </Grid>
      </Container>

      <Container id='sm_section_condition' hidden={!fieldVisibility.sm_section_condition}>
        <Title order={5} pt={20}>Condition</Title>
        <Grid columns={3}>
          <Grid.Col span={1} pl={20}>
            <InputWithTooltip id='sm_other_field'
                              hidden={!fieldVisibility.sm_other_field}
                              inputField={
                                <TextInput
                                  label='"Other Field"'
                                  placeholder='field name'
                                  defaultValue={state.OtherField}
                                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    dispatch(setOtherField(e.target.value));
                                  }}
                                />}
                              tooltip={ttSmOtherField}></InputWithTooltip>
          </Grid.Col>
          <Grid.Col span={2}>
            <Grid columns={4}>
              <Grid.Col span={2}><InputWithTooltip
                id='sm_selection_operator'
                hidden={!fieldVisibility.sm_selection_operator}
                inputField={
                  <Select
                    data={selectionOperators}
                    label='Operator'
                    placeholder='select and operator'
                    defaultValue={state.SelectionOperator}
                    onChange={(value: string) => {
                      dispatch(setSelectionOperator(value));
                    }}
                  />}
                tooltip={ttSmSelectionOperator}/>
              </Grid.Col>
              <Grid.Col span={2}>
                <InputWithTooltip
                  id='sm_value_1'
                  hidden={!fieldVisibility.sm_value_1}
                  inputField={
                    <TextInput
                      label='Value(s)'
                      defaultValue={state.ValuesOrExpression_1}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(setValue1(e.target.value));
                      }}
                    />}
                  tooltip={ttSmValue1}/>
              </Grid.Col>
            </Grid>
            <Grid columns={6}>
              <Grid.Col span={4}>
                <InputWithTooltip
                  id='sm_indirect_field'
                  hidden={!fieldVisibility.sm_indirect_field}
                  inputField={
                    <TextInput
                      label='Indirect Selection for Field'
                      defaultValue={state.IndirectField}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(setIndirectField(e.target.value));
                      }}
                    />}
                  tooltip={ttSmIndirectField}
                />
              </Grid.Col>
              <Grid.Col span={1} p={0}>
                <Button id='sm_copy_other_field' hidden={!fieldVisibility.sm_copy_other_field} variant="subtle"
                        leftIcon={<IconCopy/>} style={{fontWeight: 'normal'}}>Copy from "Target field"</Button>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Container>

      <Container px={0} id='sm_section_preview' hidden={!fieldVisibility.sm_section_preview}
                 className='result--container'>
        <Title order={5}>Result</Title>
        <Grid gutter={12} pt={20}>
          <Grid.Col span={1} style={{width: '20px', textAlign: 'center'}}>
            <IconCheck style={{display: form.isValid() ? 'block' : 'none'}} className='icon-ok'></IconCheck>
            <IconX style={{display: form.isValid() ? 'none' : 'block'}} className='icon-nok'></IconX>
          </Grid.Col>
          <Grid.Col span={11}>
            <SetModifierDescription
              id='sm_description'
              hidden={false}
              value={state.Explanation ?? ''}
            />
          </Grid.Col>
        </Grid>
      </Container>

      <Group position='apart' mt='xl' pt={10}>
        <Button variant='subtle' onClick={handleDiscardClose} color='gray' style={{fontWeight: 'normal'}} type='submit'
                leftIcon={<IconX/>}>Discard & close</Button>
        <Button variant='subtle' color='gray' type='submit' onClick={handleResetForm}
                hidden={environment === Environment.Test}>Reset form</Button>
        <Button onClick={handleSave} color='blue' type='submit' leftIcon={<IconCheck/>}>Save</Button>
      </Group>

    </Paper>
  );
}
export default SetModifierForm;
