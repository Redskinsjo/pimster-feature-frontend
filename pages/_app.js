import { StyledEngineProvider } from "@mui/material"

import "../assets/css/style.css"

import GraphQLProvider from "../gql/index"

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <GraphQLProvider>
        <StyledEngineProvider injectFirst>
          <Component {...pageProps} />
        </StyledEngineProvider>
      </GraphQLProvider>
    </>
  )
}

export default MyApp
