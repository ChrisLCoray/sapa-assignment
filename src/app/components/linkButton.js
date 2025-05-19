import Link from "next/link"

export default function LinkButton(props) {
    return (
        <Link href={props.href} target={props.target} className={`flex border-box bg-(--color-tan2) hover:bg-(--color-tan1) hover:text-white pl-4 pt-2 pb-2 pr-4 text-center justify-center rounded-${props.radius ? props.radius : `full`}`}>{props.text}</Link>
    )
}
