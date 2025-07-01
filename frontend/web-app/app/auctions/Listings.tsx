"use client";

import React, { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import { getData } from "../actions/auctionActions";
import Filters from "./Filters";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useShallow } from "zustand/react/shallow";
import qs from "query-string";
import { useAuctionStore } from "@/hooks/useAuctionStore";
import AppPagination from "@/app/components/AppPagination";
import EmptyFilter from "@/app/components/EmptyFilter";
import { Spinner } from "flowbite-react";

const Listings = () => {
    const [loading, setLoading] = useState(true);
    const params = useParamsStore(useShallow(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy,
        seller: state.seller,
        winner: state.winner
    })));
    const data = useAuctionStore(useShallow(state => ({
        auctions: state.auctions,
        totalCount: state.totalCount,
        pageCount: state.pageCount
    })));
    const setData = useAuctionStore(state => state.setData);
    const setParams = useParamsStore(state => state.setParams);
    const url = qs.stringifyUrl({ url: "", query: params });

    const setPageNumber = (pageNumber: number) => {
        setParams({ pageNumber });
    };

    useEffect(() => {
        getData(url).then(data => {
            setData(data);
            setLoading(false);
        });
    }, [url, setData]);

    if (loading) return <div className="flex justify-center"><Spinner /></div>;

    return (
        <>
            <Filters />
            {data.totalCount === 0 ? (
                <EmptyFilter showReset />
            ) : (
                <>
                    <div className="grid grid-cols-4 gap-6">
                        {data.auctions.map(auction => (
                            <AuctionCard key={auction.id} auction={auction} />
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <AppPagination pageChanged={setPageNumber}
                                       currentPage={params.pageNumber} pageCount={data.pageCount} />
                    </div>
                </>
            )}
        </>
    );
};

export default Listings;
