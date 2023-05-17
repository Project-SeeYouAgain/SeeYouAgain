import { atom, useResetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: typeof window === 'undefined' ? undefined : sessionStorage,
});

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

export const productState = atom<ProductState>({
    key: 'productState',
    default: {
        refreshKey: 0,
    },
    effects_UNSTABLE: [persistAtom],
});

export const reservationIdState = atom<ReservationIdState>({
    key: 'reservationIdState',
    default: {
        reservationId: 0,
        title: '',
    },
    effects_UNSTABLE: [persistAtom],
});
