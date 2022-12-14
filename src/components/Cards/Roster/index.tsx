import type { NextPage } from "next";
import Image from "next/image";
import { getCountryFlag } from "@services/country.api";
import { PLAYERS } from "@data/roster";
import styles from "./Roster.module.scss";

const Roster: NextPage = () => (
  <div className={styles.container}>
    <h1>Roster of 9z</h1>
    <div className={styles.roster}>
      {PLAYERS.map(
        ({
          first_name,
          image_url,
          last_name,
          name,
          nationality,
          isBenched,
        }) => (
          <div
            className={`${styles.player} ${isBenched && styles.benched}`}
            key={name}
          >
            <div className={styles.imageContainer}>
              <Image
                className={styles.backgroundLogo}
                src={
                  "https://cdn.pandascore.co/images/team/image/126709/9996.png"
                }
                width={180}
                height={180}
                objectFit="contain"
                loading="lazy"
                draggable="false"
                alt="player background"
              />
              <img
                className={styles.playerImage}
                src={image_url}
                alt={`player pic ${name}`}
                loading="lazy"
                draggable="false"
              />
            </div>

            <div className={styles.playerName}>
              <Image
                src={getCountryFlag(nationality)}
                width={24}
                height={24}
                title={nationality}
                objectFit="contain"
                loading="lazy"
                alt={`${nationality} flag`}
              />
              <span>{`"${name}"`}</span>
            </div>

            <p className={styles.playerFullName}>
              <span>{first_name}</span>
              <span className={styles.space} />
              <span>{last_name}</span>
            </p>

            {isBenched && <p className={styles.benchedTxt}>(Benched)</p>}
          </div>
        )
      )}
    </div>
  </div>
);

export const getStaticProps = () => {
  return {
    props: { roster: PLAYERS },
  };
};

export default Roster;
