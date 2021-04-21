 
<br />
<p align="center">

  <h3 align="center">MAM - Challenge Front-End (React.Js-Next.js)</h3>

  <p align="center">
    This is an React.Js SPA build with Next.js (Typescript) to be a fleet manager for trucks in Lisbon City
    <br />
     <a href="https://mam-challenge-front-end.vercel.app/"><strong>Check the demo</strong></a>
    ·
   <a href="https://github.com/othecos/MAM-Challenge-Backend-Public">View Back-End</a>
  </p>
</p>

 
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Pre requisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#configuring-environments">Configuring environments</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#testing">Testing</a></li> 
    <li><a href="#cicd-vercel">CI/CD(Vercel)</a></li>
  </ol>
</details>

#

## About The Project

This project was build with the purpose to serve as an Fleet Manager Web Application for the MAM Challenge. This application shows a Google Map view where the user can search for trucks license plate and see the nearest POI and the latest GPS from a given truck.

Just to remind that this is <strong>NOT</strong> a <strong>PRODUCTION</strong> ready project, and some security issues should be consider if used in Production environment

This project has it's CI/CD pipeline hosted on Vercel.

### Built With

-   [React.Js](https://reactjs.org/)
-   [Next.Js](https://nextjs.org/)
-   [Formik](https://formik.org/)
-   [Yup](https://github.com/jquense/yup)
-   [Material Ui](https://material-ui.com/)
-   [Axios](https://github.com/axios/axios)
-   [Typescript](https://www.typescriptlang.org/)
-   [Jest](https://jestjs.io/)
-   [React-Testing](https://testing-library.com/)
-   [Vercel](https://vercel.com/)

 

#

### Prerequisites

You should have <strong>Node and NPM</strong> installed to run this project.

To check with you have those installed, run and see some similar output:

-   NPM
    ```sh
    npm -v
    6.14.4
    ```
-   Node
    ```sh
    node -v
    v10.19.0
    ```

### Installation

1. Install the NPM Packages dependencies
    ```sh
     npm install
    ```

### Configuring environments

1. Since this application uses Google Maps, you **must** provide `NEXT_PUBLIC_API_KEY` in the `.env.local`

    - You can generate this API KEY [here](https://developers.google.com/maps/documentation/javascript/get-api-key)

2. You also must config your `NEXT_PUBLIC_HOST`.
   <br>
   You can use our ready to use server that was provided in the `.env.example` , or connect to local instance.

3. In the end of this steps, your `.env.local` should look like this

    ```sh
    NEXT_PUBLIC_API_KEY=AIzaSyAIo1JFFQDuBesadasdasd-dsa3CAxnBHzE
    NEXT_PUBLIC_HOST=https://mam-challenge-backend.herokuapp.com/
    NEXT_PUBLIC_VERSION="v1"
    ```

#

## Usage

After the initial setup, you are ready to go and can start your development server

1. To use your local environment, run:

    ```sh
    npm run dev
    ```

#

 

## Testing

To run the unit tests, just run the following command:
    ```sh
    npm run test
    ```

#

## CI/CD (Vercel)

If you would like, you can create an account in Vercel to test this pipeline!

**_Obs:. You should create environment variables in the Vercel to make it work, since the .env files aren't upload to Github_**
