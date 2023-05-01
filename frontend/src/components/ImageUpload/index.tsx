import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

function ImageUpload() {
    // 이미지
    const [images, setImages] = useState<File[]>([]);
    const [imgPreview, setImgPreview] = useState<{ img: File; url: string }[]>();
    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imagelist = e.target.files;
        if (!imagelist) {
            return;
        }
        const imageArray: File[] = Array.from(imagelist);
        setImages(imageArray);
        // 이미지 미리보기
        const imagePreviewArray = imageArray.map(img => {
            const url = URL.createObjectURL(img);
            return { img, url };
        });
        setImgPreview(imagePreviewArray);
    };
    function removeFile(index: number) {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
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
                        <div className="w-[4.8rem] h-[4.8rem] bg-sky rounded-[.9rem] mr-[.6rem]"></div>
                        <div className="absolute top-[1rem] left-[1.48rem]">
                            {/* Image로 다음에 수정 */}
                            <img src="../icon/camera.png" alt="camera" className="w-[2rem]" />
                            <p className="text-blue text-center">{images.length}/5</p>
                        </div>
                    </label>
                </div>
            </div>
            {/* 이미지 미리보기 */}
            <div>
                {(imgPreview && (
                    <div className="flex ">
                        {imgPreview.map(({ img, url }, index) => (
                            <div>
                                <img key={index} alt="preview" className="w-[4.8rem] h-[4.8rem] object-cover rounded-[.9rem] mr-[.6rem]" src={url} />
                                <div onClick={() => removeFile(index)}>
                                    <AiFillCloseCircle className="text-blue absolute top-[23%]  " />
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
