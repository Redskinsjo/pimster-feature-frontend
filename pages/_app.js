import Head from "next/head"
import { StyledEngineProvider } from "@mui/material"

import "../assets/css/style.css"

import { getStrapiMedia } from "../lib/media"
import GraphQLProvider from "../gql/index"

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
      </Head>
      <GraphQLProvider>
        <StyledEngineProvider injectFirst>
          <Component {...pageProps} />
        </StyledEngineProvider>
      </GraphQLProvider>
    </>
  )
}

export default MyApp
