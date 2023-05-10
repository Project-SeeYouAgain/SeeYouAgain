import Image from 'next/image';

interface ReviewProp {
    nickname: string;
    content: string;
    reviewScore: number;
    createdAt: string;
    reviewImgUrl: string;
}

function Review(data: ReviewProp) {
    return (
        <div>
            <div className="flex justify-between">
                <span>{data.nickname}</span>
                <span>{data.createdAt}</span>
            </div>
            <div className="flex">
                <div className="w-[20rem]">
                    <div>{data.reviewScore}</div>
                    <div>{data.content}</div>
                </div>
                <Image src={data.reviewImgUrl} alt="리뷰이미지" className="w-[20%] aspect-square" />
            </div>
        </div>
    );
}

export default Review;
