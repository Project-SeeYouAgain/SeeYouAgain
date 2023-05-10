import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

// export const DEFAULT_USERSTATE: UserState = {
//     accessToken: '',
//     nickname: '',
// };
const { persistAtom } = recoilPersist();

export const userState = atom<UserState>({
    key: 'userState',
    default: {
        accessToken: '',
        nickname: '',
        id: '',
        profileImg: '',
        location: '',
        mannerScore: '',
    },
    effects_UNSTABLE: [persistAtom],
});
