// eslint-disable-next-line import/prefer-default-export
export const getRandomIdx = (): string =>
  Math.random().toString(36).substr(2, 5);
