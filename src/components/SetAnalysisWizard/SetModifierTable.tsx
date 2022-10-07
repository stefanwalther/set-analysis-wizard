import React from 'react';
import {ISetModifier} from "../../common/interfaces";
import {ActionIcon, ScrollArea, Table} from "@mantine/core";
import {IconAlphabetLatin, IconPencil, IconTrash} from "@tabler/icons";
import {setFormState} from "../../features/set-modifier-form/setModifierFormSlice";
import {deleteModifier, setModifierModalVisibility} from "../../features/wizard/wizardSlice";
import {useAppDispatch} from "../../common/hooks";

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


  const rows = modifiers.map((sm, index) => (
    <tr key={index.toString()}>
      <td>
        {sm.Explanation}
      </td>
      <td style={{width: 20}}><ActionIcon variant="default" title='Highlight modifier'><IconAlphabetLatin
        size={16}/></ActionIcon></td>
      <td style={{width: 20}}><ActionIcon variant="default" title='Edit modifier'
                                          onClick={() => handleClickEdit(sm)}><IconPencil size={16}/></ActionIcon></td>
      <td style={{width: 20}}><ActionIcon variant="default" title='Delete modifier'
                                          onClick={() => handleClickDelete(index)}><IconTrash size={16}/></ActionIcon>
      </td>
      <td style={{width: 20}}>&nbsp;</td>
    </tr>
  ));

  return (
    <ScrollArea type='auto' style={{
      height: 300,
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderStyle: 'solid',
      borderWidth: 1
    }}>
      <Table striped highlightOnHover>
        <thead>
        <tr>
          <th>Set Modifier</th>
          <th colSpan={4} style={{textAlign: 'center'}}>Actions</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
export default SetModifierTable;
