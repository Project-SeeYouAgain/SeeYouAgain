import React, { useState } from 'react';

type Props = {
    onSubmit: (data: FormData) => void;
};
function WritePage() {
    type FormData = {
        // 각 단계에 대한 데이터를 포함할 필드
    };
    const StepOneForm = ({ onSubmit }: Props) => {
        const [data, setData] = useState<FormData>({
            /* StepOneForm 데이터 */
        });

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onSubmit(data);
        };

        return (
            <form onSubmit={handleSubmit}>
                {/* StepOneForm 컨텐츠 */}
                <button type="submit">Next</button>
            </form>
        );
    };
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [stepOneData, setStepOneData] = useState<FormData | null>(null);
    const [stepTwoData, setStepTwoData] = useState<FormData | null>(null);
    const [stepThreeData, setStepThreeData] = useState<FormData | null>(null);

    const handleStepOneSubmit = (data: FormData) => {
        setStepOneData(data);
        setCurrentStep(2);
    };

    const handleStepTwoSubmit = (data: FormData) => {
        setStepTwoData(data);
        setCurrentStep(3);
    };

    const handleStepThreeSubmit = (data: FormData) => {
        setStepThreeData(data);
    };
    const handleSubmit = () => {
        const data = {
            ...stepOneData,
            ...stepTwoData,
            ...stepThreeData,
        };

        // 제출 로직 실행
        console.log('Data submitted:', data);
    };
    return (
        <div>
            {currentStep === 1 && <StepOneForm onSubmit={handleStepOneSubmit} />}
            {currentStep === 2 && <StepTwoForm onSubmit={handleStepTwoSubmit} />}
            {currentStep === 3 && <StepThreeForm onSubmit={handleStepThreeSubmit} />}
            {currentStep === 4 && <p>Thank you for your submission!</p>}
            {currentStep !== 4 && <button onClick={handleSubmit}>{currentStep === 3 ? 'Submit' : 'Next'}</button>}
        </div>
    );
}

export default WritePage;
