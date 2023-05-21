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

function Category({ onChange }: Category2Props) {
    // 카테고리 선택
    const [category, setCategory] = useState('');

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        onChange(event); //
    }

    return (
        <div className="flex flex-wrap">
            <select onChange={handleChange} value={category} className="px-4 py-2 w-[100%] h-[2.5rem] bg-lightgrey rounded-md">
                <option value="">카테고리를 선택해주세요.</option>
                {categoryData.map((item: CategoryProps) => (
                    <option key={item.key} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Category;
