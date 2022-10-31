import {createStyles, Header, Menu, Group, Center, Burger, Container} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {IconChevronDown} from '@tabler/icons';
import Logo from "./Logo";
import {
  useNavigate,
} from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface HeaderSearchProps {
  links: { key: string, route: string; label: string; links?: { key: string, route: string; label: string }[] }[];
}

export function NavHeader({links}: HeaderSearchProps) {

  const [opened, {toggle}] = useDisclosure(false);
  const {classes} = useStyles();
  const navigate = useNavigate();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.route} onClick={(e: any) => {
        e.preventDefault();
      }}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <a
              href={link.route}
              className={classes.link}
              onClick={(event) => {
                navigate(link.route);
                event.preventDefault();
              }}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5}/>
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.key}
        href={link.route}
        className={classes.link}
        onClick={(event) => {
          event.preventDefault();
          navigate(link.route);
        }}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header height={56} style={{backgroundColor: 'steelblue'}}>
      <Container>
        <div className={classes.inner}>
          <Group>
            <div>
              <span style={{paddingRight: 0, marginRight: 0, fontWeight: "bold"}}>Set Analysis Wizard</span><sup
              style={{marginLeft: 0, paddingLeft: 0, color: "darkgray"}}>v2</sup>
              <Logo/>
            </div>
          </Group>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm"/>
        </div>
      </Container>
    </Header>
  );
}
