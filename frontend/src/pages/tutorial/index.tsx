import Container from '@/components/Container';
import CloseHeader from '@/components/Container/components/CloseHeader';
import { useRouter } from 'next/router';
import logo from '@/images/logo.png';
import icon1 from '@/images/protection.png';
import icon2 from '@/images/maps.png';
import icon3 from '@/images/care.png';
import icon4 from '@/images/money-bag.png';
import icon5 from '@/images/writing.png';
import icon6 from '@/images/borrow.png';
import icon7 from '@/images/search.png';
import icon8 from '@/images/review.png';

import React from 'react';
import Image from 'next/image';
import Body from '@/components/Container/components/Body';

function Tutorial() {
    const router = useRouter();
    function onclose() {
        router.back();
    }

    return (
        <Container>
            <div className="border-b">
                <CloseHeader title="씨유어게인 사용법" onClose={onclose}></CloseHeader>
            </div>
            <Body>
                <div id="tuto_top" className="mb-8">
                    <Image src={logo} alt="logo" width={80} className="m-auto mt-4" />
                    <div className="font-NanumNeo font-bold mt-5">
                        <p className="text-center"> 더 풍요로운 동네 생활을 만드는 </p>
                        <p className="text-center"> 씨유어게인, 어떻게 이용할까요? </p>
                    </div>
                </div>
                {/* 공통 */}
                <div className="grid grid-cols-[1fr,3fr] -m-1">
                    <div className=" h-20 rounded-xl bg-blue text-white px-6 py-5 font-NanumNeo ">
                        <div className=" rounded-full bg-white w-10 h-10 text-center font-NanumNeoEB py-2 text-blue "> 0 </div>
                    </div>
                    <div className=" h-20 rounded-xl bg-blue text-white text-left px-5 text-lg py-3 font-NanumNeoEB ">
                        <div>
                            <p>안전한 대여,</p>
                            <p>씨유어게인이 만들어요!</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 mb-5">
                    <div className="grid grid-cols-[1fr,3fr] border-b border-[#000000] mb-3">
                        <Image src={icon1} alt="icon" width={50} className="mb-5 ml-3"></Image>
                        <span>
                            <p className="font-bold">불안한 대면 거래는 끝!</p>
                            <p>세이프존으로 안전한 장소에서 거래해요.</p>
                        </span>
                    </div>
                    <div className="grid grid-cols-[1fr,3fr] border-b border-black mb-3">
                        <Image src={icon2} alt="icon" width={55} className="mb-5 ml-3 "></Image>
                        <span>
                            <p className="font-bold">어디까지 오셨어요?</p>
                            <p>실시간 위치공유로 편하게 만나요.</p>
                        </span>
                    </div>
                    <div className="grid grid-cols-[1fr,3fr] ">
                        <Image src={icon3} alt="icon" width={55} className="mb-5 ml-3"></Image>
                        <span>
                            <p className="font-bold">자원의 재활용으로</p>

                            <p>환경과 이웃들의 행복을 지켜요!</p>
                        </span>
                    </div>
                </div>
                {/* 구해요 */}
                <div className="grid grid-cols-[1fr,3fr] -m-1">
                    <div className=" h-20 rounded-xl bg-blue text-white text-center px-6 py-5  text-lg py-6 font-NanumNeo font-bold">
                        <div className=" rounded-full bg-white w-10 h-10 text-center font-NanumNeoEB py-2 text-blue "> 1 </div>
                    </div>
                    <div className=" h-20 rounded-xl bg-blue text-white text-left px-5 text-lg py-3 font-NanumNeoEB ">
                        <div>
                            <p>'빌려줘요'</p>
                            <p>쏠쏠한 수익을 얻어요</p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 mb-5">
                    <div className="grid grid-cols-[1fr,3fr] border-b border-[#000000] mt-8 mb-3">
                        <Image src={icon4} alt="icon" width={50} className="mb-3  ml-4"></Image>
                        <span className="mb-5">
                            <p className="font-bold">매일 쓰는 상품이 아니라면,</p>
                            <p>나보다 더 필요한 사람에게 잠시 빌려주는건 어떠세요? 대여 수익도 쌓을 수 있어요.</p>
                        </span>
                    </div>
                    <div className="grid grid-cols-[1fr,3fr]  mb-3">
                        <Image src={icon5} alt="icon" width={50} className="mb-3 mt-4 ml-5 "></Image>
                        <span className="mb-5 ">
                            <p className="font-bold">대여해 줄 상품을 골랐다면,</p>
                            <p>게시글을 올려 이웃에게 알려보세요. 대여 일정과 거래 장소, 상품 내용을 입력한 다음 연락을 기다립니다.</p>
                        </span>
                    </div>
                </div>
                {/* 빌려줘요 */}
                <div className="grid grid-cols-[1fr,3fr] -m-1">
                    <div className=" h-20 rounded-xl bg-blue text-white text-center px-6 py-5   text-lg py-6 font-NanumNeo font-bold">
                        <div className=" rounded-full bg-white w-10 h-10 text-center font-NanumNeoEB py-2 text-blue "> 2 </div>
                    </div>
                    <div className=" h-20 rounded-xl bg-blue text-white text-left px-5 text-lg py-3 font-NanumNeoEB ">
                        <div>
                            <p>'구해요'</p>
                            <p>사지 않고 빌려요</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 mb-5">
                    <div className="grid grid-cols-[1fr,3fr] border-b border-[#000000] mb-3">
                        <Image src={icon6} alt="icon" width={55} className="mb-5 ml-3"></Image>
                        <span className="mb-5">
                            <p className="font-bold">잠시 쓰고 싶은 상품이 있다면,</p>
                            <p>이웃에게 빌려보는 건 어떠세요? 쓸모없는 지출을 줄이고, 환경도 살릴 수 있어요.</p>
                        </span>
                    </div>
                    <div className="grid grid-cols-[1fr,3fr] border-b border-black mb-3">
                        <Image src={icon7} alt="icon" width={55} className="mb-5 mt-2 ml-3 "></Image>
                        <span className="mb-5">
                            <p className="font-bold">대여하고 싶은 상품을</p>
                            <p>검색을 통해 찾아봐요. 대여 일정과 만남 장소를 확인 후 예약해요.</p>
                        </span>
                    </div>
                    <div className="grid grid-cols-[1fr,3fr] ">
                        <Image src={icon8} alt="icon" width={55} className="mb-5 ml-3"></Image>
                        <span className="mb-5">
                            <p className="font-bold">상품을 잘 이용했다면 </p>

                            <p> 반납 후 리뷰와 평점을 남겨보세요.</p>
                        </span>
                    </div>
                </div>
            </Body>
        </Container>
    );
}

export default Tutorial;
