interface StepOneData {
    type: boolean;
}

interface StepTwoData {
    productImg?: File[];
    title: string;
    category: string;
    price: number;
    description: string;
    startDate: Date | null;
    endDate: Date | null;
    location: {
        lng: number; // float
        lat: number; // float
        RegionCode: string;
    };
    isSafe: boolean;
    tag: string[];
}

interface StepThreeData {
    title: string;
    category: string;
    price: number;
    description: string;
}

interface StepFourData {
    startDate: string;
    endDate: string;
    location: string;
    isSafe: boolean;
    tag: string[];
}
