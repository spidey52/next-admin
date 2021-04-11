import Link from 'next/link'

function ListCategory(props) {

  const url = "/" + props.title

  return (<>
    <Link href={url}>
      <li>
        <a>
          {props.title}
        </a>
      </li>
    </Link>

  </>)
}

export default ListCategory