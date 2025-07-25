"use client";

interface IBidFormProps {
    auctionId: string;
    highBid: number;
}

import { placeBidForAuction } from "@/app/actions/auctionActions";
import { numberWithCommas } from "@/app/lib/numberWithCommas";
import { useBidStore } from "@/hooks/useBidStore";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";


const BidForm: React.FC<IBidFormProps> = ({ auctionId, highBid }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const addBid = useBidStore(state => state.addBid);

    function onSubmit(data: FieldValues) {
        if (data.amount <= highBid) {
            reset();
            return toast.error("Bid must be at least $" + numberWithCommas(highBid + 1));
        }

        placeBidForAuction(auctionId, +data.amount).then(bid => {
            if ("error" in bid) throw bid.error;
            addBid(bid);
            reset();
        }).catch(err => toast.error(err.message));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center border-2 rounded-lg py-2">
            <input
                type="number"
                {...register("amount")}
                className="input-custom text-sm text-gray-600"
                placeholder={`Enter your bid (minimum bid is $${numberWithCommas(highBid + 1)})`}
            />
        </form>
    );
};

export default BidForm;