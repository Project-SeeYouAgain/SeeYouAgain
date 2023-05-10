import Image from 'next/image';
import StarRate from './StarRate';

interface ReviewProp {
    nickname: string;
    content: string;
    reviewScore: number;
    createdAt: string;
    reviewImgUrl: string;
}

function Review(data: ReviewProp) {
    return (
        <div className="text-[#959595]">
            <div className="flex justify-between">
                <span>{data.nickname}</span>
                <span>{data.createdAt.substring(0, 10)}</span>
            </div>
            <div className="flex justify-between">
                <div className="h-[5rem]">
                    <div className="flex mb-[0.5rem] items-center">
                        <StarRate data={data.reviewScore} />
                        <span className="ml-[0.3rem]">{data.reviewScore}</span>
                    </div>
                    <div className="h-[3rem] w-[100%] overflow-ellipsis overflow-hidden max-h-[3rem] line-clamp-2">{data.content}</div>
                </div>
                <Image src={data.reviewImgUrl} alt="리뷰이미지" className="w-[20%] aspect-square" width={300} height={400} />
            </div>
            <div className="bg-[#D9D9D9] w-[100%] h-[1px] mt-[0.5rem] mb-[1rem]"></div>
        </div>
    );
}

export default Review;
