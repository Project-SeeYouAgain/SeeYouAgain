import React, { useEffect, useState } from 'react';
import CloseHeader from '@/components/Container/components/CloseHeader';
import Container from '@/components/Container';
import Body from '@/components/Container/components/Body';
import promise from '@/images/promise.png';
import Image from 'next/image';
import SquareLg from '@/components/Button/SquareLg';
import classNames from 'classnames';
import styles from './contract.module.scss';
import { useRouter } from 'next/router';

function contract() {
    const router = useRouter();

    const clickClose = () => {
        router.back();
    };
    const [firstChecked, setFirstChecked] = useState<boolean>(false);
    const [secondChecked, setSecondChecked] = useState<boolean>(false);
    const [thirdChecked, setThirdChecked] = useState<boolean>(false);
    const [fourthChecked, setFourthChecked] = useState<boolean>(false);
    const [fifthChecked, setFifthChecked] = useState<boolean>(false);
    const [check, setCheck] = useState(false);

    const changeFirstCheck = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const inputElement = event.target as HTMLInputElement;
        setFirstChecked(inputElement.checked);
    };

    const changeSecondCheck = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const inputElement = event.target as HTMLInputElement;
        setSecondChecked(inputElement.checked);
    };

    const changeThirdCheck = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const inputElement = event.target as HTMLInputElement;
        setThirdChecked(inputElement.checked);
    };

    const changeFourthCheck = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const inputElement = event.target as HTMLInputElement;
        setFourthChecked(inputElement.checked);
    };

    const changeFifthCheck = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const inputElement = event.target as HTMLInputElement;
        setFifthChecked(inputElement.checked);
    };

    useEffect(() => {
        setCheck(firstChecked && secondChecked && thirdChecked && fourthChecked && fifthChecked);
    }, [firstChecked, secondChecked, thirdChecked, fourthChecked, fifthChecked]);
    return (
        <Container>
            <CloseHeader title="대여자 계약서" onClose={clickClose} />
            <Body className="relative">
                <div className="mt-5 break-keep">
                    <div className="border-b-2 border-solid p-2 my-2 flex text-sm ">
                        <p className="w-[93%]">파손 및 분실(사용 불가 상태)의 경우 최대 정가의 70%를 보상 받을 수 있습니다.</p>
                        <input onClick={changeFirstCheck} type="checkbox" className="w-[7%]" />
                    </div>
                    <div className="border-b-2 border-solid p-2 my-2 flex text-sm">
                        <p className="w-[93%]">일부 파손 및 고장의 경우 AS비용 혹은 정가의 30% 까지 보상 받을 수 있습니다.</p>
                        <input onClick={changeSecondCheck} type="checkbox" className="w-[7%]" />
                    </div>
                    <div className="border-b-2 border-solid p-2 my-2 flex text-sm">
                        <p className="w-[93%]">제품에 대한 특이사항을 철저히 관리하고 대여 전에 공지하겠습니다.</p>
                        <input onClick={changeThirdCheck} type="checkbox" className="w-[7%]" />
                    </div>
                    <div className="border-b-2 border-solid p-2 my-2 flex text-sm">
                        <p className="w-[93%]">See You Again은 물품 대여를 위한 서비스만 제공할뿐 거래중에 발생된 분쟁에 대한 책임을 지지 않습니다.</p>
                        <input onClick={changeFourthCheck} type="checkbox" className="w-[7%]" />
                    </div>
                </div>
            </Body>
            <div className="absolute bottom-0 w-full px-[1.88rem]">
                <Image src={promise} alt="promise" className="m-auto" />
                <div className=" p-2 my-2 flex text-sm text-blue">
                    <p className="w-[93%] font-bold">위 항목을 모두 인지하고 있으며 동의하겠습니다.</p>
                    <input onClick={changeFifthCheck} type="checkbox" className={classNames(styles.blueCheckBox, 'w-[7%] border-blue-500')} />
                </div>
                <div className="mb-[2rem]">
                    <SquareLg check={check} innerValue="제출완료" bgColor="blue" textColor="white" />
                </div>
            </div>
        </Container>
    );
}

export default contract;
