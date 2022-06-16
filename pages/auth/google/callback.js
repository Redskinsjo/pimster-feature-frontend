import { useEffect } from "react"
import { useRouter } from "next/router"
import { client } from "../../../gql"
import { register } from "../../../gql/queries"

const GoogleCallback = () => {
  const router = useRouter()

  const createUseInStrapi = async (token) => {
    try {
      const googleUser = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
      )
      if (googleUser) {
        const email = googleUser.email
        const atIndex = email.split("").findIndex("@")
        const username = email.slice(0, atIndex)

        const strapiUser = await client.mutate({
          mutation: register,
          variables: {
            username,
            email,
            password: email,
          },
        })
        if (strapiUser.data.register) {
          localStorage.setItem("token", strapiUser.data.register.jwt)
          router.replace("/")
        } else {
          router.replace("/authenticate")
        }
      }
    } catch (err) {
      router.replace("/authenticate")
    }
  }

  useEffect(() => {
    createUseInStrapi(
      window.location.href.match(/(?<=access_token=)[a-zA-Z0-9.\-_]*/)[0]
    )
  }, [])

  return <div></div>
}

export default GoogleCallback
