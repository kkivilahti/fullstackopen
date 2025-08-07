# Part 2: Communicating with server

Part 2 continues with React basics, focusing on topics like list rendering, modular components, state management with `useState` and `useEffect`, form handling and user input, styling a React app, and communicating with a server using Axios.

The exercises:
<details>
<summary><strong>Courseinfo</strong></summary>
<br />

- Creating reusable components
- Rendering lists dynamically with `map`
- Calculating using `reduce`

![courseinfo screenshot](screenshots/courseinfo.png)

<hr />
</details>

<details>
<summary><strong>Phonebook</strong></summary>
<br />

- Managing form inputs and state
- Communicating with a local `Json Server` using `Axios` (GET, POST, PUT, DELETE)
- Filtering contacts based on user input
- Displaying notifications for successful actions or errors
- Adding CSS styling to a React app

![phonebook screenshot](screenshots/phonebook.png)

<strong>Note!</strong> When running the Phonebook app, remember to start the backend server by running: `npm run server`
<hr />
</details>

<details>
<summary><strong>Countries</strong></summary>
<br />

- Fetching data from public APIs:
    - Rest Countries
    - OpenWeatherMap
- Filtering countries based on user input
- Conditional rendering of search results
- Displaying country details either when the “show” button is clicked, or when the search returns a single result
<br />

![countries screenshot](screenshots/countries1.png)
<br />

![countries screenshot](screenshots/countries2.png)

<strong>Note!</strong> When running the Countries app, you need your own OpenWeatherMap API key.
1. Get your API key by signing up at [https://openweathermap.org/](https://openweathermap.org/)
2. Create a file named `.env` in the root folder of the Countries project
3. Add the following line to the file with your API key: `VITE_API_KEY=your_key`
<hr />
</details>

## Running the applications
Assuming you have already cloned the repository:

1. Navigate to the folder of the exercise you want to run, for example `cd part2/courseinfo`
2. Install dependencies: `npm install`
3. Start the application: `npm run dev`

(For Phonebook, you also need to start the server: `npm run server`)

The app should be available at http://localhost:5173/