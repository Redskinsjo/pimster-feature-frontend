import { useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"

const Callback = () => {
  const router = useRouter()

  const createUseInStrapi = async (qParams) => {
    const access_token = qParams.match(/(?<=access_token=)[a-zA-Z0-9.\-_]*/)
    try {
      const firstRequest = await axios({
        method: "get",
        url: `https://pimster-feature-backend.herokuapp.com/api/auth/google/callback/?${qParams}`,
      })
      console.log(firstRequest)
      if (firstRequest.status === 200) {
        const newStrapiUser = await axios({
          method: "get",
          url: `https://pimster-feature-backend.herokuapp.com/api/auth/google/callback/?access_token=${access_token}`,
        })
        if (newStrapiUser.status === 200) {
          localStorage.setItem("token", newStrapiUser.data.jwt)
          router.replace("/")
        } else {
          router.replace("/authenticate")
          console.log("strapi user wasn't created")
        }
      }
    } catch (err) {
      // if (err.message === "Email is already taken")
      router.replace("/authenticate")
      console.log(err.message)
    }
  }

  useEffect(() => {
    createUseInStrapi(
      window.location.href.match(/(?<=\?)[a-zA-Z0-9.\-_=&%]*/)[0]
    )
  }, [])

  return <div></div>
}

export default Callback
