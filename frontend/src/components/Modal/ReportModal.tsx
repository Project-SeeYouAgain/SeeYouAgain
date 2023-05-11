import React, { useState } from 'react';
import Image from 'next/image';
import Alert from '../../../public/icon/alert.png';
import { AiOutlineClose } from 'react-icons/ai';

function ReportModal({ isModalOpen, message, onClose }: { isModalOpen: boolean; message: string; onClose: () => void }) {
    if (!isModalOpen) return null;

    const [reportReasons, setReportReasons] = useState({
        spam: false,
        inappropriateContent: false,
        harassment: false,
        other: false,
    });
    const [reportDescription, setReportDescription] = useState('');
    const [showWarning, setShowWarning] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setReportReasons(prevReasons => ({ ...prevReasons, [name]: checked }));
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReportDescription(event.target.value);
    };

    const handleReport = () => {
        if (isAnyCheckboxChecked()) {
            showAlert('신고가 완료되었습니다.');
            onClose();
        } else {
            setShowWarning(true);
        }
    };

    const isAnyCheckboxChecked = () => {
        return Object.values(reportReasons).some(value => value === true);
    };

    function showAlert(message: string) {
        alert(message);
    }
    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center	items-center" style={{ backgroundColor: 'rgba(0,0,0, 0.5)' }}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white items-center w-[80%] h-[53vh] text-center rounded-[.4rem]">
                <AiOutlineClose className="text-red absolute top-2 right-2 cursor-pointer" size={23} onClick={onClose} />
                <div className="text-center">
                    <div className="mb-4 text-[.8rem] items-center">
                        <Image src={Alert} alt="alert" className="w-[5rem] m-auto " />
                        <span className="font-semibold">"{message}"</span> 글을<p> 신고하시겠습니까? </p>
                    </div>
                    <div className="text-left m-3">
                        <h2 className="text-[.8rem] text-darkgrey font-semibold mb-4">신고사유를 선택해 주세요.</h2>
                        <div className="mb-4 text-[.8rem] items-center">
                            <label htmlFor="spam">
                                <input type="checkbox" id="spam" name="spam" checked={reportReasons.spam} onChange={handleCheckboxChange} />
                                <span className="ml-1">전문업자</span>
                            </label>
                        </div>
                        <div className="mb-4 text-[.8rem] items-center">
                            <label htmlFor="inappropriateContent">
                                <input type="checkbox" id="inappropriateContent" name="inappropriateContent" checked={reportReasons.inappropriateContent} onChange={handleCheckboxChange} />
                                <span className="ml-1">대여금지 물품</span>
                            </label>
                        </div>
                        <div className="mb-4 text-[.8rem] items-center">
                            <label htmlFor="harassment">
                                <input type="checkbox" id="harassment" name="harassment" checked={reportReasons.harassment} onChange={handleCheckboxChange} />
                                <span className="ml-1">광고성/도배</span>
                            </label>
                        </div>
                        <div className="mb-4 text-[.8rem] items-center">
                            <label htmlFor="other">
                                <input type="checkbox" id="other" name="other" checked={reportReasons.other} onChange={handleCheckboxChange} />
                                <span className="ml-1">기타 사유</span>
                            </label>
                        </div>
                        <div className="mb-4 text-[.8rem] ">
                            <textarea
                                id="reportDescription"
                                name="reportDescription"
                                rows={3}
                                placeholder="기타 사유나 설명을 입력하세요."
                                value={reportDescription}
                                onChange={handleDescriptionChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {showWarning && <p className="mt-2 text-red text-center">최소한 하나의 신고 사유를 선택해야 합니다.</p>}
                        </div>
                    </div>
                </div>
                <button className="absolute bg-red w-[100%] h-[5vh] text-white bottom-0 left-1/2 transform -translate-x-1/2 " onClick={handleReport}>
                    확인
                </button>
            </div>
        </div>
    );
}

export default ReportModal;
