import {Box, createStyles} from '@mantine/core';
import React from 'react';
import {IExampleList} from "./interfaces/IExampleList";
import {useAppDispatch, useAppSelector} from "../../common/hooks";
import {selectedSelectedList, setSelectedList} from "./examplesSlice";

interface Props {
  items: IExampleList[];
  active?: string;
}

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: 'block',
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    lineHeight: 1.2,
    fontSize: theme.fontSizes.sm,
    padding: theme.spacing.xs,
    borderTopRightRadius: theme.radius.sm,
    borderBottomRightRadius: theme.radius.sm,
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    fontWeight: 500,
    borderLeftColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 6 : 7],
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 2 : 7],

    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
    },
  },
}));

const ExampleNav: React.FC<Props> = ({items}: Props) => {

  const {classes, cx} = useStyles();
  const dispatch = useAppDispatch();
  const activeList = useAppSelector(selectedSelectedList)

  const handleClick = (key: string) => {
    dispatch(setSelectedList(key));
  }

  const navItems = items.map(nav => {
    return (
      <div key={'container-' + nav.key}>
        <Box<'a'>
          component="a"
          key={nav.key}
          href={'#' + nav.key}
          onClick={() => {
            if (nav.level > 1) {
              handleClick(nav.key);
            }
          }}
          className={cx(classes.link, {[classes.linkActive]: activeList === nav.key})}
          sx={(theme) => ({
            paddingLeft: nav.level * theme.spacing.md,
            fontWeight: nav.level === 1 ? 600 : 300,
            cursor: nav.level === 1 ? 'default' : 'pointer',
          })}
        >
          {nav.navTitle}
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
