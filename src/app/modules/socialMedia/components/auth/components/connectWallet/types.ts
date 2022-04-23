import { statusTypes } from './constants';

type Keys = keyof typeof statusTypes;
export type Status = typeof statusTypes[Keys];