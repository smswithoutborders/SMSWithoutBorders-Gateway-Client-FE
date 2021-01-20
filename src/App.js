import './App.scss';

import {
  HeaderContainer,
  Header,
  HeaderName,
  SkipToContent,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  SideNav,
  SideNavItems,
  SideNavLink

} from 'carbon-components-react';

import {
  AppSwitcher20,
  Search20,
  Notification20,
  EmailNew32,
  Grid32,
  IotPlatform16
} from '@carbon/icons-react';

import { Route, Switch } from 'react-router-dom';
import { Content } from 'carbon-components-react';
const App = () => {

  return (
    <>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="Afkanerd C - Deck">
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                isCollapsible
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName href="#" prefix="">
                C | Deck
          </HeaderName>
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
                  aria-label="App Switcher">
                  <AppSwitcher20 />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              <SideNav
                aria-label="Side navigation"
                isRail
                defaultExpanded={true}
                expanded={isSideNavExpanded}
              >
                <SideNavItems>
                  <SideNavLink renderIcon={Grid32} href="#" large>
                    Dashboard
                </SideNavLink>
                  <SideNavLink renderIcon={EmailNew32} href="#" large>
                    SMS
                </SideNavLink>
                  <SideNavLink renderIcon={IotPlatform16} href="#" large>
                    Modems
                </SideNavLink>
                </SideNavItems>
              </SideNav>
            </Header>
          </>
        )}
      />
      
      <Content>
        <Switch>
          <Route exact path="/" />
          <Route path="/sms" />
          <Route path="/modems" />
        </Switch>
      </Content>
    </>
  );
}

export default App;
