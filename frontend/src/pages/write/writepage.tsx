import React, { useEffect, useState } from 'react';

import StepOneForm from './components/StepOneForm';
import StepTwoForm from './components/StepTwoFrom';

function WritePage() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [stepOneData, setStepOneData] = useState<StepOneData | null>(null);
    const [stepTwoData, setStepTwoData] = useState<StepTwoData | null>(null);

    const handleStepOneSubmit = (data: StepOneData) => {
        setStepOneData(data);
    };

    const handleStepTwoSubmit = (data: StepTwoData) => {
        setStepTwoData(data);
    };

    // 이전 단계로 이동
    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };
    // 제출
    const handleSubmit = () => {
        if (stepOneData && stepTwoData) {
            // 모든 데이터가 입력되었는지 확인
            const data = {
                ...stepOneData,
                ...stepTwoData,
            };

            console.log('Data submitted:', data); // 데이터 콘솔 출력

            // stepTwoData의 데이터가 기본값인지 아닌지 확인
            const hasEnteredData = Object.values(stepTwoData);
            console.log(hasEnteredData);
            if (hasEnteredData) {
                console.log('Data submitted:', data); // 데이터 콘솔 출력
            } else {
                console.log('Please enter data in step two.'); // stepTwo 데이터가 기본값이면 경고 메시지 출력
                alert('데이터를 모두 올바로 입력했는지 확인해주세요.');
            }
        } else {
            console.log('Please enter all data.'); // 데이터가 모두 입력되지 않았으면 경고 메시지 출력
            alert('데이터를 모두 입력해주세요');
        }
    };

    return (
        <div>
            {currentStep === 1 && <StepOneForm onSubmit={handleStepOneSubmit} />}
            {currentStep === 2 && <StepTwoForm onSubmit={handleStepTwoSubmit} />}
            {currentStep === 3 && <p>Thank you for your submission!</p>}
            {currentStep !== 3 && (
                <>
                    {currentStep !== 1 && <button onClick={handlePrevious}>Previous</button>}
                    {currentStep === 2 ? <button onClick={handleSubmit}> 등록하기 </button> : <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>}
                </>
            )}
        </div>
    );
}

export default WritePage;
