import { useState } from "react";
import type { NextPage } from "next";
import TopBar from "@ui/top-bar";
import HistoricMatches from "@sections/historic-matches";
import TeamSummary from "@sections/team-summary";
import UpcomingMatches from "@sections/upcoming-matches";
import { ESection } from "@constants/enums";
import { TSections } from "types/sections";
import styles from "./index.module.scss";

const index: NextPage = () => {
  const [section, setSection] = useState(ESection.SUMMARY);

  const handleSection = (section: TSections) => {
    setSection(section);
  };

  const SECTIONS = {
    [ESection.SUMMARY]: <TeamSummary />,
    [ESection.UPCOMING]: <UpcomingMatches />,
    [ESection.HISTORIC]: <HistoricMatches />,
  };

  return (
    <div className={styles.mainFrame}>
      <TopBar section={section} handleSection={handleSection} />
      {SECTIONS[section]}
    </div>
  );
};

export default index;