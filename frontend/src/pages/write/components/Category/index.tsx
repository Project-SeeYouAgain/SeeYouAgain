import Button from '@/components/Button';
import React, { useState } from 'react';
import { categoryData } from './categoryData';
interface CategoryProps {
    id: string;
    name: string;
    key: number;
}
function Category() {
    // 카테고리 선택
    const [category, setCategory] = useState('');
    const [isCheck, setIsCheck] = useState(false);
    function onHandleData() {
        setIsCheck(!isCheck);
    }
    return (
        <div className="flex flex-wrap">
            {categoryData.map((item: CategoryProps) => {
                return (
                    <div key={item.key} className=" m-[.4rem]" onClick={onHandleData}>
                        <input
                            className="hidden"
                            id={item.id}
                            name="category"
                            type="radio"
                            onClick={() => {
                                setCategory(item.id);
                            }}
                        />
                        <label
                            htmlFor={item.id}
                            className={`inline-block cursor-pointer w-100 px-[1rem] py-[.3rem] rounded-[4rem] text-center font-bold ${
                                category === item.id ? 'bg-blue text-white' : 'bg-lightgrey text-darkgrey'
                            }`}
                        >
                            {item.name}
                        </label>
                    </div>
                );
            })}
        </div>
    );
}

export default Category;
