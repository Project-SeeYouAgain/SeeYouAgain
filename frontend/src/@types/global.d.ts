interface UserState {
    accessToken: string | null;
    nickname: string | null;
    id: string | null;
    profileImg: string | null;
    location: string | null;
    mannerScore: string | null;
}

interface ProductState {
    refreshKey: number;
}

interface ReservationIdState {
    reservationId: number;
    title: string;
}

interface ReviewState {
    review: number;
}
