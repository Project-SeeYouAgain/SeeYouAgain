import React from 'react';
import { categoryData } from '../../data/categoryData';
import Category from '../Button/Category';
import { AiOutlineClose } from 'react-icons/ai';

interface CategoryProps {
    id: string;
    name: string;
    key: number;
}
function CategoryModal({ isModalOpen, onClose }: { isModalOpen: boolean; onClose: () => void }) {
    if (!isModalOpen) return null;

    return (
        <div className="absolute w-full h-full z-30 bg-white ">
            <div className="mt-20">
                <AiOutlineClose className="text-darkgrey absolute top-2 right-2 cursor-pointer mt-5 mr-7" size={23} onClick={onClose} />
                <div className="ml-10 mb-8">
                    <p className="font-semibold text-lg">카테고리</p>
                </div>
                <div className="grid grid-cols-3">
                    {categoryData.map((item: CategoryProps) => (
                        <Category catekey={item.key} innerValue={item.name}></Category>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategoryModal;
