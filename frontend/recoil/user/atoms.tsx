import { atom } from 'recoil';

// export const DEFAULT_USERSTATE: UserState = {
//     accessToken: '',
//     nickname: '',
// };

export const userState = atom<UserState>({
    key: 'userState',
    default: {
        accessToken: '',
        nickname: '',
    },
});
