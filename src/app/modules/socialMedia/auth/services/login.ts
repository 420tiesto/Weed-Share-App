import { init, signText } from '../../../../services/ethers-service';
import { generateChallenge } from './generate-challengs';
import { authenticate } from './autenticate';
/**
 * Logs in the user to the app.
 *
 * This usually needs a wallet to be present. If this is not the case, a local wallet is created instead.
 */
 export async function login() {
    // we grab the address of the connected wallet
    const address = await init();

    // we request a challenge from the server
    const challengeResponse = await generateChallenge(address);

    // sign the text with the wallet
    const signature = await signText(challengeResponse.data.challenge.text);

    // authToken is stored in memory, only refreshToken is persisted
    const tokens = await authenticate(address, signature);
    return tokens;
}