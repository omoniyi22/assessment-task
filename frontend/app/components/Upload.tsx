import { useEffect, useState } from "react";
import axios from "axios";
// import { useRouter } from "next/compat/router";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/utils";
import toast from "react-hot-toast";
import { AppContext } from "next/app";
import Spinner from "./Spinner";
import { ReactSortable, Sortable, Store } from 'react-sortablejs';
import { useWallet, useConnection } from "@solana/wallet-adapter-react";


export const Upload = () => {
    let uploadImagesQueue: any[] = []
    const [isUploading, setIsUploading] = useState(false);
    const [title, setTitle] = useState("");
    const [isRedirect, setRedirect] = useState(false);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyODkzMzI1MH0.UIWkrrcztzPzlNTo2OvkihaMqofDMRrZwH9r50BmRig"


    const [images, setImages] = useState<string[]>([]);
    const [txSignature, sendTxSignature] = useState("")
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const router: any = useRouter();

    useEffect(() => {
        // Store token in localStorage when it changes
        localStorage.setItem('token', token);
    }, []);

    // Fetch the id from the router query safely
    // const id = router?.query?.id;

    async function uploadImages(ev: any) {
        const files = await ev.target?.files;
        try {
            if (files?.length > 0) {
                setIsUploading(true)
                for (const file of files) {
                    const data = new FormData();
                    data.append("file", file);
                    // let oldImages = [...images]
                    uploadImagesQueue.push(
                        axios.post("http://localhost:5001/v1/user/img_upload", data).then(res => {
                            let res_data_links = res.data.links
                            setImages(oldImages => ([...oldImages, ...res_data_links]))
                        })
                    )
                }

                await Promise.all(uploadImagesQueue)
                uploadImagesQueue = []

                setIsUploading(false)
            } else {
                setIsUploading(false)
                return 'An error Occured'
            }

        } catch (error) {
            setIsUploading(false)
            console.log(error)
        } finally {
            setIsUploading(false)

        }
    }


    async function onSubmit() {
        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

            if (!token) {
                toast.error("User not authenticated.");
                console.log("User not authenticated.")
                return;
            }

            if (!title) {
                toast.error("Please, add task title.")
                console.log("Please, add task title.")
                return;
            }

            let response = await axios.post(
                `${BACKEND_URL}/v1/user/task`,
                {
                    options: images.map((image) => ({
                        imageUrl: image
                    })),
                    title,
                    signature: "hardcoded_signature",
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            console.log({ response: response.data })

            toast.success("Task submitted successfully!");

            router.push(`/task/${response.data.id}`)
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while submitting the task.");
        }
    }
    function handleDeleteImage(index: number) {
        const updateImage = [...images];
        updateImage.splice(index, 1);
        setImages(updateImage)
    }

    async function makePayment() {

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(""),
                lamports: 100000000
            })
        )

        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext()

        const signature = await sendTransaction(transaction, connection, { minContextSlot })

        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature })
        // setTxSignature(signature);

    }

    const handleSetList = (newState: { id: number; url: string; }[], sortable: Sortable | null, store: Store) => {
        // Extract the 'url' values from the new state
        const updatedImages = newState.map(item => item.url);
        // Update the state with the array of strings
        setImages(updatedImages);
    };

    return (
        <div className="flex justify-center">
            <div className="max-w-screen-lg w-full">
                <div className="text-2xl text-left w-full pt-20 mx-3.5">
                    Create a task
                </div>

                <form >
                    <label className="pl-4 block mt-2 text-md font-medium">
                        Task details
                    </label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="ml-4 mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="What is your task?"
                        required
                    />

                    <label className="pt-4 block mt-0 font-medium text-black">
                        Add Images
                    </label>

                    {
                        isUploading &&
                        <div className="flex justify-center pt-4 max-w-screen-lg">
                            <div className="px-4 mx-auto absolute top-1/2 left-1/2 
                            transform -translte-x-1/2 -translate-y-1/2">
                                <Spinner />
                            </div>
                        </div>
                    }

                    <section className="container  py-8 -mt-10 -mb-10">
                        <div className="flex flex-wrap gap-3 max-w-fit p-6 rounded-sm justify-center mx-auto">
                            {
                                Array.isArray(images) && images.map((link, index) => (
                                    <div key={link} className="relative group px-8 py-5 bg-gray-700 max-w-fit rounded-lg">
                                        <img src={Object.keys(link)
                                            .filter((key: any) => !isNaN(key))
                                            .map((key: any) => link[key])
                                            .join('')} alt="image" className="object-cover h-32 w-44 rounded-md p-2 border mx-auto" />
                                        <div className="absolute top-2 right-2 cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity">
                                            <button onClick={() => handleDeleteImage(index)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>

                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </section>

                    <div className="mt-4 pt-2 flex justify-center">
                        <div className="w-40 h-40 rounded border text-2xl cursor-pointer">
                            <div className="h-full flex justify-center flex-col relative w-full">
                                <div className="h-full flex justify-center w-full pt-16 text-4xl">
                                    +
                                    <input className="w-full h-full"
                                        id="fileInput" type="file"
                                        accept="image/*"
                                        multiple onChange={uploadImages}

                                        style={{ opacity: "0", position: "absolute", top: 0, left: 0, bottom: 0, right: 0, width: "100%", height: "100%" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={onSubmit}
                            className="mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2"
                        >
                            Submit Task
                        </button>
                    </div>

                    {/* <div className="flex justify-center">
                        <button
                            type="submit"
                            className="mt-4 text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 mb-2"
                        >
                            Create Project
                        </button>
                    </div> */}
                </form>
            </div>
        </div>
    );
};

export async function getServerSideProps(context: AppContext) {
    // Fetch data here
    return {
        props: {
            // Data to pass to component
        }
    }
}