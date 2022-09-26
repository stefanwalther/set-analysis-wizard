import React from 'react';
import './SetIdentifierSelect.scss'
import {Select, SelectItem, ActionIcon, Grid, Tooltip} from '@mantine/core';
import {IconInfoCircle} from "@tabler/icons";
import {ISetIdentifierGroup} from "../../common/interfaces/ISetIdentiferGroup";

interface Props {
  list: ISetIdentifierGroup[];
  selectedKey?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}



const SetIdentifierSelect: React.FC<Props> = ({list, selectedKey, placeholder, onChange}: Props) => {

  const items: SelectItem[] = list?.flatMap(group => {
    const groupName = group.label;
    return group.items.map(item => {
      return {group: groupName, label: item.label, value: item.key}
    });
  });

  return (
    <div>
      <Grid>
        <Grid.Col span='auto' style={{paddingRight: 0}}>
          <Select
            value={selectedKey}
            placeholder={placeholder}
            searchable
            clearable
            data={items}
            onChange={onChange}
            nothingFound="No matching set identifiers found"
            styles={(theme) => ({
              separatorLabel: {
                fontWeight: 'bold',
                fontSize: '1.1rem',
              },
              item: {
                paddingLeft: '2rem'
              }
            })}
          />
        </Grid.Col>
        <Grid.Col span='content' style={{paddingLeft: 0, paddingTop: 0}}>
          <Tooltip
            label='Set the aggregation function to be used as a starting point for your set.'
            color='dark'
            withArrow
            width={200}
            multiline
          >
            <ActionIcon variant="transparent"><IconInfoCircle size={16} className='info-icon'/></ActionIcon>
          </Tooltip>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default SetIdentifierSelect;
