export type Offer = {
  ra: string;
  ca: string;
  sa: string;
  pa: string;
  co: number;
};

export type OfferDetailed = {
  status: string;
  sell: Offer[];
  buy: Offer[];
  timestamp: string;
  seqNo: string;
};
