import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import camera from '../../../../../../public/icon/3Dcamera.png';
import close from '../../../../../../public/icon/close.png';
import imageCompression from 'browser-image-compression';

type ImageUploadProps = {
    onChange: (files: File[]) => void;
};

function WebImageUpload({ setData, onSubmit, data }: { setData: React.Dispatch<React.SetStateAction<StepTwoData>>; onSubmit: (data: StepTwoData) => void; data: StepTwoData }) {
    // 이미지
    const [images, setImages] = useState<File[]>([]);
    const [imgPreview, setImgPreview] = useState<{ img: File; url: string }[]>();

    const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const imagelist = e.target.files;
        if (!imagelist) {
            return;
        }

        const filesArray = Array.from(imagelist);
        setImages(filesArray);
        // 이미지 리사이징
        const resizeImage = async (file: File): Promise<Blob> => {
            try {
                const options = {
                    maxSizeMB: 0.7,
                    maxWidthOrHeight: 800,
                    outputType: 'png', // PNG 형식으로 압축
                    quality: 0.8, // 이미지 품질을 0.8로 설정
                };

                const compressedFile = await imageCompression(file, options);
                return compressedFile;
            } catch (error) {
                console.error('Error resizing image:', error);
                return file;
            }
        };

        const resizedImages = await Promise.all(filesArray.map(file => resizeImage(file)));
        const resizedData = resizedImages.map(resizedFile => new File([resizedFile], resizedFile.name));
        setData(prevData => ({ ...prevData, productImg: resizedData }));
        onSubmit({ ...data, productImg: resizedData });

        // 이미지 미리보기
        const imagePreviewArray = filesArray.map(img => {
            const url = URL.createObjectURL(img);
            return { img, url };
        });
        setImgPreview(imagePreviewArray);
    };


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
        <div className="grid grid-cols-[1fr,3fr] ">
            <p className="mb-[1rem] font-bold text-[1.2rem] ">상품 이미지</p>

            <div className="flex">
                <div className="relative flex justify-center">
                    <div>
                        <input accept="image/*" name="file" className="hidden" id="file-upload" type="file" multiple onChange={onChangeFile} />
                        {/* 파일 업로드 라벨 */}
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <div className="w-[10rem] h-[10rem] bg-[#E2F1F1] rounded-[.9rem] mr-[.6rem]"></div>
                            <div className="absolute top-[2rem] left-[2.5rem]">
                                <Image src={camera} alt="camera" placeholder="blur" className="w-[5rem]" />
                                <p className="text-[#3C8D90] text-center text-[1rem] mt-[-.3rem]">{images.length} / 5</p>
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
                                    <img key={index} alt="preview" className="w-[10rem] h-[10rem] bg-[#E2F1F1] rounded-[.9rem] mr-[.6rem] object-cover " src={url} />
                                    <div onClick={() => removeFile(index)}>
                                        <Image src={close} alt="close" className="w-[2rem] absolute top-0 right-0"></Image>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )) || <div> </div>}
                </div>
            </div>
        </div>
    );
}

export default WebImageUpload;
