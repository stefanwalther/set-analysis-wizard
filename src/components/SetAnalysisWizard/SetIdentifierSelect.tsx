import React from 'react';
import './SetIdentifierSelect.scss'
import {Select, SelectItem} from '@mantine/core';
import {ISetIdentifierGroup} from "../../common/interfaces";
import InputWithTooltip from "../InputWithTooltip";
import {ttSetIdentifier} from "../../common/tooltips";

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
      <InputWithTooltip
        inputField={
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
        }
        tooltip={ttSetIdentifier}
      />
    </div>
  )
}

export default SetIdentifierSelect;
