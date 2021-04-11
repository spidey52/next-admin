import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import ApiRoute from "../helpers/api-routes"

function ModelDetails({ data, path }) {
  if (data.length === 0) {
    return <>
      <Link href={`/${path}/create`}>
        <button>add new</button>
      </Link>
      <p>No Data Found, Create A New One</p>
    </>
  }

  if (!data) {
    return <p>loading...</p>
  }

  const router = useRouter()

  const deleteHandler = async (id) => {

    try {
      await axios.delete(`${ApiRoute}/${path}/${id}`)
      router.replace(router.asPath)
    } catch (error) {
      console.log(error.response.data);
    }

  }

  return (

    <>

      <Link href={`/${path}/create`}>
        <button>add new</button>
      </Link>

      <h1>List Data</h1>

      {
        data.map(data => {
          return <div key={data._id}>

            <pre>
              {JSON.stringify(data, null, 2)}
            </pre>

            <button onClick={e => deleteHandler(data._id)}>Delete</button> &nbsp;
          <button>Update</button>

          </div>
        })
      }


    </>

  )
}


export async function getServerSideProps(context) {

  const { params } = context

  const path = params.model.toLowerCase()

  const { data } = await axios.get(`${ApiRoute}/${path}`)

  return {
    props: { data, path: params.model }
  }
}


export default ModelDetails
