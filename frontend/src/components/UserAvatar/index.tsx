// components/ProfileImage.tsx
import React, { useState } from 'react';
import styles from './index.module.scss';
import type { StaticImageData } from 'next/image';
import defaultUserImage from '@/images/default_user.png';
import Image from 'next/image';
import settingProfile from '@/images/settingProfile.png';

interface ProfileImageProps {
    defaultImage?: string | StaticImageData;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ defaultImage }) => {
    const [image, setImage] = useState<string | undefined>();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();

            reader.onload = e => {
                if (e.target) {
                    setImage(e.target.result as string);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="w-fit m-auto relative mt-8">
            <Image
                src={image || (defaultImage as string) || defaultUserImage}
                alt="프로필 사진"
                className={styles.profileImage}
                onClick={() => document.getElementById('imageInput')?.click()}
                width={100}
                height={100}
            />
            <Image src={settingProfile} alt="pen" className="absolute bottom-0 right-0" />
            <input type="file" id="imageInput" hidden onChange={handleImageChange} />
        </div>
    );
};

export default ProfileImage;
