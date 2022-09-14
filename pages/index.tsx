import { useState } from "react";
import type { NextPage } from "next";
import getTeamMatches from "@api/getters/team-matches/getTeamMatches";
import TopBar from "@ui/top-bar";
import HistoricMatches from "@sections/historic-matches";
import TeamSummary from "@sections/team-summary";
import UpcomingMatches from "@sections/upcoming-matches";
import { ESection } from "@constants/enums";
import { TSections } from "types/sections";
import { TMatch, TStats } from "types/api";
import styles from "./index.module.scss";

interface IProps {
  historic_matches: TMatch[];
  upcoming_matches: TMatch[];
  team_stats: TStats;
}

const index: NextPage<IProps> = ({
  historic_matches,
  upcoming_matches,
  team_stats,
}) => {
  const [section, setSection] = useState(ESection.SUMMARY);
  console.log(historic_matches, upcoming_matches, team_stats);

  const handleSection = (section: TSections) => {
    setSection(section);
  };

  const SECTIONS = {
    [ESection.SUMMARY]: <TeamSummary handleSection={handleSection} />,
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

export const getStaticProps = async () => {
  const matches = await getTeamMatches();

  return {
    props: matches,
    revalidate: 1000,
  };
};

export default index;
