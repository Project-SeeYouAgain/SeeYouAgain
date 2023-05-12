import { FaHeart, FaUserCog, FaQuestionCircle, FaListAlt, FaShoppingBag } from 'react-icons/fa';

export const MenuData1 = [
    {
        title: '찜 목록',
        url: '/mypage/cart',
        icon: FaHeart,
    },
    {
        title: '대여 받은 내역',
        url: '/mypage/rent',
        icon: FaShoppingBag,
    },
    {
        title: '내 아이템 관리',
        url: '/mypage/myitem',
        icon: FaListAlt,
    },
];

export const MenuData2 = [
    {
        title: '프로필 수정',
        url: '/mypage/settings',
        icon: FaUserCog,
    },
    {
        title: '자주 묻는 질문',
        url: '/자주 묻는 질문',
        icon: FaQuestionCircle,
    },
];
