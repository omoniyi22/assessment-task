import { AppDispatch, RootState } from '@/app/state/store'
import { logout } from '@/app/state/user/userSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import Link from 'next/link';


export default function Wallet() {
    const dispatch = useDispatch<AppDispatch>()

    const { open, close, } = useAppKit()
    const { address, isConnected, caipAddress, status } = useAppKitAccount()

    const { token, profile } = useSelector((state: RootState) => state.user || {});

    const signout = () => {
        dispatch(logout())
    }

    return (
        <section className="bg-gray-900 text-white">
            <div className="mx-auto max-w-screen-xl px-4 pt-20 pb-56 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-3xl text-center">
                    {
                        !isConnected ?
                            <h1
                                className="bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                            >
                                Welcome to CryptoExchange

                                <span className="sm:block"> Connect Your Wallet </span>
                            </h1> :
                            <h1
                                className="bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                            >
                                You can now Access Your Dashboard
                                <span className="sm:block"> You can begin to create your write ups. </span>
                            </h1>
                    }
                    {isConnected ?
                        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                            To get started, Click the button below.
                        </p>
                        :
                        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                            Click the button below, to acces your dashboard, manage and create your write ups.
                        </p>
                    }

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {!isConnected ?
                            <>
                                <button
                                    onClick={signout}
                                    className="block w-full rounded border border-b-green-700 active:border-green-600  bg-green-700 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                                >
                                    Sign Out
                                </button>
                                <button
                                    className="block w-full rounded border border-green-600 active:border-green-600  px-12 py-3 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring active:bg-green-800 sm:w-auto"
                                    onClick={() => open({ view: 'Connect' })}>

                                    Connect Wallet
                                </button>
                            </>
                            :
                            <>
                                <Link
                                    href={"/dashboard"}
                                    className="block w-full rounded border border-b-green-700 active:border-green-600  bg-green-700 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                                >
                                    Dashboard
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}