import React, { JSX } from "react"

interface mainprops{
  children: React.ReactNode;
}

export default function Main({children}: mainprops): JSX.Element{

    return <main className="flex-col justify-center items-center">
        {children}
    </main>
}