"use client"
import Link from "next/link"
import { MdDelete } from "react-icons/md"

export const Title = ({ data, deleteFunction }: { data: { title: string, subject: string, uuid: string }, deleteFunction: () => void }) => {
    return (
        <div className="sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
            <article
                className="rounded-lg border border-gray-100 bg-white p-4 pb-3 shadow-sm transition hover:shadow-lg sm:p-3"
            >
                <span className="inline-block rounded bg-blue-600 p-2 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                    </svg>
                </span>

                <a href="#">
                    <h3 className="mt-0.5 text-lg font-medium text-gray-900 line-clamp-3">
                        {data.title}
                    </h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {data.subject}
                </p>
                <div className="flex mt-5 -mb-3">
                    <Link className="group mt-4 mb-5 inline-flex items-center gap-1 text-sm font-medium text-blue-600" href={`/title/${data.uuid}`}>
                        Find out more
                        <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                            &rarr;
                        </span>
                    </Link>

                    <div className="ml-auto mr-3 ">
                        <button onClick={deleteFunction} className="flex items-center justify-center w-9 h-9 rounded-full bg-red-200 hover:bg-red-300 transition-colors mb-0">
                            <MdDelete className="text-red-600" size={19} />
                        </button>
                    </div>
                </div>
            </article>
        </div>
    )
}