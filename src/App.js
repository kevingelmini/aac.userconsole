import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import { List, Datagrid, SingleFieldList, SimpleList } from "react-admin";
import { Show, SimpleShowLayout } from "react-admin";

import { ArrayField, TextField, ChipField, RichTextField, ReferenceField, ReferenceArrayField } from "react-admin";
import { Container, Box, Grid, Paper, Typography, Button } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';

import { fetchUtils } from 'react-admin'
import radataprovider from "./dataprovider";
import raauthprovider from "./authProvider";

import { defaultTheme } from 'react-admin';
import MyLayout from './layout'
import { AccountList } from "./accounts";

import dashboard from "./dashboard";

function fetchJson(url, options = {}) {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' })
  }

  options.credentials = 'include'

  return fetchUtils.fetchJson(url, options)
}

const dataProvider = radataprovider('http://localhost:9090/console/user', fetchJson);
const authProvider = raauthprovider('http://localhost:9090/console/user', fetchJson);


const myTheme = {
  ...defaultTheme,
  palette: {
    primary: {
      main: '#0066cc',
      dark: '#00478e',
      light: '#3384d6'
    },
    secondary: {
      main: '#b2b2b2',
      dark: '#7c7c7c',
      light: '#c1c1c1'
    },
  },
  typography: {
    fontFamily: ['"Titillium Web"', 'Geneva', 'Tahoma', 'sans-serif'].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    // Use the system font instead of the default Roboto font.
    // fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontWeight: 700,
          fontSize: '.92rem',
        },
      },
    },
  },
};


export const ConnectionList = () => (
  <List>
    <SimpleList
      primaryText={record => record.appName}
      secondaryText={record => record.realm}
      tertiaryText={
        // <ReferenceArrayField source="scopes" reference="scopes">
        //   <SingleFieldList>
        //     <TextField source="name" />
        //   </SingleFieldList>
        // </ReferenceArrayField>
        <ArrayField source="scopes">
          <SimpleList
            primaryText={record => record.name}
            secondaryText={record => record.description}
          />
        </ArrayField>
      }
      leftIcon={record => <AppShortcutIcon />}
    />
    {/* <Datagrid>
        <TextField source="id" />
        <ReferenceField source="subjectId" reference="subjects"><TextField source="id" /></ReferenceField>
        <ReferenceField source="clientId" reference="clients"><TextField source="id" /></ReferenceField>
        <TextField source="realm" />
        <TextField source="appName" />
        <ArrayField source="scopes"><SingleFieldList><ChipField source="scope" /></SingleFieldList></ArrayField>
      </Datagrid> */}
  </List>
);

export const ScopeList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="scope" />
      <TextField source="name" />
      <TextField source="description" />
      {/* <ReferenceField source="resourceId" reference="resources"><TextField source="id" /></ReferenceField> */}
      <TextField source="id" />
    </Datagrid>
  </List>
);

export const ScopeShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="scope" />
      <TextField source="name" />
      <RichTextField source="description" />
      <TextField label="ResourceId" source="resourceId" />
    </SimpleShowLayout>
  </Show>
);

const App = () => (
  <Container maxWidth="xl">
    <Admin title="AAC" disableTelemetry authProvider={authProvider} dataProvider={dataProvider} theme={myTheme} dashboard={dashboard} layout={MyLayout}>
      <Resource name="accounts" list={AccountList} />
      <Resource name="connections" list={ConnectionList} />
      {/* <Resource name="scopes" list={ScopeList} show={ScopeShow} /> */}

    </Admin>
  </Container>
);
export default App;
