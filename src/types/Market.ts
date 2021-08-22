export type Market = {
  market: {
    code: string;
    first: {
      currency: string;
      minOffer: string;
      scale: number;
    };
    second: {
      currency: string;
      minOffer: string;
      scale: number;
    };
  };
  time: string;
  highestBid: string;
  lowestAsk: string;
  rate: string;
  previousRate: string;
};
