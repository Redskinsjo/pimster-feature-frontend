import React, { useContext } from "react"
import { Button } from "@mui/material"

import CustomField from "./custom-field"
import { client } from "../gql"
import { register } from "../gql/queries"
import { FormContext } from "../pages/authenticate"

const SignupForm = ({
  fields,
  setShouldSignup,
  setError,
  errors,
  clearErrors,
  reset,
}) => {
  const { handleSubmit } = useContext(FormContext)

  const onClick = async (data) => {
    try {
      const user = await client.mutate({
        mutation: register,
        variables: { input: { ...data, username: "test" } },
      })
      if (user.data.register) {
        const token = user.data.register.jwt
        localStorage.setItem("token", token)
        setShouldSignup(false)
      }
    } catch (err) {
      setError("graphql", {
        message:
          err.message === "An error occurred during account creation"
            ? "Username and password should be 6 characters minimum"
            : err.message,
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onClick)}
      className="grid grid-cols-1 gap-2 border-[0.5px] rounded-3xl border-black border-solid px-8 py-5"
    >
      <h1 className="col-span-1 font-bold text-2xl text-center">
        Sign up here
      </h1>

      {Object.keys(fields).map((field) => (
        <CustomField
          key={field}
          name={field}
          clearErrors={clearErrors}
          errors={errors}
        />
      ))}
      {errors.graphql && (
        <span className="text-red-500 col-span-1">
          {errors.graphql.message}
        </span>
      )}
      <div className="col-span-1 p-2 h-[30px]">
        <Button
          type="submit"
          className="w-full col-span-2 bg-blue-500 text-white hover:border-[1px] hover:border-black hover:border-solid hover:bg-white hover:text-blue-500"
        >
          Sign up
        </Button>
      </div>
      <span
        onClick={() => {
          reset()
          clearErrors()
          setShouldSignup(false)
        }}
        className="text-xs hover:text-blue-500 cursor-pointer"
      >
        Back to login
      </span>
    </form>
  )
}
export default SignupForm
