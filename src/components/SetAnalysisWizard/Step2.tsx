import React from 'react';
import {Button, ScrollArea, Table, ActionIcon} from "@mantine/core";
import {IconAlphabetLatin, IconCirclePlus, IconPencil, IconTrash} from "@tabler/icons";
import {setModifierModalVisibility} from "../../features/wizard/wizardSlice";
import {useAppDispatch} from "../../common/hooks";
interface Props {}
const Step2: React.FC<Props> = (props) => {

  const dispatch = useAppDispatch();

  const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];

  const rows = elements.map((element, index) => (
    <tr key={index.toString()}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
      <td style={{width:20}}><ActionIcon variant="default" title='Highlight modifier'><IconAlphabetLatin size={16} /></ActionIcon></td>
      <td style={{width:20}}><ActionIcon variant="default" title='Edit modifier' onClick={() => handleClickEdit()}><IconPencil size={16} /></ActionIcon></td>
      <td style={{width:20}}><ActionIcon variant="default" title='Delete modifier'><IconTrash size={16}/></ActionIcon></td>
      <td style={{width:20}}>&nbsp;</td>
    </tr>
  ));

  const handleClickAdd = () => {
    dispatch(setModifierModalVisibility(true));

  }
  const handleClickDeleteAll = () => {
    console.log('Delete all');
  };

  const handleClickEdit = () => {
    console.log('edit');
    dispatch(setModifierModalVisibility(true));
  }

  return (
    <div>
      <br/><br/>

      <div>
      <Button leftIcon={<IconTrash />} variant="filled" color="red" onClick={handleClickDeleteAll}>Delete all modifiers</Button>
      <Button leftIcon={<IconCirclePlus />} onClick={handleClickAdd}>
        Add modifier
      </Button>
        <br/>
      </div>

    <ScrollArea type='auto' style={{ height: 300, backgroundColor: '#fff', borderColor: '#ccc', borderStyle: 'solid', borderWidth: 1 }} >
      <Table striped highlightOnHover>
        <thead>
        <tr>
          <th>Element position</th>
          <th>Element name</th>
          <th>Symbol</th>
          <th>Atomic mass</th>
          <th colSpan={4} style={{textAlign: 'center'}}>Actions</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>

    </div>
  );
}

export default Step2;

