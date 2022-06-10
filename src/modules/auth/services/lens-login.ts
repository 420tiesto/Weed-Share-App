import { Dispatch } from 'redux';
import { generateChallenge } from './generate-challengs';
import { authenticate } from './autenticate';
import { init, signText } from '../../../services/ethers-service';
import { storeLensToken } from '../../../state/actions';
import { LENS_TOKENS } from '../../../utils/local-storage/keys';
import { setStorageValue } from '../../../utils/local-storage/local-storage';

/**
 * Logs in the user to the app.
 *
 * This usually needs a wallet to be present. If this is not the case, a local wallet is created instead.
 */
export function login() {
    return async (dispatch: Dispatch) => {
        // we grab the address of the connected wallet
        const address = await init();

        // we request a challenge from the server
        const challengeResponse = await generateChallenge(address);

        // sign the text with the wallet
        const signature = await signText(challengeResponse.data.challenge.text);

        // authToken is stored in memory, only refreshToken is persisted
        const tokens = await authenticate(address, signature);
        dispatch(storeLensToken(tokens.data.authenticate));
        setStorageValue(LENS_TOKENS, JSON.stringify(tokens.data.authenticate));
        console.log(tokens, 'tokens');
        return tokens;
    };
}
