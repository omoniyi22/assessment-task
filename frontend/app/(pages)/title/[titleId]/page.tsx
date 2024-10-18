"use client"
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useAppKit, useAppKitAccount, useWalletInfo } from '@reown/appkit/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/state/store';
import { setAlert } from '@/app/state/alert/alertSlice';
import { formatDate } from '@/app/utils/time';
import { fetchTitles } from '@/app/state/title/titleSlice';


export default function page() {
    const params: any = useParams();
    const { titleId } = params;
    // const [titleInfo, setTitleInfo] = useState<SingleTitleState | undefined>(undefined)
    const dispatch = useDispatch<AppDispatch>()
    const getAllTitles = async () => {
        try {
            await dispatch(fetchTitles())
        } catch (error) {
            console.log({ error: error })
        }
    }
    useEffect(() => {
        getAllTitles()
    }, [])
    const { walletInfo } = useWalletInfo()
    console.log({ walletInfo })

    const { address, isConnected, caipAddress, status, } = useAppKitAccount()

    const titleInfo = useSelector((state: RootState) => state.title.titles).find((data) => data.uuid === titleId)

    if (!titleId) {
        const token = localStorage.getItem("token")
        if (token && isConnected) {
            redirect("/dashboard")
        } else {
            redirect("/")
        }
    }

    return (
        <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg sm:px-0 lg:px-0 max-w-screen-sm mx-auto mt-20 border sm:shadow-none sm:rounded-none">
            <img
                alt=""
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                className="h-56 w-full object-cover"
            />

            <div className="bg-white p-4 sm:p-6">
                <time dateTime="2022-10-10" className="block border border-gray-500 max-w-fit rounded-sm text-transform:uppercase text-gray-500 px-2 text-xs">
                    <span className='text-xs'>   {titleInfo && titleInfo.createdAt && formatDate(titleInfo?.createdAt)}</span>
                </time>

                <a href="#">
                    <h3 className="mt-4 text-lg text-gray-900 font-bold uppercase">{titleInfo?.title}</h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {titleInfo?.subject}
                </p>
            </div>
        </article>
    )
}
