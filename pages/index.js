import axios from 'axios'
import ListCategory from '../components/list-category'
import apiRoutes from '../helpers/api-routes'

export default function Home(props) {

  if (!props.data) return <li>loading...</li>

  return (
    <>
      <h1>Model List</h1>
      {
        props.data.map(model => {
          return <ListCategory key={model} title={model} />
        })
      }
    </>
  )

}


export async function getServerSideProps() {


  try {
    const { data } = await axios.get(`${apiRoutes}/models`)

    console.log(data)
    return {
      props: { data }
    }


  } catch (error) {
    console.log(error)
    return {
      props: { data: "" }
    }
  }

}