import React, { useState } from "react";
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
  SwitcherDivider
} from 'carbon-components-react';
import {
  UserAvatar20,
  Search20,
  Close20,
  Notification20,
  Grid16,
  IotPlatform16,
  Chat16 as Send,
  UserMultiple16 as BulkSend,
  Catalog16 as Logs,
  Logout16,
  AppSwitcher16 as RailSwitch,
  Dashboard32
} from '@carbon/icons-react';
import { Route, Switch, Link } from 'react-router-dom';
import Metrics from '../Metrics';
import SMS from '../SMS';
import Modem from '../Modem';
import NewSMS from '../../components/NewSMS';
import BulkSMS from '../../components/BulkSMS';


//setIsLoggedIn is parsed from the app component
const LogOut = (setIsLoggedIn) => {
  //log the user out by changing state
  setIsLoggedIn(false);
  //remove user token from session storage
  sessionStorage.removeItem('c-deck-token');
};

const DashBoard = ({ setIsLoggedIn }) => {
  //state hook to control left panel view
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSideNavRail, setIsSideNavRail] = useState(false);

  return (
    <>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="C | Deck">
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName href="#" prefix="">
                C | Deck
          </HeaderName>
              <HeaderNavigation aria-label="C | Deck">
                <HeaderMenuItem href="#"
                  onClick={() => setIsSideNavRail(!isSideNavRail)}>
                  {isSideNavRail ? <RailSwitch /> : <Grid16 />}
                </HeaderMenuItem>
                <HeaderMenuItem href="#">About</HeaderMenuItem>
              </HeaderNavigation>
              <HeaderGlobalBar>
                <HeaderGlobalAction
                  aria-label="Search">
                  <Search20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Notifications">
                  <Notification20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="User Avatar"
                  onClick={() => setIsPanelOpen(!isPanelOpen)}>
                  {isPanelOpen ? <Close20 /> : <UserAvatar20 />}
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
                    <SideNavMenuItem element={Link} to="/sms"><Logs className="centered-icon" /> SMS Logs</SideNavMenuItem>
                    <SideNavMenuItem element={Link} to="/new-sms"><Send className="centered-icon" /> New SMS</SideNavMenuItem>
                    <SideNavMenuItem element={Link} to="/bulk-sms"><BulkSend className="centered-icon" /> Bulk SMS</SideNavMenuItem>
                  </SideNavMenu>
                  <SideNavLink large renderIcon={IotPlatform16} element={Link} to="/modem">
                    Modems
                  </SideNavLink>
                </SideNavItems>
              </SideNav>
              <HeaderPanel aria-label="Header Panel" expanded={isPanelOpen}>
                <Switcher aria-label="Switcher Container">
                  <SwitcherItem aria-label="Link 1" href="#">
                    Profile
                  </SwitcherItem>
                  <SwitcherDivider />
                  <SwitcherItem
                    aria-label="logout"
                    onClick={() => LogOut(setIsLoggedIn)}
                  >
                    <Logout16 className="centered-icon" /> Logout
                 </SwitcherItem>
                </Switcher>
              </HeaderPanel>
            </Header>

            <Content id="main-content" className={isSideNavRail ? "bx--col-lg-15 bx--offset-lg-1" : "bx--col-lg-13 bx--offset-lg-3"}>
              <Switch>
                <Route exact path="/" component={Metrics} />
                <Route exact path="/sms" component={SMS} />
                <Route exact path="/sms/:modem" />
                <Route exact path="/new-sms" component={NewSMS} />
                <Route exact path="/bulk-sms" component={BulkSMS} />
                <Route exact path="/modem" component={Modem} />
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
