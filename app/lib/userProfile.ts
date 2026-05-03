export type UserProfile = {
  interests: Record<string, number>;
};

export const defaultUserProfile: UserProfile = {
  interests: {
    Music: 0.7,
    Fitness: 0.5,
    Comedy: 0.6,
    Tech: 0.4,
    Fashion: 0.8,
  },
};