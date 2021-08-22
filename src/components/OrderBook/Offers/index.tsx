import Message from "src/components/Message";
import { OfferDetailed } from "src/types/Offer";
import useSWR from "swr";
import classes from "./styles.module.css";
import Table from "./Table";

const limit = 10;

type Props = {
  code: string;
};

const Offers = ({ code }: Props) => {
  const { data, error } = useSWR<OfferDetailed>(
    `https://api.bitbay.net/rest/trading/orderbook-limited/${code}/${limit}`,
    {
      refreshInterval: 1000
    }
  );

  if (error)
    return (
      <Message error>
        Wystąpił błąd pobierania ofert. <br />
        Odśwież stronę i spróbuj ponownie.
      </Message>
    );

  const currencyOne = code.split("-")[0];
  const currencyTwo = code.split("-")[1];

  return (
    <div className={classes.root}>
      <Table
        type="bid"
        offers={data?.buy}
        currencyOne={currencyOne}
        currencyTwo={currencyTwo}
        limit={limit}
      />
      <Table
        type="ask"
        offers={data?.sell}
        currencyOne={currencyOne}
        currencyTwo={currencyTwo}
        limit={limit}
      />
    </div>
  );
};

export default Offers;
