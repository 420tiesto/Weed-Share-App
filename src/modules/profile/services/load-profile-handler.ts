import { init } from '../../../services/ethers-service';
import { getProfiles } from './get-profiles';

async function loadProfiles() {
    const address = await init();
    const getProfileRequest = {
        ownedBy: [address],
    };
    const response = await getProfiles(getProfileRequest);
    return response;
}
export default loadProfiles;
