import { createAction } from '@reduxjs/toolkit';
import { type AuthTokens } from '../../types';

const storeLensToken = createAction<AuthTokens>('STORE_LENS_TOKENS');

export { storeLensToken };