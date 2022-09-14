## Auth0 permissions example using Fastify

This application demonstrates using Auth0 to secure access to a simple API built with Fastify. Using the API requires a valid access token and different endpoints require different scopes / permissions defined in Auth0, e.g. reading items requires the scope `read:items` and adding items requires the scope `add:items`.

## Usage

## Configuring Auth0

You need to have an [Auth0 API](https://auth0.com/docs/get-started/apis) created to run this example. You should also define a pair of permissions for your API through the dashboard: `read:items` and `add:items`.

To simulate a service calling our API, we will use the [Client Credentials Flow](https://auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow). To get started with this flow, create a new [machine-to-machine application](https://auth0.com/docs/microsites/call-api/call-api-m2m-app) and authorize it to use your previously created Auth0 API. Do not forget to also give it the `read:items` and `add:items` permissions!

Now that you have both your API and a machine-to-machine application created, you can use the client credentials flow to request an access token to the API for the application:

```bash
curl --request POST \
     --url 'https://yourveryowndomain.auth0.com/oauth/token' \
     --header 'content-type: application/x-www-form-urlencoded' \
     --data grant_type=client_credentials \
     --data client_id=client-id-from-auth0 \
     --data client_secret=client-secret-from-auth0 \
     --data audience=https://your-api-identifier \
```

Grab the access token from the response, as it will be used in the next section.

## Configuring Fastify

First, expose your Auth0 API configuration to the Fastify application through environment variables using an `.env` file for example:

```
AUTH0_DOMAIN=yourveryowndomain.auth0.com
API_IDENTIFIER=https://your-api-identifier
```

Next, install the dependencies and start the API:

```
npm ci
npm run dev
```

Now you should be able to use your machine-to-machine application token to access the API:

```bash
# This requires add:items scope
curl --request POST \
     --header "Content-Type: application/json" \
     --header "Authorization: BEARER $ACCESS_TOKEN"
     --data '{"name": "fourth item"}' \
     localhost:3000/items

# This requires read:items scope
curl --header "Authorization: BEARER $ACCESS_TOKEN" \
     localhost:3000/items
```
