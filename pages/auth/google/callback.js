import { useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"

import { client } from "../../../gql"
import { register } from "../../../gql/queries"

const GoogleCallback = () => {
  const router = useRouter()

  const createUseInStrapi = async (token) => {
    try {
      const googleUser = await axios({
        method: "get",
        url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`,
      })
      console.log(googleUser)
      if (googleUser.status === 200) {
        const email = googleUser.data.email
        const atIndex = email.split("").findIndex((el) => el === "@")
        const username = email.slice(0, atIndex)

        const newStrapiUser = await client.mutate({
          mutation: register,
          variables: {
            input: {
              username,
              email,
              password: email,
            },
          },
        })
        if (newStrapiUser.data.register) {
          localStorage.setItem("token", newStrapiUser.data.register.jwt)
          router.replace("/")
        } else {
          router.replace("/authenticate")
          console.log("strapi user wasn't created")
        }
      }
    } catch (err) {
      // if (err.message === "Email is already taken")
      // router.replace("/authenticate")
      console.log(err.message)
    }
  }

  useEffect(() => {
    // createUseInStrapi(
    //   window.location.href.match(/(?<=access_token=)[a-zA-Z0-9.\-_]*/)[0]
    // )
  }, [])

  return <div></div>
}

export default GoogleCallback
