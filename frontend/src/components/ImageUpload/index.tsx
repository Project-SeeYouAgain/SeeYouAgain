import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import camera from '../../../public/icon/3Dcamera.png';
import close from '../../../public/icon/close.png';

type ImageUploadProps = {
    onChange: (files: File[]) => void;
};

function ImageUpload({ onChange }: ImageUploadProps) {
    // 이미지
    const [images, setImages] = useState<File[]>([]);
    const [imgPreview, setImgPreview] = useState<{ img: File; url: string }[]>();

    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imagelist = e.target.files;
        if (!imagelist) {
            return;
        }
        const imageArray = Array.from(imagelist);
        setImages(imageArray);
        onChange(imageArray);
        // 이미지 미리보기
        const imagePreviewArray = imageArray.map(img => {
            const url = URL.createObjectURL(img);
            return { img, url };
        });
        setImgPreview(imagePreviewArray);
    };
    // useEffect(() => {
    //     console.log('됨?', images);
    // }, [images]);

    function removeFile(index: number) {
        // 이미지 배열 새로 하기
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
        // 이미지 미리보기 삭제
        const newimagePreview = imgPreview?.filter((_, i) => i !== index);
        imgPreview?.[index].img && URL.revokeObjectURL(imgPreview[index].url);
        setImgPreview(newimagePreview);
        newimagePreview?.forEach((image, i) => {
            if (i >= index) {
                image.url = URL.createObjectURL(image.img);
            }
        });
    }

    return (
        <div className="flex">
            <div className="relative flex justify-center">
                <div>
                    <input accept="image/*" name="file" className="hidden" id="file-upload" type="file" multiple onChange={onChangeFile} />
                    {/* 파일 업로드 라벨 */}
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="w-[4.8rem] h-[4.8rem] bg-[#E2F1F1] rounded-[.9rem] mr-[.6rem]"></div>
                        <div className="absolute top-[.5rem] left-[1rem]">
                            <Image src={camera} alt="camera" placeholder="blur" className="w-[3rem]" />
                            <p className="text-[#3C8D90] text-center text-[.8rem] mt-[-.3rem]">{images.length} / 5</p>
                        </div>
                    </label>
                </div>
            </div>
            {/* 이미지 미리보기 */}
            <div>
                {(imgPreview && (
                    <div className="flex ">
                        {imgPreview.map(({ img, url }, index) => (
                            <div key={img.name} className="relative">
                                <img key={index} alt="preview" className="w-[4.8rem] h-[4.8rem] object-cover rounded-[.9rem] mr-[.6rem]" src={url} />
                                <div onClick={() => removeFile(index)}>
                                    <Image src={close} alt="close" className="w-[2rem] absolute top-0 right-0"></Image>
                                </div>
                            </div>
                        ))}
                    </div>
                )) || <div> </div>}
            </div>
        </div>
    );
}

export default ImageUpload;
