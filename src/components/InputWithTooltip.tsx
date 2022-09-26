import React from 'react';
import {ActionIcon, Grid, Tooltip, TooltipProps} from "@mantine/core";
import {IconInfoCircle} from "@tabler/icons";

interface Props {
  id?: string;
  inputField: React.ReactNode;
  tooltip: string
  tooltipProps?: TooltipProps;
  tooltipWidth?: number;
  hidden?: boolean
}

const InputWithTooltip: React.FC<Props> = ({id, inputField, tooltip, tooltipWidth, tooltipProps, hidden}: Props) => {

  const c = <div id={id}>
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
  </div>


  return !hidden ? c : null;
}
export default InputWithTooltip;
