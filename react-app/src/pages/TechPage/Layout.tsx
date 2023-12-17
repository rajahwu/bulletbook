type Props = {
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

export default function Layout({children }: Props) {
    return (
        <div className="lg:grid lg:grid-rows-3 lg:grid-cols-3 flex flex-col">
            { children }
        </div>
    )
}