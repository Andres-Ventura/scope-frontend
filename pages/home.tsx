import Image from "next/image";
import Profile from "@/public/dialogica_logo.png";
import Settings from "@/public/Settings.svg";
import React, { useState } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import { NavHeader } from "@/webComponents/mainnav";
// import { Main } from "@/webComponents/main";
import { CompanyGrid } from "@/components/Companies/companies";
import { ChatTab } from "@/components/Chat/chat";

import { MyBusiness } from "@/components/MyBusiness/mybusiness";
// import { SettingsPage } from "@/components/Settings/settings";

import { Footer } from "@/webComponents/footer";
import { Join } from "@/webComponents/join";

interface MainProps {
  className?: string;
}

export const Home: React.FC<MainProps> = ({ className }) => {
  const [activeComponent, setActiveComponent] = useState<
    "My_Business" | "Competitors" | "Settings" | "Chat"
  >("Chat");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Chat":
        return <ChatTab />;
      case "Competitors":
        return <CompanyGrid />;
      case "My_Business":
        return <MyBusiness />;
      // case "Settings":
      //   return <SettingsPage />;
      // default:
      //   return <Main />;
    }
  };

  return (
    <div className={classNames(styles.root)}>
      <div className={styles.sidebar}>
        <ul className={styles.menu}>
          <li
            className={activeComponent === "Chat" ? styles.activeTab : ""}
            onClick={() => setActiveComponent("Chat")}
          >
            Chat
          </li>
          <li
            className={
              activeComponent === "Competitors" ? styles.activeTab : ""
            }
            onClick={() => setActiveComponent("Competitors")}
          >
            Competitors
          </li>
          <li
            className={
              activeComponent === "My_Business" ? styles.activeTab : ""
            }
            onClick={() => setActiveComponent("My_Business")}
          >
            My Business
          </li>
          {/* <li
            className={activeComponent === "Settings" ? styles.activeTab : ""}
            onClick={() => setActiveComponent("Settings")}
          >
            Settings
          </li> */}
        </ul>
      </div>
      <div className={styles.mainContent}>{renderComponent()}</div>
    </div>
  );
};

export default Home;
