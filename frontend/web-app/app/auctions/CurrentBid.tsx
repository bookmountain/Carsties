import React from "react";

interface ICurrentBidProps {
    amount?: number;
    reservePrice: number;
};

const CurrentBid: React.FC<ICurrentBidProps> = ({ amount, reservePrice }) => {
    const text = amount ? "$" + amount : "No bids";
    const color = amount ? (amount > reservePrice ? "bg-green-600" : "bg-amber-600") : "bg-red-600";

    return (
        <div
            className={`
            border-2 border-white text-white py-1 px-2 rounded-lg flex
            justify-center ${color}
        `}
        >
            {text}
        </div>
    );
};

export default CurrentBid;