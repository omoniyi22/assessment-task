"use client"

import { createAlert } from "@/app/state/alert/alertSlice"
import { AppDispatch, RootState } from "@/app/state/store"
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { createTitle } from "@/app/state/title/titleSlice"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/navigation'


const NewTitle = () => {

    const [title, setTitle] = useState("")
    const [subject, setSubject] = useState("")
    const { address, isConnected, caipAddress, status } = useAppKitAccount()
    const { token } = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch<AppDispatch>()

    const router = useRouter()
    
    if (!isConnected || !token) {
        router.push("/")
    }

    const submit = async (e: any) => {
        e.preventDefault()
        if (!title) {

            dispatch(createAlert({
                status: "ERROR",
                message: "Title field must not be empty",
                title: "Fill Empty Fields!"
            }))
        } else if (!subject) {
            dispatch(createAlert({
                status: "ERROR",
                message: "Subject field must not be empty",
                title: "Fill Empty Fields!"
            }))
        } else if (title && subject) {
            let data = { title, subject }
            await dispatch(createTitle(data))
                .unwrap()
                .then((response) => {
                    router.push(`/title/${response.uuid}`)
                })
        }
    }

    return (
        <div className="mx-auto max-w-screen-md px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Create a new write up!</h1>

                <p className="mt-4 text-gray-500">

                </p>
            </div>

            <form className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                <div>
                    <label className="sr-only" htmlFor="name">Title</label>
                    <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Title"
                        type="text"
                        id="name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label className="sr-only" htmlFor="message">Subject</label>

                    <textarea
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Subject"
                        rows={8}
                        id="message"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                    ></textarea>
                </div>

                <div className="mt-4">
                    <button
                        className="rounded-md bg-teal-600 px-5  py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 mx-auto"
                        onClick={submit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewTitle