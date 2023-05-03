import react, { useState } from 'react';

function TagInput() {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key, target } = event;
        const trimmedValue = inputValue.trim();

        if ((key === 'Enter' || key === ' ') && trimmedValue !== '' && tags.length < 3) {
            setTags([...tags, trimmedValue]);
            setInputValue('');
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleTagDelete = (tagToDelete: string) => {
        setTags(tags.filter(tag => tag !== tagToDelete));
    };

    return (
        <div className="mb-[1.5rem]">
            <div className="relative">
                {tags.map(tag => (
                    <span key={tag} className="rounded-[2rem] bg-sky px-[.5rem] py-[.3rem] h-[1.2rem] text-blue mr-[.4rem] ">
                        # {tag}
                        <button type="button" onClick={() => handleTagDelete(tag)} className="ml-[.4rem] text-sm font-medium text-grey-dark focus:outline-none">
                            x
                        </button>
                    </span>
                ))}
            </div>
            <input
                type="text"
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                placeholder="#상품을 표현할 태그를 작성해주세요."
                className="mt-[.5rem] px-[1rem] w-[100%] h-[2.5rem] bg-lightgrey rounded-[.31rem] focus:outline-none"
            />
        </div>
    );
}

export default TagInput;
