import { RiBattery2ChargeFill } from 'react-icons/ri';

interface MannerScoreProps {
    score: number;
}

const MannerScore: React.FunctionComponent<MannerScoreProps> = ({ score }) => {
    return (
        <div className="bg-sky flex justify-center items-center rounded-[0.31rem] py-[.15rem] w-[3.75rem]">
            <span className="text-blue text-[.8rem]">{score}%</span>
            <RiBattery2ChargeFill color="#5669FF" />
        </div>
    );
};

export default MannerScore;
