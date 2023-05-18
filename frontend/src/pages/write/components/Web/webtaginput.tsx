import react, { useState, useEffect } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';

type TagInputProps = {
    value: string[];
    onChange: (newData: Partial<StepTwoData>) => void;
};

function WebTagInput({ value = [], onChange }: TagInputProps) {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key, target } = event;
        const trimmedValue = inputValue.trim();

        if ((key === 'Enter' || key === ' ') && trimmedValue !== '' && value.length < 3) {
            const newTags = [...value, trimmedValue];
            const newData = { tag: newTags };
            onChange(newData);
            setInputValue('');
        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleTagDelete = (tagToDelete: string) => {
        const newTags = value.filter(tag => tag !== tagToDelete);
        const newData = { tag: newTags };
        onChange(newData);
    };
    // useEffect(() => {
    //     onChange(newData);
    // }, [onChange, newData]);

    return (
        <div className=" grid grid-cols-[1fr,3fr] mb-8">
            <p className=" font-bold text-[1.2rem] "> 태그 </p>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                    placeholder="#상품을 표현할 태그를 작성해주세요."
                    className="mb-[1rem] px-[1rem] w-[100%] h-[3rem] rounded-md border border-darkgrey focus:outline-none"
                />
                <div className="relative flex">
                    {value.map(tag => (
                        <span key={tag} className=" flex  mr-[.4rem] ">
                            <div className=" font-semibold text-darkgrey bg-lightgrey px-[.4rem] py-[.2rem] rounded-[.4rem]"># {tag}</div>
                            <button type="button" onClick={() => handleTagDelete(tag)} className="  text-[1.3rem]  px-[.1rem]  rounded-[.4rem]  text-darkgrey focus:outline-none">
                                <IoIosCloseCircle />
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WebTagInput;
