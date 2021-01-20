# iFaves - A Simple Full Stack Web Application
This is a simple full stack web application created using React and Express.
This app will search the iTunes store and Apple Books store based on the user's input, and return any matching results. Users are then able to 'favourite' any results, view their list of favourites, and delete items from their favourited list.
This app is part of HyperionDev's "Full-Stack Web Development" course and is one of their Capstone Projects.

## Getting Started
#### Dependencies
The following packages were used to create this app:
**Express**:
1. Express Generator
1. Body-Parser (more information found here: https://www.npmjs.com/package/body-parser)
1. Request - for HTTP calls (more information found here: https://www.npmjs.com/package/request)
1. Mocha and Chai - for testing
1. Helmet - for security
1. Nodemon

**React**:
1. Create React App
1. React Bootstrap
1. React-Router-DOM (more information found here: https://reactrouter.com/web/guides/quick-start)
1. React-Addons-Update (more information found here: https://reactjs.org/docs/update.html)
1. React-Test-Renderer - for testing

#### Installation
##### Local Computer
Copy the file 'L2T21-Capstone.zip' to your local computer. Double-click on the zip file to decompress it.
Once decompressed, first open a Terminal window (for Mac) or Command Prompt window (for Windows) in the 'iFaves-backend' folder. In the window, type "npm install" and wait for the files to install.
Next, open a Terminal window (for Mac) or Command Prompt window (for Windows) in the 'iFaves-frontend' folder. In the window, type "npm install" and wait for the files to install.

##### GitHub
To install the app files, follow the link https://github.com/hollysueh/iFaves. On the left hand side there will be a green button labelled "Code". Click on this button, and from the dropdown menu click "Download zip. The zip file will then start automatically downloading to your computer.

Once the zip file has finished downloading, open it by double-clicking on the file.
Open a Terminal window (for Mac) or Command Prompt window (for Windows) in the 'iFaves-backend' folder. In the window, type "npm install" and wait for the files to install.
Repeat the above steps in the 'iFaves-frontend' folder.

## Usage
### Heroku
Visit the following link to use the app online: https://ifaves.herokuapp.com/

### Local PC
Open a Terminal window (for Mac) or Command Prompt window (for Windows) in the 'iFaves-backend' folder. In the window, type "npm start", which will start the app's server on port 8081.
Open a Terminal window (for Mac) or Command Prompt window (for Windows) in the 'iFaves-frontend' folder. In the window, type "npm start", which will load the app in your browser on any available port.

## App Instructions
#### Search iTunes and Apple Book stores
Click the dropdown menu at the top of the page and select 'Search'.
In the text input field, enter any search term you wish to search for. Use the form's dropdown menu to select which type of media you want to search for.
Click the 'Search' button to search. The results will be displayed at the bottom of the page.

#### Add Search Result to Favourites
To add any of the search results to your favourites list, click on the button 'Add to Favourites' which will be next to the corresponding media.

#### View Favourites
Click the dropdown menu at the top of the page and select 'My Favourites'. A list of your favourite media will then be displayed on the page.

#### Delete from Favourites
To delete any items from your favourites list, click on the button 'Delete' which will be next to the corresponding media.

## Testing
#### Express
Open a Terminal window (for Mac) or Command Prompt window (for Windows) in the 'iFaves-backend' folder. In the window, type "npm test", which will run Mocha and Chai tests on the the app's Express server.

#### React
Open a Terminal window (for Mac) or Command Prompt window (for Windows) in the 'iFaves-frontend' folder. In the window, type "npm start", which will run snapshot tests on React app.

## App Security
The Express package 'Helmet' has been used as a security feature for this app.
The Itunes Store API has been used in the back-end of this app so it is not readily accessible to users.

## Credits
**Author: Holly Henaghan**
