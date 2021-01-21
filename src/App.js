import './App.scss';

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
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
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
SideNav.displayName = 'SideNav';
SideNavMenu.displayName = 'SideNavMenu';
SideNavMenuItem.displayName = 'SideNavMenuItem';

const App = () => {

  return (
    <>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="IBM Platform Name">
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName href="#" prefix="">
                C - Deck
          </HeaderName>
              <HeaderNavigation aria-label="C - Deck">
                <HeaderMenuItem href="#">API</HeaderMenuItem>
                <HeaderMenuItem href="#">Docs</HeaderMenuItem>
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
                  aria-label="App Switcher">
                  <AppSwitcher20 />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
                <SideNavItems>
                  <SideNavLink large renderIcon={Grid32} href="/">
                    Dashboard
              </SideNavLink>
                  <SideNavLink large renderIcon={EmailNew32} href="/">
                    SMS
              </SideNavLink>
                  <SideNavLink large renderIcon={IotPlatform16} href="#">
                    Modems
              </SideNavLink>
                </SideNavItems>
              </SideNav>
            </Header>

            <Content id="main-content" className="bx--col-lg-13 bx--offset-lg-3">
              <Switch>
                <Route exact path="/" />
                <Route exact path="/sms" />
                <Route exact path="/sms/:modem" />
                <Route exact path="/modems" />
              </Switch>
            </Content>
          </>
        )}
      />
    </>
  );
}

export default App;
