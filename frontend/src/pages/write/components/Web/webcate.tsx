import React, { useState } from 'react';
import { categoryData } from '../../../../data/categoryData';

interface CategoryProps {
    id: string;
    name: string;
    key: number;
}

type Category2Props = {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

function Webcate({ onChange }: Category2Props) {
    // 카테고리 선택
    const [category, setCategory] = useState('');

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        onChange(event); //
    }

    return (
        <div className="grid grid-cols-[1fr,3fr] ">
            <p className="mb-[0.43rem] font-bold text-[1.2rem] ">카테고리 </p>

            <div className="relative">
                <select
                    onChange={handleChange}
                    value={category}
                    className="appearance-none px-4 py-2 h-[3rem] border border-darkgrey bg-white text-gray-700 leading-tight rounded-md focus:outline-none focus:shadow-outline"
                >
                    <option value="">카테고리를 선택해주세요.</option>
                    {categoryData.map((item: CategoryProps) => (
                        <option key={item.key} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Webcate;
