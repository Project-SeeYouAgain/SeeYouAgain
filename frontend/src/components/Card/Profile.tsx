import React, { FunctionComponent, HTMLProps } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { RiBattery2ChargeFill } from 'react-icons/ri';

function Profile() {
    return (
        <div>
            <div className="flex">
                <FaUserCircle size="80" className="mr-[1rem]" />
                <div className="flex flex-col justify-center">
                    <div className="flex">
                        <span className="mr-[0.3rem] text-[16px] font-bold">장성꽃미남</span>
                        <div className="bg-[#EAECFF] flex justify-center items-center rounded-[0.31rem] w-[3.75rem]">
                            <span className="text-[#5669FF]">98%</span>
                            <RiBattery2ChargeFill color="#5669FF" />
                        </div>
                    </div>
                    <span className="text-[#959595]">장덕동</span>
                </div>
            </div>
            <div className="shadow-[0px_0px_0.31rem_0.19rem_rgba(0,0,0,0.05)] rounded-[0.69rem] min-h-[4.75rem] p-[1rem] mt-[1.2rem]">
                안녕하세요. 진짜 꽃미남인지는 저와 거래해보시면 알 수 있습니다^^
            </div>
            {/* {imgUrl ? <img src={imgurl} alt="" /> : <FaUserCircle />}
            <div>
              <span>{nickname}</span>
              <div>{mannerpoint}%</div>
            </div>
            <span>{address}</span> */}
        </div>
    );
}

export default Profile;
