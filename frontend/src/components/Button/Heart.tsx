import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

function Heart({ isActive, className }: ButtonProps) {
    return <>{isActive ? <AiFillHeart className={` w-[1.5rem] h-[1.2rem] ${className}`} color={'red'} /> : <AiOutlineHeart className={` w-[1.5rem] h-[1.2rem] ${className}`} />}</>;
}

export default Heart;
