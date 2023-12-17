type Props = {
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

export default function Layout({children }: Props) {
    return (
        <div className="grid grid-rows-3 grid-cols-3">
            { children }
        </div>
    )
}