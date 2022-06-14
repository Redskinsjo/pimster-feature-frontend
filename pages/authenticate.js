import React, { useState, createContext, useEffect } from "react"
import { useForm, SubmitHandler, Control, FieldValues } from "react-hook-form"
import { useRouter } from "next/router"

import LoginForm from "../components/login-form"
import SignupForm from "../components/signup-form"

const initialFormValues = {
  username: "",
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

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
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
