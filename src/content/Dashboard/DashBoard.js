import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Content,
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavMenu,
  SideNavMenuItem,
  SideNavItems,
  SideNavLink,
  HeaderPanel,
  SwitcherItem,
  Switcher,
  SwitcherDivider,
  Modal,
  ModalBody
} from 'carbon-components-react';
import {
  UserAvatar16,
  Close20,
  Notification20,
  Grid16,
  IotPlatform16,
  Chat16 as Send,
  UserMultiple16 as BulkSend,
  Catalog16 as Logs,
  Logout16,
  Switcher16 as RailSwitch,
  Switcher20,
  Dashboard32,
  Settings16,
  CircleFilled20
} from '@carbon/icons-react';

import { Route, Switch, Link } from 'react-router-dom';
import { logOut } from "../../services/auth.service";
import { getServiceState } from "../../services/settings.service";
import Metrics from '../Metrics';
import SMS from '../SMS';
import Modem from '../Modem';
import NewSMS from '../NewSMS';
import BulkSMS from '../BulkSMS';
import Profile from '../Profile';
import Settings from '../Settings';


const DashBoard = ({ setIsLoggedIn }) => {
  //state hook to control left panel view
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSideNavRail, setIsSideNavRail] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [serviceState, setServiceState] = useState();
  let color = serviceState === "active" ? "green" : "red";


  useEffect(() => {
    getServiceState()
      .then(response => {
        setServiceState(response.state);
      })
      .catch((error) => {
        // Error 😨
        if (error.response) {
          setServiceState("inactive");
        } else if (error.request) {
          setServiceState("failed");
        } else {
          setServiceState("failed");
        }
      });
  }, []);

  return (
    <>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="Header">
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName href="#" prefix="">
                Deku SMS Manager
              </HeaderName>
              <HeaderNavigation aria-label="Main Navigation">
                <HeaderMenuItem
                  onClick={() => setIsSideNavRail(!isSideNavRail)}>
                  {isSideNavRail ? <RailSwitch /> : <Grid16 />}
                </HeaderMenuItem>
                <HeaderMenuItem
                  onClick={() => setIsAboutOpen(!isAboutOpen)}>
                  About
                </HeaderMenuItem>
              </HeaderNavigation>
              <HeaderGlobalBar>
                <HeaderGlobalAction
                  aria-label={"Deku Service " + serviceState}>
                  <CircleFilled20
                    style={{ color: color }}
                  />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Notifications">
                  <Notification20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Menu"
                  onClick={() => setIsPanelOpen(!isPanelOpen)}>
                  {isPanelOpen ? <Close20 /> : <Switcher20 />}
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              <SideNav aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isRail={isSideNavRail}
              >
                <SideNavItems>
                  <SideNavLink large renderIcon={Dashboard32} element={Link} to="/">
                    Dashboard
                  </SideNavLink>
                  <SideNavMenu large renderIcon={Send} title="SMS" >
                    <SideNavMenuItem element={Link} to="/sms"><Logs className="dash-centered-icon" /> SMS Logs</SideNavMenuItem>
                    <SideNavMenuItem element={Link} to="/new-sms"><Send className="dash-centered-icon" /> New SMS</SideNavMenuItem>
                    <SideNavMenuItem element={Link} to="/bulk-sms"><BulkSend className="dash-centered-icon" /> Bulk SMS</SideNavMenuItem>
                  </SideNavMenu>
                  <SideNavLink large renderIcon={IotPlatform16} element={Link} to="/modem">
                    Modems
                  </SideNavLink>
                  <SideNavLink large renderIcon={Settings16} element={Link} to="/settings">
                    Settings
                  </SideNavLink>
                </SideNavItems>
              </SideNav>
              <HeaderPanel aria-label="Header Panel" expanded={isPanelOpen}>
                <Switcher aria-label="Switcher Container">
                  <SwitcherItem
                    aria-label="profile"
                    element={Link} to="/profile"
                    onClick={() => setIsPanelOpen(!isPanelOpen)}
                  >
                    <UserAvatar16 className="dash-centered-icon" /> Profile
                  </SwitcherItem>
                  <SwitcherDivider />
                  <SwitcherItem
                    aria-label="settings"
                    element={Link} to="/settings"
                    onClick={() => setIsPanelOpen(!isPanelOpen)}
                  >
                    <Settings16 className="dash-centered-icon" /> Settings
                  </SwitcherItem>
                  <SwitcherDivider />
                  <SwitcherItem
                    aria-label="logout"
                    onClick={() => logOut(setIsLoggedIn)}
                  >
                    <Logout16 className="dash-centered-icon" /> Logout
                  </SwitcherItem>
                  <SwitcherDivider />
                </Switcher>
              </HeaderPanel>
            </Header>

            <Modal
              open={isAboutOpen}
              modalLabel="About"
              modalAriaLabel="About Deku SMS Manager"
              passiveModal
              onRequestClose={() => setIsAboutOpen(!isAboutOpen)}>

              <ModalBody>
                <div className="header-group">
                  <Dashboard32 className="dash-centered-icon" /><span>Afkanerd</span>
                </div>
                <br />
                <h3><strong>Deku SMS Manager</strong></h3>
                <br />
                <div className="version-number">
                  <p>Version number</p>
                  <p>1.0.0</p>
                </div>
              </ModalBody>

            </Modal>

            <Content id="main-content" className={isSideNavRail ? "bx--col-lg-16 panel-left-margin" : "bx--col-lg-13 bx--offset-lg-3"}>
              <Switch>
                <Route exact path="/" component={Metrics} />
                <Route exact path="/sms" component={SMS} />
                <Route exact path="/new-sms" component={NewSMS} />
                <Route exact path="/bulk-sms" component={BulkSMS} />
                <Route exact path="/modem" component={Modem} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/settings" component={Settings} />
              </Switch>
            </Content>
          </>
        )}
      />
    </>
  );
};

DashBoard.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired
}

export default DashBoard;
