# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Google Auth Setup & Usage

This project supports Google OAuth login and signup via Supabase Auth.

### How to Enable Google Auth

1. **Google Cloud Console:**
   - Go to https://console.cloud.google.com/ and create a new project (or use an existing one).
   - Navigate to APIs & Services > Credentials.
   - Click 'Create Credentials' > 'OAuth client ID'.
   - Choose 'Web application'.
   - Add your app's URL to 'Authorized JavaScript origins' (e.g., http://localhost:3000 for local dev).
   - Add your Supabase project's callback URL to 'Authorized redirect URIs' (find this in Supabase Auth > Providers > Google).
   - Save and copy the Client ID and Client Secret.

2. **Supabase Dashboard:**
   - Go to your project > Auth > Providers > Google.
   - Paste the Client ID and Secret from Google Cloud.
   - Save changes.

3. **Environment Variables:**
   - Ensure your frontend `.env` has the correct `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY`.

### Using Google Auth in the App
- On the Sign In and Sign Up pages, click the 'Sign in with Google' button.
- You will be redirected to Google, then back to the app with your session active.
- All user sessions are managed by Supabase Auth and the app's AuthContext.

For more details, see [Supabase Docs: Google Auth](https://supabase.com/docs/guides/auth/social-login/auth-google).

## AI Features

### AI Image Generation (Midjourney)
- Route: `/ai/image`
- Enter a prompt to generate an original image using Midjourney (via backend Edge Function)
- Download or use the generated image in product creation

### AI Image Upscaling (Real-ESRGAN)
- Route: `/ai/upscale`
- Upload or select an image to upscale using Real-ESRGAN (via backend Edge Function)
- Download or use the upscaled image in product creation

### AI Content Generation
- Route: `/ai/generate`
- Generate product descriptions or other content using AI

All AI features are fully server-side, secure, and production-ready. See `/src/api/ai.js` for API integration.
