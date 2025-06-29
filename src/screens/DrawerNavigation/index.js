import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AuditFormScreen from '../AuditFormScreen';
import CustomDrawer from '../../components/CustomDrawer';
import AuditHistoryScreen from '../AuditHistoryScreen';
import PolicyViewerScreen from '../PolicyViewerScreen';
import AuditSummaryScreen from '../AuditSummaryScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="AuditForm"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: 'transparent',
          width: '85%',
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="AuditForm" component={AuditFormScreen} />
      <Drawer.Screen name="AuditHistory" component={AuditHistoryScreen} />
      <Drawer.Screen name="PolicyViewer" component={PolicyViewerScreen} />
      <Drawer.Screen name="AuditSummary" component={AuditSummaryScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
