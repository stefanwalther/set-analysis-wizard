import React from 'react';
import {ActionIcon, Grid, Tooltip, TooltipProps} from "@mantine/core";
import {IconInfoCircle} from "@tabler/icons";

interface Props {
  inputField: React.ReactNode;
  tooltip: string
  tooltipProps?: TooltipProps;
  tooltipWidth?: number;
}
const InputWithTooltip: React.FC<Props> = ({inputField, tooltip, tooltipWidth, tooltipProps}: Props) => {
  return (
    <>
      <Grid>
        <Grid.Col span='auto' style={{paddingRight: 0}}>
          {inputField}
        </Grid.Col>
        <Grid.Col span='content' style={{paddingLeft: 0, paddingTop: 0}}>
          <Tooltip
            label={tooltip}
            color='dark'
            withArrow
            width={tooltipWidth || 200}
            multiline
          >
            <ActionIcon variant="transparent"><IconInfoCircle size={16} className='info-icon'/></ActionIcon>
          </Tooltip>
        </Grid.Col>
      </Grid>
    </>
  );
}
export default InputWithTooltip;
