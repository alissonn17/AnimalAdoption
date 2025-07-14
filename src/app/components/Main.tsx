import React, { JSX } from "react"

export default function Main({children}: mainprops): JSX.Element{

    return <main className="flex flex-col items-center">
        {children}
    </main>
}