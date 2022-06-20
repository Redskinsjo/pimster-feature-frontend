import React, { useState, createContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"

import LoginForm from "../components/login-form"
import SignupForm from "../components/signup-form"

const initialFormValues = {
  // username: "",
  email: "",
  password: "",
}

export const FormContext = createContext({
  control: {},
  handleSubmit: (data) => {},
})

const Authenticate = () => {
  const [shouldSignup, setShouldSignup] = useState(false)
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    defaultValues: initialFormValues,
  })
  const router = useRouter()

  const shouldRedirect = () => {
    let token = localStorage.getItem("token")
    return token
      ? true
      : window.location.href.includes("id_token")
      ? "setItem&true"
      : false
  }

  useEffect(() => {
    if (shouldRedirect()) {
      if (shouldRedirect() === "setItem&true") {
        localStorage.setItem(
          "token",
          window.location.href.match(/(?<=id_token=)[a-zA-Z0-9.\-_]*/)[0]
        )
      }
      router.replace("/")
    }
  }, [shouldSignup])

  return (
    <div className="h-full flex justify-center items-center">
      <FormContext.Provider value={{ control, handleSubmit }}>
        {shouldSignup ? (
          <SignupForm
            fields={initialFormValues}
            setShouldSignup={setShouldSignup}
            setError={setError}
            errors={errors}
            clearErrors={clearErrors}
            reset={reset}
          />
        ) : (
          <LoginForm
            fields={initialFormValues}
            setShouldSignup={setShouldSignup}
            setError={setError}
            errors={errors}
            clearErrors={clearErrors}
            reset={reset}
          />
        )}
      </FormContext.Provider>
    </div>
  )
}
export default Authenticate
