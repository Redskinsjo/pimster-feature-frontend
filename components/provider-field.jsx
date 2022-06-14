import { Button } from "@mui/material"
import { createElement } from "react"
import { AiOutlineGoogle } from "react-icons/ai"
import { RiFacebookFill } from "react-icons/ri"

const providerIcon = {
  google: AiOutlineGoogle,
  facebook: RiFacebookFill,
}

const ProviderField = ({ providerName }) => {
  const icon = createElement(providerIcon[providerName])
  return (
    <div className="h-[30px] mb-4">
      <Button
        onClick={() => {
          if (window) {
            window.location.replace(
              `${process.env.API_PROD_URI}/api/connect/${providerName}`
            )
          }
        }}
        startIcon={icon}
        endIcon={<div />}
        className="flex justify-between border-[0.5px] border-solid border-slate-400 hover:border-[1px] hover:border-black hover:border-solid hover:bg-white hover:text-blue-500 w-full"
      >
        {providerName[0].toUpperCase() + providerName.slice(1)}
      </Button>
    </div>
  )
}

export default ProviderField
