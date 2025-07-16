import Link from "next/link";
import { JSX } from "react";

export default function Header(): JSX.Element{

    return <>
    <header className="flex bg-blue-100 text-black justify-center items-center flex-row w-full h-<50> fixed">
            <ul className="flex justify-around flex-row w-full">
                <li><Link href="../animais">Animais</Link></li>
                <li><Link href="../abrigo">Abrigos</Link></li>
                <li><Link href="../">Home</Link></li>
                <li>link</li>
                <li>link</li>
            </ul>
        </header>
    </>
}