import { useEffect, useState } from "react";
import { Market } from "src/types/Market";
import classes from "./styles.module.css";
import Offers from "./Offers";
import TopBar from "./TopBar";
import useSWR from "swr";
import Message from "../Message";

const DEFAULT_MARKET_CODE = "BTC-PLN";

const OrderBook = () => {
  const { data, error } = useSWR(`https://api.bitbay.net/rest/trading/ticker`);

  const [isLoading, setIsLoading] = useState(true);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [market, setMarket] = useState<Market | null>(null);

  useEffect(() => {
    if (data && isLoading) {
      const tickerItems: { [key: string]: Market } = data.items;

      const newMarkets = Object.entries(tickerItems)
        .map(([, value]) => value)
        .sort((a, b) => a.market.code.localeCompare(b.market.code));

      setMarkets(newMarkets);

      const market = newMarkets.find(
        (market) => market.market.code === DEFAULT_MARKET_CODE
      );

      setMarket(market || null);
      setIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const changeMarket = (code: string) => {
    const newMarket = markets.find((market) => market.market.code === code);
    setMarket(newMarket || null);
  };

  const content = error ? (
    <Message error>
      Wystąpił błąd pobierania danych. <br />
      Odśwież stronę i spróbuj ponownie.
    </Message>
  ) : isLoading ? (
    <Message>Trwa pobieranie danych...</Message>
  ) : !market ? (
    <Message error>
      Nie znaleziono rynku dla wybranej pary walutowej. <br />
      Odśwież stronę i spróbuj ponownie.
    </Message>
  ) : (
    <>
      <TopBar
        selectedMarket={market}
        markets={markets}
        changeMarket={changeMarket}
      />
      <Offers code={market.market.code} />
    </>
  );

  return (
    <div className={classes.root}>
      <div className={classes.orderBook}>{content}</div>
    </div>
  );
};

export default OrderBook;
