import { SiteHeader, SiteFooter } from "../components"
import { Outlet } from "react-router-dom"

type Props = {
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

export default function Root({ children }: Props) {
    return (
        <div>
            <SiteHeader />
                 <Outlet />
            <SiteFooter />
        </div>
    )
}