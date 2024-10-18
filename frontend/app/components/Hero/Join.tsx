import { RootState } from '@/app/state/store'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Join() {


    const { token, profile } = useSelector((state: RootState) => state.user || {});


    return (
        <section className="bg-gray-950 text-white">
            <div className="mx-auto max-w-screen-xl px-4 pt-20 pb-56 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-3xl text-center">
                    <h1
                        className="bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"

                    >
                        Join Our Community Today
                        <span className="sm:block"> Incredible Conversion. </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                        Register now to begin the journey. Already a member? Log in to access your dashboard and manage your titles efficiently.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {!token ?
                            <>
                                <Link
                                    className="block w-full rounded border border-b-green-700 active:border-green-600  bg-green-700 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                                    href="/register"
                                >
                                    Register
                                </Link>
                                <Link
                                    className="block w-full rounded border border-green-600 active:border-green-600  px-12 py-3 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring active:bg-green-800 sm:w-auto"
                                    href="/login"
                                >
                                    Login
                                </Link>
                            </> :
                            <Link
                                className="block w-full rounded border border-b-green-700 active:border-green-600  bg-green-700 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                                href="/title"
                            >
                                Title Dashboard
                            </Link>

                        }

                    </div>
                </div>
            </div>
        </section>
    )
}