import React from 'react';
import {ISetModifier} from "../../common/interfaces";
import {ActionIcon, ScrollArea, Table, Box} from "@mantine/core";
import {IconAlphabetLatin, IconPencil, IconTrash} from "@tabler/icons";
import {setFormState} from "../../features/set-modifier-form/setModifierFormSlice";
import {deleteModifier, setHighlightedSetModifier, setModifierModalVisibility} from "../../features/wizard/wizardSlice";
import {useAppDispatch} from "../../common/hooks";
import {IconCodePlus} from '@tabler/icons';

interface Props {
  modifiers: ISetModifier[];
}


const SetModifierTable: React.FC<Props> = ({modifiers}: Props) => {

  const dispatch = useAppDispatch();

  const handleClickEdit = (item: ISetModifier) => {
    dispatch(setFormState(item));
    dispatch(setModifierModalVisibility(true));
  }

  const handleClickDelete = (idx: number): void => {
    dispatch(deleteModifier(idx));
  }

  const handleHighlight = (expr: string): void => {
    dispatch(setHighlightedSetModifier(expr));
  }

  const rows = modifiers.map((sm, index) => (
    <tr key={index.toString()}>
      <td>
        {sm.Explanation}
      </td>
      <td style={{width: 20}}>
        <ActionIcon
          variant="default"
          onMouseOver={() => {
            handleHighlight(sm.TechnicalModifier);
          }}
          onClick={() => {
            handleHighlight(sm.TechnicalModifier);
          }}
          onMouseLeave={() => {
            handleHighlight('');
          }}
          title='Highlight modifier'>
          <IconAlphabetLatin size={16}/>
        </ActionIcon>
      </td>
      <td style={{width: 20}}>
        <ActionIcon
          variant="default"
          title='Edit modifier'
          onClick={() => handleClickEdit(sm)}>
          <IconPencil size={16}/>
        </ActionIcon>
      </td>
      <td style={{width: 20}}>
        <ActionIcon
          variant="default"
          title='Delete modifier'
          onClick={() => handleClickDelete(index)}>
          <IconTrash size={16}/>
        </ActionIcon>
      </td>
      <td style={{width: 20}}>&nbsp;</td>
    </tr>
  ));

  const rowsEmpty = () => (
    <tr>
      <td colSpan={5} style={{height: '298px'}}>
        <Box
          sx={(theme) => ({
            textAlign: 'center',
            color: '#ccc'
          })}
        >
          <IconCodePlus size={64} style={{color: '#ccc'}}/><br/>
          No Set Modifiers defined yet
        </Box>
      </td>
    </tr>
  );

  return (
    <ScrollArea type='auto' style={{
      height: 300,
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderStyle: 'solid',
      borderWidth: 1
    }}>
      <Table striped highlightOnHover>
        <thead hidden={modifiers.length === 0}>
        <tr style={{height: '20px'}}>
          <th>Set Modifier</th>
          <th colSpan={4} style={{textAlign: 'center'}}>Actions</th>
        </tr>
        </thead>
        <tbody>
        {(modifiers && modifiers.length) > 0 ? rows : rowsEmpty()}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
export default SetModifierTable;
