import React from 'react';
import {ScrollArea, Table, ActionIcon} from "@mantine/core";
import {IconAlphabetLatin, IconPencil, IconTrash} from "@tabler/icons";

interface Props {}
const Step2: React.FC<Props> = (props) => {

  interface IActionProps  {
    index: number;
    description: string;


  }

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

  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
      <td style={{width:20}}><ActionIcon variant="default" title='Highlight modifier'><IconAlphabetLatin size={16} /></ActionIcon></td>
      <td style={{width:20}}><ActionIcon variant="default" title='Edit modifier'><IconPencil size={16} /></ActionIcon></td>
      <td style={{width:20}}><ActionIcon variant="default" title='Delete modifier'><IconTrash size={16}/></ActionIcon></td>
      <td style={{width:20}}>&nbsp;</td>
    </tr>
  ));

  return (
    <div>
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
