import React from 'react';
import { Select, SelectItem } from '@mantine/core';
import {IAggregationTypeGroup} from "../../features/wizard/interfaces/IAggregationTypeGroup";
import InputWithTooltip from "../InputWithTooltip";

interface Props {
  list: IAggregationTypeGroup[];
  placeholder?: string;
  selectedKey?: string;
  onChange?: (value: string) => void;
}

const AggregationTypeSelect: React.FC<Props> = ({list, placeholder, selectedKey, onChange}: Props) => {

  const items: SelectItem[] = list?.flatMap(group => {
    const groupName = group.label;
    return group.items.map(item => {
      return {group: groupName, label: item.label, value: item.key}
    });
  });

  return (
    <InputWithTooltip
      inputField={<Select
          value={selectedKey}
          placeholder={placeholder}
          data={items}
          searchable
          clearable
          styles={(theme) => ({
            separatorLabel: {
              fontWeight: 'bold',
              fontSize: '1.1rem',
            },
            item: {
              paddingLeft: '2rem'
            }
          })}
          onChange={onChange}
        />}
      tooltip='Select one of the given aggregation types.'
    ></InputWithTooltip>

  )

}
export default AggregationTypeSelect;
