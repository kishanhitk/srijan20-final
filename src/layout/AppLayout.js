import React, { useState } from 'react';
import { Link, Switch as RouteSwitch, Route } from 'react-router-dom';
import { Layout, Dropdown, Menu, Drawer, Icon } from 'antd';
import { routes } from '../routes';
import './AppLayout.css';

const { Header, Footer, Sider, Content } = Layout;

const AppLayout = props => {
  console.log('[AppLayout.js]')
  const { username, handleSignOut } = props;
  const [drawerVisible, setDrawerVisible] = useState(false);
  const onDrawerClose = () => setDrawerVisible(false);

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/app/profile">
          <Icon type="profile" />&nbsp;
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleSignOut}>
        <Icon type="logout" />
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ maxHeight: '100vh' }}>
      <Drawer
          title="Srijan 20"
          placement="left"
          closable={true}
          onClose={onDrawerClose}
          visible={drawerVisible}>
          <Menu mode="inline">
            <Menu.Item>
              <Link to="/app/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/app/events">Events</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/app/merchandise">Merchandise</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/app/talks">Talks</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/app/team">Team</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/app/technofries">Technofries</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/app/workshops">Workshops</Link>
            </Menu.Item>
          </Menu>
      </Drawer>
      <Header className="navigation" style={{ height: '8vh' }} theme="dark">
        <Icon type="bars" className="appdrawer-icon" onClick={e => setDrawerVisible(true)} />
        <span className="nav-brand">Srijan 20</span>
        <Dropdown.Button overlay={dropdownMenu}>
          <Icon type="user" /> ({username})
        </Dropdown.Button>
      </Header>
      <Layout>
        <Sider className="dashboard-sider">
          <Menu theme="dark" mode="inline">
            <Menu.Item>
              <Link to="/app/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/app/events">Events</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/app/merchandise">Merchandise</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/app/talks">Talks</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/app/team">Team</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/app/technofries">Technofries</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/app/workshops">Workshops</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ overflowY: 'auto' }}>
          <Content>
            <RouteSwitch>
              {routes.map((route, index) => {
                return <Route key={index} path={route.layout + route.path} component={route.component} />
              })}
            </RouteSwitch>
            <Footer style={{ textAlign: 'center' }}>Srijan 20 Made with &#9829; by the Faculty of Engineering And Technology Students' Union, <br/> Jadavpur University <br/>Salt Lake Campus Plot No.8, Salt Lake Bypass, LB Block, Sector III, Salt Lake City, Kolkata 700106. </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default AppLayout;