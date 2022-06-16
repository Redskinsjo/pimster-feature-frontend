import { StyledEngineProvider } from "@mui/material"
import Script from "next/script"
import Head from "next/head"

import "../assets/css/style.css"

import GraphQLProvider from "../gql/index"

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          name="google-signin-client_id"
          content="685167845575-nnr32ij3koaoh59onour2gan72nthr3i.apps.googleusercontent.com"
        />
      </Head>
      <Script src="../facebook-login.js" />
      <Script src="https://apis.google.com/js/platform.js" async defer />
      <GraphQLProvider>
        <StyledEngineProvider injectFirst>
          <Component {...pageProps} />
        </StyledEngineProvider>
      </GraphQLProvider>
    </>
  )
}

export default MyApp
