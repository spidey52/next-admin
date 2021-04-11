import axios from "axios";
import { useRef } from "react";
import { useRouter } from 'next/router'
import ApiRoute from "../../helpers/api-routes";

function CreateModel({ data, path }) {

  const formRef = useRef()

  if (!data) {
    return <p>loading...</p>
  }

  const router = useRouter()


  const submitHandler = async (e) => {
    e.preventDefault()
    const body = {}

    for (let field = 0; field < data.fields.length; field++) {

      // TODO: check required field is empty or not.

      const name = formRef.current.children[field].children[1].name
      const value = formRef.current.children[field].children[1].value

      body[name] = value
    }

    try {

      await axios.post(`${ApiRoute}/${path.toLowerCase()}`, body)

      router.replace(`/${path}`)

    } catch (error) {
      console.log(error.response.data)
      alert(error.response.data)
    }
  }

  return (

    <>
      <form ref={formRef} onSubmit={submitHandler}>
        {data.fields.map(field => {
          return <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.name}: <span className="required"> {field.required && "*"} </span> </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.name}
            />
          </div>
        })}

        <button>Add New</button>
      </form>

      <br />
      <hr />


      <p>Fields</p>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>

    </>
  )

}

export async function getServerSideProps(context) {

  const { params } = context

  const path = ApiRoute + '/models/' + params.model

  const { data } = await axios.get(`${path}`)

  return {
    props: { data, path: params.model }
  }

}



export default CreateModel