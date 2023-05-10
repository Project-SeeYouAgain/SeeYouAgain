import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

// const { persistAtom } = recoilPersist({
//     key: 'seesionStorage',
//     storage: sessionStorage,
// });

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
    // effects_UNSTABLE: [persistAtom],
});
