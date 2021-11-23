import React, { useState, Fragment } from "react";
import {
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavMenu,
  SideNavMenuItem,
  SideNavItems,
  SideNavLink,
  Modal,
  ModalBody
} from 'carbon-components-react';
import {
  IotPlatform16,
  Chat16 as Send,
  UserMultiple16 as BulkSend,
  Dashboard32,
  Settings16,
  CircleFilled20,
  Help20,
  Settings20
} from '@carbon/icons-react';

import { useAppContext } from "store";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo-icon-light.png";

const Navbar = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const navigate = useNavigate();
  const { serviceState } = useAppContext();
  let color = serviceState === "active" ? "#198038" : "#da1e28";

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Fragment>
          <Header aria-label="Header">
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName href="#" prefix="">
              <img
                src={Logo}
                alt="SMSwithoutborders logo"
                height={20}
                width={20}
              />
              &nbsp;
              <span> SMSwithoutborders</span>
            </HeaderName>
            <HeaderNavigation aria-label="Main Navigation">
              <HeaderMenuItem
                element={Link}
                to="/"
              >
                Dashboard
              </HeaderMenuItem>

              <HeaderMenuItem
                element={Link}
                to="/modems"
              >
                Modems
              </HeaderMenuItem>
              <HeaderMenuItem
                element={Link}
                to="/new-sms"
              >
                New SMS
              </HeaderMenuItem>
            </HeaderNavigation>
            <HeaderGlobalBar>
              <HeaderGlobalAction aria-label={"Gateway Service " + serviceState}>
                <CircleFilled20 style={{ fill: color }} />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="About"
                onClick={() => setIsAboutOpen(!isAboutOpen)}
              >
                <Help20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="Settings"
                onClick={() => navigate("/settings")}
              >
                <Settings20 />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              isPersistent={false}
            >
              <SideNavItems>
                <SideNavLink large renderIcon={Dashboard32} element={Link} to="/">
                  Dashboard
                </SideNavLink>
                <SideNavMenu large renderIcon={Send} title="Logs">
                  <SideNavMenuItem
                    element={Link}
                    to="/new-sms"
                  >
                    <Send className="dash-centered-icon" /> New SMS
                  </SideNavMenuItem>
                  <SideNavMenuItem
                    element={Link}
                    to="/bulk-sms"
                  >
                    <BulkSend className="dash-centered-icon" /> Bulk SMS
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavLink
                  large
                  renderIcon={IotPlatform16}
                  element={Link}
                  to="/modems"
                >
                  Modems
                </SideNavLink>
                <SideNavLink
                  large
                  renderIcon={Settings16}
                  element={Link}
                  to="/settings">
                  Settings
                </SideNavLink>
              </SideNavItems>
            </SideNav>
          </Header>

          <Modal
            open={isAboutOpen}
            modalLabel="About"
            modalAriaLabel="About"
            passiveModal
            onRequestClose={() => setIsAboutOpen(!isAboutOpen)}
          >
            <ModalBody className="about-modal">
              <div classname="header-group">
                <img
                  src={Logo}
                  alt="SMSwithoutborders logo"
                  className="logo"
                />
                <h3>SMSwithoutborders</h3>
              </div>
              <br />
              <div className="version-number">
                <p>Version number</p>
                <p>1.0.0</p>
              </div>
            </ModalBody>
          </Modal>
        </Fragment>
      )}
    />
  );
};

export default Navbar;
