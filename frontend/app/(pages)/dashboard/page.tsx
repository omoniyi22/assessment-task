"use client"
import { CiWallet } from "react-icons/ci";

import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/state/store';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import Link from 'next/link';
import { deleteTitle, fetchTitles, getTitle } from "@/app/state/title/titleSlice";
import { Title } from "@/app/components/Title.tsx/Title";
import { redirect } from "next/navigation";
import { setAlert } from "@/app/state/alert/alertSlice";


function page() {
    const dispatch = useDispatch<AppDispatch>()
    const { address, isConnected, caipAddress, status } = useAppKitAccount()
    const { token, profile } = useSelector((state: RootState) => state.user)
    const titles = useSelector((state: RootState) => state.title.titles)
    const getAllTitles = async () => {
        try {
            await dispatch(fetchTitles())
        } catch (error) {
            console.log({ error: error })
        }
    }

    if (!token) {
        redirect("/")
    }

    const username = localStorage.getItem("username")
    const createAccount = () => {
        dispatch(
            setAlert({
                message: 'Connect your wallet to access create Title',
                title: "Connect to Wallet",
                status: "ERROR"
            }))
    }

    useEffect(() => {
        getAllTitles()
    }, [])


    const deleteFunction = (id: string) => {
        if (isConnected) {
            dispatch(deleteTitle({ id }))
        } else {
            dispatch(
                setAlert({
                    message: 'Connect your wallet to access delete Title',
                    title: "Connect to Wallet",
                    status: "ERROR"
                }))
        }
    }

    return (
        <div className='px-5 mt-2 max-w-screen-lg mx-auto'>
            <div className="">
                <div className='data-details block  mt-5'>
                    <div className='p-1 mb-2'> Welcome to @{username}</div>
                    <div className='email flex gap-4 mb-5 ml-2 pb-3 border-b '>
                        <span className="shadow bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-1.5 pl-0 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
                            <div className="relative w-7 h-7 -ml-5 bg-gray-100 rounded-full dark:bg-gray-600 mr-1 text-center">
                                <CiWallet size={27} className="" />
                            </div>
                            Wallet Address<br /> {address}
                            {/* <div>{address}</div> */}
                        </span>
                    </div>
                </div>
                <nav className="flex gap-6" aria-label="Tabs">
                    <button
                        className="shrink-0 rounded-lg bg-sky-100 p-2 text-sm font-medium text-sky-600 px-3"
                        aria-current="page"
                    >
                        View Titles
                    </button>
                    {isConnected ?
                        <Link
                            className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            href={"title/new"}
                        >
                            Create Title
                        </Link>
                        :
                        <button
                            className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            onClick={createAccount}
                        >
                            Create Title
                        </button>
                    }
                </nav>
            </div>

            <div className="flex flex-wrap mt-8 shadow">
                {titles.length < 1 ?
                    <div className="text-center">There is no title for now, please create a new title</div>
                    :
                    titles.map(({ subject, title, uuid }) =>
                        <Title data={{ subject, title, uuid }} deleteFunction={() => deleteFunction(uuid)} />
                    )
                }
            </div>
        </div >
    )
}

export default page