import React from 'react'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar';
import CssBaseline from '@material-ui/core/CssBaseline';

const Layout = pageProps => {

    return (

        < >
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:ital,wght@0,300;0,400;0,700;1,400&display=swap" />
                <link rel="icon" href="/favicon.png" />
                <link href='https://use.fontawesome.com/releases/v5.15.2/css/all.css' rel="stylesheet" />

                <title> MAM - Challenge Front End</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <CssBaseline/>
            <NextNProgress color="#3782FF" options={{ showSpinner: false }} />


            <main>{pageProps.children}</main>

        </>
    )
}

export default Layout