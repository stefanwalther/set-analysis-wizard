import {Box} from '@mantine/core';
import React from 'react';
import {IExampleGroup} from "./interfaces/IExampleGroup";

interface Props {
  items: IExampleGroup[]
}

const ExampleNav: React.FC<Props> = ({items}: Props) => {

  const navItems = items.map(nav => {
    return (
      <div key={'container-' + nav.key}>
        <Box<'a'>
          component="a"
          key={nav.key}
        >
          {nav.navTitle}
          {nav.exampleGroups?.map(sNav => {
            return (
              <Box<'a'>
                key={'sNav-' + sNav.key}
                sx={(theme) => ({paddingLeft: 1.2 * theme.spacing.md})}
              >
                {sNav.navTitle}
              </Box>
            )
          })}
        </Box>
      </div>
    )
  })

  return (
    <div className='example-nav--container'>
      {navItems}
    </div>
  );
}
export default ExampleNav;
