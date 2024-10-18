import { AppDispatch, RootState } from '@/app/state/store'
import { logout } from '@/app/state/user/userSlice'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';


export default function MenuBar() {
    const username = localStorage.getItem("username")
    const { address, isConnected, caipAddress, status, } = useAppKitAccount()
    const { token, profile } = useSelector((state: RootState) => state.user || {});
    const dispatch = useDispatch<AppDispatch>()

    const signout = () => {
        dispatch(logout())
    }
    const { open, close, } = useAppKit()

    return (
        <div id="dropdownInformation" className="z-10 hidden m-r-6 bg-white  divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white dark:divide-gray-600 sm:hidden text-white" style={{ backgroundColor: '#334155' }}>
            {
                username &&
                <div className="px-4 py-3 text-sm text-white dark:text-white">
                    <div className='text-white'>Username</div>
                    <div className="font-semibold text-sm truncate">@{username}</div>
                </div>
            }

            {
                !token ?
                    <ul className="py-2 text-sm text-white dark:text-gray-200" aria-labelledby="dropdownInformationButton" >
                        <li>
                            <Link href="/register" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-slate-800 hover_to_text_white">Register</Link>
                        </li>
                        <li>
                            <Link href="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-slate-800 hover_to_text_white">Login</Link>
                        </li>
                    </ul>
                    :
                    <>

                        <ul className="py-2 text-sm text-white dark:text-gray-200" aria-labelledby="dropdownInformationButton" >
                            <li>
                                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-slate-800 hover_to_text_white">Dashboard</Link>
                            </li>
                            {isConnected ?
                                <li className='cursor-pointer'
                                    onClick={() => open({ view: 'Account' })}
                                >
                                    <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-slate-800 hover_to_text_white">Open Account</span>
                                </li>
                                :
                                <li className='cursor-pointer'
                                    onClick={() => open({ view: "Connect" })}
                                >
                                    <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-slate-800 hover_to_text_white">Connect Wallet</span>
                                </li>
                            }
                        </ul>
                        <div className="py-2" onClick={signout}>
                            <a className="block px-4 py-2 text-sm text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-slate-800 hover_to_text_white">Sign out</a>
                        </div>
                    </>
            }
        </div>
    )
}
