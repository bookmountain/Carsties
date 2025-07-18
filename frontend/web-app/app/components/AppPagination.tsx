 'use client'

import { Pagination } from 'flowbite-react'
import React, { useState } from 'react'

interface IAppPagination  {
	currentPage: number
	pageCount: number
	pageChanged: (page: number) => void;
}

export  const AppPagination: React.FC<IAppPagination> = ({ currentPage, pageCount, pageChanged })=> {
	return (
		<Pagination
			currentPage={currentPage}
			onPageChange={e => pageChanged(e)}
			totalPages={pageCount}
			layout='pagination'
			showIcons={true}
			className='text-blue-500 mb-5'
		/>
	)
}

export default AppPagination