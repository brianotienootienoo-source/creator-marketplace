export type Creator = {
  slug: string;
  name: string;
  avatar: string;
  category: string;
  followers: number;
};

export type Brand = {
  name: string;
  desc: string;
  demand: number;
};

export type Category = {
  name: string;
  trend: number;
};

export type MarketItem = {
  title: string;
  subtitle: string;
};

export type SmartFeed = {
  creators: Creator[];
  brands: Brand[];
  categories: Category[];
  market: MarketItem[];
};