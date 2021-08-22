import { Market } from "src/types/Market";
import { StatsDetailed } from "src/types/Stats";
import useSWR from "swr";
import classes from "./styles.module.css";

type Props = {
  selectedMarket: Market;
  markets: Market[];
  changeMarket: (code: string) => void;
};

const TopBar = ({ selectedMarket, markets, changeMarket }: Props) => {
  const { data, error } = useSWR<StatsDetailed>(
    `https://api.bitbay.net/rest/trading/stats/${selectedMarket.market.code}`
  );

  const spread =
    parseFloat(selectedMarket.lowestAsk) -
    parseFloat(selectedMarket.highestBid);

  return (
    <div className={classes.root}>
      <div>
        <select
          value={selectedMarket.market.code}
          onChange={(e) => changeMarket(e.target.value)}
          className={classes.select}
        >
          {markets.map((market) => (
            <option key={market.market.code} value={market.market.code}>
              {market.market.code}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>Spread: {spread}</p>
      </div>
      <div className={classes.statsBox}>
        {error ? (
          <p className={classes.errorMessage}>
            Błąd pobierania danych z 24h. <br />
            Odśwież stronę i spróbuj ponownie.
          </p>
        ) : (
          <>
            <p>
              24h max{" "}
              {!data ? "..." : !data.stats.h ? "(brak danych)" : data.stats.h}
            </p>
            <p>
              24h min{" "}
              {!data ? "..." : !data.stats.l ? "(brak danych)" : data.stats.l}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
