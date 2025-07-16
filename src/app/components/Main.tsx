import React, { JSX } from "react"

export default function Main({children}: mainprops): JSX.Element{

    return <main className="flex flex-row justify-center items-center bg-blue-50 text-black w-screen h-screen">
        {children}
    </main>
}