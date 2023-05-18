import Container from '@/components/Container';
import React, { useState, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import classNames from 'classnames';
import styles from './index.module.scss';
import Navbar from '@/components/Container/components/Navbar';
import { useRouter } from 'next/router';
import { axAuth } from '@/apis/axiosinstance';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';
import ItemCard from '@/components/Card/ItemCard';
import InfiniteScroll from 'react-infinite-scroller';
import WebNavbar from './../../components/Container/components/WebNavbar/index';

interface KeyInterface {
    id: number;
    text: string;
}

interface dataProps {
    thumbnailUrl: string;
    title: string;
    location: string;
    price: number;
    startDate?: string;
    endDate?: string;
    isSafe?: boolean;
    isCart?: boolean;
    productId: number;
    menuState?: number;
}

function Search() {
    const [clickSearch, setClickSearch] = useState(false);
    const [listdata, setListData] = useState<dataProps[]>([]);
    const [text, setText] = useState('');
    const [saveText, setSaveText] = useState('');
    const [searchText, setSearchText] = useState('');
    const handleTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    const [keywords, setKeywords] = useState<KeyInterface[]>([]);
    const token = useRecoilValue(userState).accessToken;
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [productId, setProductId] = useState<number>();

    // 페이지 로드 시 로컬스토리지에서 기존 검색어 불러오기
    useEffect(() => {
        if (token === undefined || token === null) {
            console.log('로그인 풀림');
            router.push('/');
        }
        const storedKeywords = localStorage.getItem('keywords');
        if (storedKeywords) {
            setKeywords(JSON.parse(storedKeywords));
        }
    }, []);

    // 검색 버튼 클릭 시, 검색어 추가하기
    const handleAddKeyword = () => {
        console.log(text);
        if (!text) return; // 검색어가 입력되어 있지 않으면 추가하지 않음

        setSaveText(text);

        axAuth(token)({
            method: 'post',
            url: `/product-service/auth/search/${text}`,
            data: {
                sort: 0,
                productId: null,
            },
        })
            .then(res => {
                const productList = res.data.data;
                setListData((_list_data: dataProps[]) => [...productList]);
                setProductId(productList[productList.length - 1]?.productId);

                if (productList.length < 20) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
            }) // 잘 들어갔는지 확인
            .catch(err => console.log(err)); // 어떤 오류인지 확인

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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddKeyword();
        }
    };
    const getProduct = () => {
        axAuth(token)({
            method: 'post',
            url: `/product-service/auth/search/${saveText}`,
            data: {
                sort: 0,
                productId: productId,
            },
        })
            .then(res => {
                const productList = res.data.data;
                setListData((_list_data: dataProps[]) => [..._list_data, ...productList]);
                setProductId(productList[productList.length - 1]?.productId);

                if (productList.length < 20) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
            }) // 잘 들어갔는지 확인
            .catch(err => console.log(err)); // 어떤 오류인지 확인
    };

    const onClick = (id: number) => {
        router.push(`/${id}`);
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
    const router = useRouter();

    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const desktopQuery = window.matchMedia('(min-width:767px)');
        const mobileQuery = window.matchMedia('(max-width:767px)');

        const handleDesktopQuery = (event: MediaQueryListEvent) => {
            setIsDesktop(event.matches);
        };

        const handleMobileQuery = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        desktopQuery.addEventListener('change', handleDesktopQuery);
        mobileQuery.addEventListener('change', handleMobileQuery);

        // 초기값 설정
        setIsDesktop(desktopQuery.matches);
        setIsMobile(mobileQuery.matches);

        return () => {
            desktopQuery.removeEventListener('change', handleDesktopQuery);
            mobileQuery.removeEventListener('change', handleMobileQuery);
        };
    }, []);

    // 로딩 중이거나 초기 상태일 때 출력할 내용
    if (isDesktop === null || isMobile === null) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="flex flex-col h-screen">
            {isDesktop && <WebNavbar />}
            <div className={classNames('flex py-5 px-[4rem] items-center', isDesktop ? 'mt-[100px]' : '')}>
                <div className="bg-gray-100 border-solid border-2 ml-2 w-full h-10 rounded-full flex items-center pr-2">
                    <input
                        type="text"
                        value={text}
                        onChange={handleTextField}
                        className={classNames('bg-transparent w-full rounded-l-full h-full p-4', styles.noHover)}
                        placeholder="무엇을 빌리고 싶으세요?"
                        onKeyDown={handleKeyDown}
                        maxLength={20}
                    />
                    <AiOutlineSearch size={30} onClick={handleAddKeyword} />
                </div>
            </div>
            <div className="px-[4.5rem] flex-grow">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-blue">최근 검색어</p>
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
                <div className="pb-16">
                    <p className="my-4 mt-8 text-xl font-bold text-blue">검색 결과</p>
                    <div style={{ overflow: 'auto' }}>
                        <InfiniteScroll initialLoad={false} loadMore={getProduct} hasMore={hasMore} isReverse={false} useWindow={false} threshold={50}>
                            {isDesktop && (
                                <div className="grid grid-cols-2 gap-4">
                                    {listdata &&
                                        listdata.map((item, index) => (
                                            <div className="mb-[1rem]" onClick={() => onClick(item.productId)} key={index}>
                                                <ItemCard productId={item.productId} productImg={item.thumbnailUrl} location={item.location} price={item.price} title={item.title} />
                                            </div>
                                        ))}
                                </div>
                            )}
                            {isMobile && (
                                <div>
                                    {listdata &&
                                        listdata.map((item, index) => (
                                            <div className="mb-[1rem]" onClick={() => onClick(item.productId)} key={index}>
                                                <ItemCard productId={item.productId} productImg={item.thumbnailUrl} location={item.location} price={item.price} title={item.title} />
                                            </div>
                                        ))}
                                </div>
                            )}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
            {isMobile && <Navbar />}
        </Container>
    );
}

export default Search;
