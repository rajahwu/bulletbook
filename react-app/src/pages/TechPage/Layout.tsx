type Props = {
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

export default function Layout({children }: Props) {
    return (
        <div>
            { children }
        </div>
    )
}