import React, { JSX } from "react"

export default function Main({children}: mainprops): JSX.Element{

    return <main className="flex-col justify-center items-center">
        {children}
    </main>
}