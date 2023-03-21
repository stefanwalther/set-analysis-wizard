import React from 'react';
import {ActionIcon, Grid, TooltipProps, Text, HoverCard} from "@mantine/core";
import {IconInfoCircle} from "@tabler/icons";
import './InputWithTooltip.scss';
import ReactDOMServer from 'react-dom/server';

interface Props {
  id?: string;
  inputField: React.ReactNode;
  tooltip: string | React.ReactElement;
  tooltipProps?: TooltipProps;
  tooltipWidth?: number;
  hidden?: boolean
}

const InputWithTooltip: React.FC<Props> = ({id, inputField, tooltip, tooltipWidth, tooltipProps, hidden}: Props) => {

  const TOOLTIP_WIDTH: number = 400;

  let tt = '';
  if (typeof tooltip === 'string') {
    tt = tooltip
  } else {
    tt = ReactDOMServer.renderToStaticMarkup(tooltip);
  }

  const c = <div id={id}>
    <Grid align='flex-end'>
      <Grid.Col span='auto' style={{paddingRight: 0}}>
        {inputField}
      </Grid.Col>
      <Grid.Col span='content' style={{paddingLeft: 0, paddingTop: 0, paddingBottom: 12}}>
        <HoverCard width={tooltipWidth || TOOLTIP_WIDTH} position="bottom" withArrow shadow="md">
          <HoverCard.Target>
            <ActionIcon variant="transparent" className='info-icon'><IconInfoCircle size={16}/></ActionIcon>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm" dangerouslySetInnerHTML={{__html: tt}} className='input-with-tooltip--container'></Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Grid.Col>
    </Grid>
  </div>

  return !hidden ? c : null;
}
export default InputWithTooltip;
