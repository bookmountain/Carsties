"use client";

import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";

interface IEditButton {
    id: string;
}

const EditButton: React.FC<IEditButton> = ({ id }) => {
    return (
        <Button outline>
            <Link href={`/auctions/update/${id}`}>Update Auction</Link>
        </Button>
    );
};

export default EditButton;
