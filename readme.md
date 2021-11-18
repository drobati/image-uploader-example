# image upload example

![](images/ss-default.png)

Supports 
* Drag and Drop
* Progress Bar
* Error Handling
* Validation (client side and server side)

## react-client
React-client is a CRA with tailwindcss that implements a drag and drop image upload interface.

### usage
```js
npm i
npm run start
```

## image-api
Image-api is a nest.js/typescript/node REST API that implements CRUD routes to submit an image.

### usage
```js
npm i
npm run start:dev
```

## Possible improvements
* Add support for multiple images
* Add support for S3
* Add routes for fetching image filenames
* Image optimization or resizing
* Better unit tests
* CI/CD for unit tests
* JSDocs describing the client and server code