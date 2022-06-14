import React, { useContext } from "react"
import { Controller } from "react-hook-form"
import { TextField } from "@mui/material"

import { FormContext } from "../pages/authenticate"

const CustomField = ({ name, clearErrors, errors }) => {
  const { control } = useContext(FormContext)
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => {
        return (
          <div
            className={
              name === "age" ? "col-span-2 w-full" : "col-span-1 w-full"
            }
          >
            <TextField
              className="w-full"
              type={
                name === "password" || name === "confirmation" ? "password" : ""
              }
              value={value}
              onChange={(e) => {
                if (Object.keys(errors).length > 0) clearErrors()
                onChange(e.target.value)
              }}
              label={name[0].toUpperCase() + name.slice(1).toLowerCase()}
            />
          </div>
        )
      }}
    ></Controller>
  )
}
export default CustomField
