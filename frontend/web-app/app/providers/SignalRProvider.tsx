"use client";

import { useAuctionStore } from "@/hooks/useAuctionStore";
import { useBidStore } from "@/hooks/useBidStore";
import { Auction, AuctionFinished, Bid } from "@/types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { User } from "next-auth";
import React, { ReactNode, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AuctionCreatedToast from "../components/AuctionCreatedToast";
import { getDetailedViewData } from "../actions/auctionActions";
import AuctionFinishedToast from "../components/AuctionFinishedToast";

interface ISignalRProviderProps {
    children: ReactNode;
    user: User | null;
    notifyUrl: string;
}

const SignalRProvider: React.FC<ISignalRProviderProps> = ({ children, user, notifyUrl }) => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const setCurrentPrice = useAuctionStore(state => state.setCurrentPrice);
    const addBid = useBidStore(state => state.addBid);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(notifyUrl)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, [notifyUrl]);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    connection.on("BidPlaced", (bid: Bid) => {
                        if (bid.bidStatus.includes("Accepted")) {
                            setCurrentPrice(bid.auctionId, bid.amount);
                        }
                        addBid(bid);
                    });
                    connection.on("AuctionCreated", (auction: Auction) => {
                        if (user?.username !== auction.seller) {
                            return toast(<AuctionCreatedToast auction={auction} />,
                                { duration: 10000 });
                        }
                    });
                    connection.on("AuctionFinished", (finishedAuction: AuctionFinished) => {
                        const auction = getDetailedViewData(finishedAuction.auctionId);
                        return toast.promise(auction, {
                            loading: "Loading",
                            success: (auction) =>
                                <AuctionFinishedToast
                                    finishedAuction={finishedAuction}
                                    auction={auction as Auction}
                                />,
                            error: (err) => "Auction finished!"
                        }, { success: { duration: 10000, icon: null } });
                    });
                }).catch(error => console.log(error));
        }

        return () => {
            connection?.stop();
        };
    }, [connection, setCurrentPrice, addBid, user?.username]);

    return (
        children
    );
};

export default SignalRProvider;
