import React, { useContext } from "react"
import { Button } from "@mui/material"
import { useRouter } from "next/router"

import CustomField from "./custom-field"
import { FormContext } from "../pages/authenticate"
import { client } from "../gql"
import { signIn } from "../gql/queries"
import ProviderField from "../components/provider-field"

const providers = ["google", "facebook"]

const LoginForm = ({
  setShouldSignup,
  setError,
  errors,
  clearErrors,
  reset,
}) => {
  const { handleSubmit } = useContext(FormContext)
  const router = useRouter()

  const renderProvider = (provider) => {
    return React.createElement()
  }

  const onSubmit = async (data) => {
    try {
      const user = await client.mutate({
        mutation: signIn,
        variables: {
          input: { identifier: data.username, password: data.password },
        },
      })
      if (user.data.login) {
        const token = user.data.login.jwt
        localStorage.setItem("token", token)
        router.replace("/")
      }
    } catch (err) {
      setError("graphql", {
        message: err.message,
      })
    }
  }

  function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile()
    console.log("ID: " + profile.getId()) // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName())
    console.log("Image URL: " + profile.getImageUrl())
    console.log("Email: " + profile.getEmail()) // This is null if the 'email' scope is not present.
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-2 border-2 border-black border-solid px-8 py-5"
    >
      <h1 className="font-bold text-2xl">Connect yourself</h1>
      {providers.map((p) => (
        <ProviderField key={p} providerName={p} />
      ))}
      <div className="g-signin2" data-onsuccess={onSignIn}></div>
      <hr />

      {["username", "password"].map((field) => (
        <CustomField
          key={field}
          name={field}
          errors={errors}
          clearErrors={clearErrors}
        />
      ))}
      {errors.graphql && (
        <span className="text-red-500">{errors.graphql.message}</span>
      )}
      <div className="flex justify-end p-2 h-[30px]">
        <Button
          type="submit"
          className="bg-blue-500 text-white hover:border-[1px] hover:border-black hover:border-solid hover:bg-white hover:text-blue-500"
        >
          Log in
        </Button>
      </div>
      <span
        className="text-xs hover:text-blue-500 cursor-pointer"
        onClick={() => {
          reset()
          clearErrors()
          setShouldSignup(true)
        }}
      >
        Doesn't have an account yet?
      </span>
    </form>
  )
}
export default LoginForm
