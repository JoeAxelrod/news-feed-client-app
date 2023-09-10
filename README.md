A short Appfront Exercise# News Feed App

## Installation

1. **Clone the Repository**
	```
	git clone https://github.com/JoeAxelrod/news-feed-client-app.git
	```

2. **Navigate to Client Directory**
	```
	cd news-feed-client-app
	```

3. **Install Client Dependencies**
	```
	npm install
	```

4. **Navigate to Server Directory**
	```
	cd ../node-express
	```

5. **Install Server Dependencies**
	```
	npm install
	```

## Running the App

1. **Start the Server**
	```
	cd node-express
	npm start
	```

2. **Start the Client**
	```
	cd news-feed-client-app
	npm start
	```

## Running the App with Docker

1. **Start the Server and Client with Docker Compose**
    ```
    docker-compose up -d
    ```

This will start both the server and the client as background services. To stop them, you can run `docker-compose down`.

## Testing

We use Mocha and Chai for testing the backend API. To run the tests, navigate to the server directory and run:


### Test Cases

#### Server API Tests

1. **GET /items**: Validates that the endpoint returns an array of items.
2. **POST /signup**: Tests the registration of a phone number.
3. **POST /add-item**: Checks if a new item can be added.

You can find the test scripts under `./test/` directory.

To run an individual test case, you can use the following command:

```bash
mocha -g '<describe_string>'
```

## Features

- Fetch news items from the server
- Ability to add news items via a modal dialog form
    - Fields for Title, Text, Image, and Link
- Simple sign-up/login via phone number
- Business owners can select which customers see which promotions

## Modal Dialog Form Fields

- **Title**: A text field to enter the title of the news item.
- **Text**: A text field to enter the description or content of the news item.
- **Image**: A text field to enter the URL of the image for the news item.
- **Link**: 
  - **Text**: A text field to enter the text for the link button.
  - **Path**: A text field to enter the URL path for the link button.

To add a news item, click the "Add Item" button to open the modal dialog, fill out the form fields, and then click "Submit".






## Contributing

Feel free to fork the project and submit a pull request with your changes!

