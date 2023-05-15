import React, { useRef } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

interface ProfileImageProps {
    defaultImage: string | StaticImageData;
    currentImage: string;
    onChange: (file: File) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ defaultImage, currentImage, onChange }) => {
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputFileRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            onChange(file);
        }
    };

    return (
        <div className="relative w-[130px] h-[130px] rounded-full overflow-hidden m-auto">
            <Image src={currentImage || defaultImage} layout="fill" objectFit="cover" alt="user profile image" />
            <div className="absolute inset-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center cursor-pointer" onClick={handleClick}>
                <p className="text-white text-opacity-80">프로필 변경</p>
            </div>
            <input ref={inputFileRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </div>
    );
};

export default ProfileImage;
