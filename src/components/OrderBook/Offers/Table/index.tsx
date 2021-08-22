import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import { Offer } from "src/types/Offer";
import { shorten } from "src/utils";
import classes from "./styles.module.css";

type Props = {
  type: "bid" | "ask";
  offers: Offer[] | undefined;
  currencyOne: string;
  currencyTwo: string;
  limit: number;
};

const Table = ({ type, offers, currencyOne, currencyTwo, limit }: Props) => {
  return (
    <div className={classes.root}>
      <div className={classes.titleBox}>
        <h3
          className={clsx(
            classes.title,
            offers && classes.titleAnimation,
            type === "bid" ? classes.bidTitle : classes.askTitle
          )}
        >
          {type === "bid" ? "Bid" : "Ask"}
        </h3>
      </div>

      {!offers ? (
        <>
          {Array.from(Array(limit + 1)).map(() => (
            <Skeleton height={20} className={classes.skeleton} />
          ))}
        </>
      ) : (
        <>
          <div className={classes.table}>
            <div className={clsx(classes.row, classes.headerRow)}>
              <div className={classes.rateCell}>Kurs</div>
              <div className={classes.currencyOneCell}>
                Ilość waluty ({currencyOne})
              </div>
              <div className={classes.currencyTwoCell}>
                Wartość ({currencyTwo})
              </div>
              <div className={classes.offersAmountCell}>Ilość ofert</div>
            </div>
            {offers.map((offer) => {
              const totalPrice = (
                parseFloat(offer.ra) * parseFloat(offer.ca)
              ).toString();

              return (
                <div className={classes.row}>
                  <div className={classes.rateCell}>{offer.ra}</div>
                  <div className={classes.currencyOneCell}>
                    {shorten(offer.ca, 15)}
                  </div>
                  <div className={classes.currencyTwoCell}>
                    {shorten(totalPrice, 20)}
                  </div>
                  <div className={classes.offersAmountCell}>{offer.co}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
