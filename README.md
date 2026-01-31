# Browser Extension + Node Backend

A small browser extension with a Node.js + Express backend that stores incoming form/event data in MongoDB.

## Requirements

- Node.js (recommended v18+)
- npm (bundled with Node.js)
- MongoDB (running locally or accessible via URI)
- A Chromium-based browser (Chrome, Edge) for loading the extension

## Project Structure

- `backend/` — Node.js Express API and Mongoose models
- `extension/` — browser extension source (manifest, background/content scripts)

## Backend: install and run

1. Open a terminal and change into the backend folder:

```
cd backend
```

2. Install dependencies:

```
npm install
```

3. Configure MongoDB (optional):
- The backend currently connects to `mongodb://localhost:27017/mydatabase` by default (see `backend/index.js`).
- To use a different MongoDB URI, update the connection string in `backend/index.js` or add environment handling as needed.

4. Start the backend:

```
npm start
```

For development with auto-restart (if you have `nodemon`):

```
npm run dev
```

The API will listen on http://localhost:4000 by default and exposes a POST endpoint:

- `POST /api/form-events` — accepts JSON payloads and stores them in MongoDB (`backend/models/schema.js`).

## Browser extension: install locally

1. Open your Chromium browser and go to `chrome://extensions`
2. Enable "Developer mode" (top-right)
3. Click "Load unpacked" and select the `extension/` folder from this repository

The extension will load and run its background and content scripts. See `extension/manifest.json`, `extension/background.js`, and `extension/content.js` for implementation details.

## Quick test (Google Forms)

1. Start the backend (`backend` folder) as above.
2. Load the extension in your browser (see previous section).
3. Open a Google Form (a form hosted on https://docs.google.com/forms/) and fill it out.
4. Submit the Google Form — the extension captures the form inputs and sends them to the backend's `POST /api/form-events` endpoint. You should see console logs in the backend and saved documents in MongoDB.

Note: This extension is designed to extract submitted data from Google Forms only. It does not capture or store data from regular HTML forms such as `test.html`.

## Development notes

- The backend uses ES modules (`type: "module"` in `backend/package.json`).
- Data is stored using Mongoose in the `DynamicModel` defined at `backend/models/schema.js`.

## Contributing

Feel free to open issues or submit pull requests. Suggested next improvements:

- Add environment variable support for the MongoDB URI and port
- Add basic tests for the backend endpoints
- Add a build or lint step for the extension scripts

## License

This project does not include a license file. Add one if you plan to publish or share the code.