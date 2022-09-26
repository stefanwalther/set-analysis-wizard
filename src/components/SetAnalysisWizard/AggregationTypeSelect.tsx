import React from 'react';
import { Select, SelectItem } from '@mantine/core';
import InputWithTooltip from "../InputWithTooltip";
import {IAggregationTypeGroup} from "../../common/interfaces";

interface Props {
  list: IAggregationTypeGroup[];
  placeholder?: string;
  selectedValue?: string;
  onChange?: (value: string) => void;
}

const AggregationTypeSelect: React.FC<Props> = ({list, placeholder, selectedValue, onChange}: Props) => {

  const items: SelectItem[] = list?.flatMap(group => {
    const groupName = group.label;
    return group.items.map(item => {
      return {group: groupName, label: item.label, value: item.key}
    });
  });

  return (
    <InputWithTooltip
      inputField={<Select
          value={selectedValue}
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
