import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import React, { useState, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import classNames from 'classnames';
import styles from './index.module.scss';

interface KeyInterface {
    id: number;
    text: string;
}

function Search() {
    const [clickSearch, setClickSearch] = useState(false);
    const [text, setText] = useState('');
    const [searchText, setSearchText] = useState('');
    const handleTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    const [keywords, setKeywords] = useState<KeyInterface[]>([]);

    // 페이지 로드 시 로컬스토리지에서 기존 검색어 불러오기
    useEffect(() => {
        const storedKeywords = localStorage.getItem('keywords');
        if (storedKeywords) {
            setKeywords(JSON.parse(storedKeywords));
        }
    }, []);

    // 검색 버튼 클릭 시, 검색어 추가하기
    const handleAddKeyword = () => {
        if (!text) return; // 검색어가 입력되어 있지 않으면 추가하지 않음

        // 키워드가 일치하는 기존 검색어를 찾는다
        const existingKeyword = keywords.find(keyword => keyword.text === text);
        setClickSearch(true);
        // 일치하는 키워드가 있는 경우 이전 기록을 삭제한다
        if (existingKeyword) {
            handleRemoveKeyword(existingKeyword.id);
        } else {
            if (keywords.length >= 5) {
                handleRemoveKeyword(keywords[4].id);
            }
        }
        const newKeyword = { id: Date.now(), text };

        // 최근 검색어가 5개를 초과하는 경우 가장 오래된 검색어를 삭제
        setSearchText(text);
        setKeywords(prevKeywords => [newKeyword, ...prevKeywords]);
        setText(''); // 검색어 입력 필드 비우기
    };

    // 검색어 삭제하기
    const handleRemoveKeyword = (id: number, newKeyword?: KeyInterface) => {
        setKeywords(prevKeywords => {
            const newKeywords = prevKeywords.filter(keyword => keyword.id !== id);
            if (newKeyword) {
                return [newKeyword, ...newKeywords];
            }
            return newKeywords;
        });
    };

    // 검색어 모두 삭제하기
    const handleClearKeywords = () => {
        setKeywords([]);
        localStorage.removeItem('keywords');
    };

    // 검색어 목록을 로컬스토리지에 저장하기
    useEffect(() => {
        if (keywords.length != 0) {
            localStorage.setItem('keywords', JSON.stringify(keywords));
        }
    }, [keywords]);

    return (
        <Container>
            <div className="flex p-4 pt-5 px-[1.88rem] items-center">
                <BsArrowLeft size={30} />
                <div className="bg-gray-100 border-solid border-2 ml-2 w-full h-10 rounded-full flex items-center pr-2">
                    <input
                        type="text"
                        value={text}
                        onChange={handleTextField}
                        className={classNames('bg-transparent w-full rounded-l-full h-full p-4', styles.noHover)}
                        placeholder="무엇을 빌리고 싶으세요?"
                        maxLength={20}
                    />
                    <AiOutlineSearch size={30} onClick={handleAddKeyword} />
                </div>
            </div>
            <Body>
                <div className="flex justify-between">
                    <p className="mt-2 text-xl font-bold text-blue">최근 검색어</p>
                    <button onClick={handleClearKeywords} className="text-red font-bold">
                        모두 삭제
                    </button>
                </div>
                <ul className="flex flex-wrap mt-2">
                    {keywords.map(keyword => (
                        <li key={keyword.id} className="flex">
                            <p
                                onClick={() => {
                                    setText(keyword.text);
                                }}
                            >
                                {keyword.text}
                            </p>
                            <button className="text-red font-bold ml-1 mr-4" onClick={() => handleRemoveKeyword(keyword.id)}>
                                X
                            </button>
                        </li>
                    ))}
                </ul>
                <div>
                    <p className="mt-8 text-xl font-bold text-blue">검색 결과</p>
                    {clickSearch && <p className="">검색어 - {searchText}</p>}
                </div>
            </Body>
        </Container>
    );
}

export default Search;
