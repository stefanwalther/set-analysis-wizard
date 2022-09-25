import React from 'react';
import { Select, SelectItem } from '@mantine/core';
import {IAggregationTypeGroup} from "../../features/wizard/interfaces/IAggregationTypeGroup";

interface Props {
  list: IAggregationTypeGroup[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

const AggregationTypeSelect: React.FC<Props> = ({list, placeholder, onChange}: Props) => {

  const items: SelectItem[] = list?.flatMap(group => {
    const groupName = group.label;
    return group.items.map(item => {
      return {group: groupName, label: item.label, value: item.key}
    });
  });

  return (<Select placeholder={placeholder} data={items} onChange={onChange} />)

}
export default AggregationTypeSelect;
