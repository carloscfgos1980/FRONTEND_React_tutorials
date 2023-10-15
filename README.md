# Net_Ninja-Full_React_Tutorial

# *** THE NET NINJA: REATC ***

1. Create a react app. Type in Command Line Interface:
npx create-react-app learning-react
N: learning-react is just the name of the file that will contain our application.

2. Delete the file reportWebVitals.js inside the folder src

3. Inside index.js we need to delete Import reportWebVitals and delete reporWebVitals() at the button of the page.

4. Afther we download a GitHub repository for React, we have a missing files of npm. To get the nom folders we type:
npm install

5. Import React is only necessary in index.js unless we are using an older version of nudes (program).


6. Shortcut to create div and className. Ex:
Type:
div.content 

pres Tab
It creates a div with the className of content. This is possible cos we add in setting Emmet:
Item: javascript
Value: javascriptreact


7. Shortcut to Create a stateless react component. This is possible because we install a package in VSCode called: Simple React Snippets 
Type: 
sfc 
then press keyboard: Tab

8. Delete App.css file and also delete importe App.css from './App.css' code from the App.j file

# *** Notes_The-Net-Ninja_React II ****

1. Lesson # 13. Cool way to delete the clicked item from the Dom by filtering out using the Id.

https://www.youtube.com/watch?v=CWEOYFzgOJs&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=13

2. To practice the API we create a fake API Rest(Lesson # 16), like this:
a-) Open a new Terminal
b-) Type:

	npx json-server --watch data/db.json --port 8000

Note: data/db.jason is the neame of the folder and the name of the json file that we stora the fake API in our project

3. Lesson # 18. Loading message

4. Lesson # 19. Catch the error

5. Lesson # 20. Making a custum hook (useEffect). Very important to reuse the funtion in different places

https://www.youtube.com/watch?v=Jl4q2cccwf0&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=20

6. Lesson # 21.  The React Router
We need to install a npm package by typing this in a new terminal:

	npm install react-router-dom@5

Note: @5 means version 5 but version 6 should be available soon

7. Lesson # 22. Exact Match Routes
Create multiple pages in our website with swith command

https://www.youtube.com/watch?v=EmUa_tcSM-k&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=22

8. Lesson # 23. Router Links
It makes the website much more faster cos it doesnt need to make a request to the server everytime we click a new page inside our website, instead the changes are displayed in the DOM. In order to do that we change <a> for <links> as the example in the lesson:

https://www.youtube.com/watch?v=DO-pSysGItQ&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=23

9. Lesson # 24. useEffect Cleanup.
This is to stop the fetching once we are in a different page.

https://www.youtube.com/watch?v=aKOQtGLT-Yk&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=24


10. LEsson # 25. Route Parameters. Somehting related to links. i/ need to study theis lesson again

https://www.youtube.com/watch?v=t7VmF4WsLCo&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=25


11. Lesoon # 26. Reusing Custom Hooks

https://www.youtube.com/watch?v=c-5VXl8yPQA&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=26

# *** Notes_The-Net-Ninja_React III ****

1. Lesson # 27. Controlled Inputs (forms). How to create forms and grab the value.

https://www.youtube.com/watch?v=IkMND33x0qQ&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=27

2. Lesson # 28. Submit Events. Submit the forms. Create a json object that we will storage in a database

https://www.youtube.com/watch?v=pJiRj02PkJQ&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=28

3. Lesson # 29 - Making a POST Request. Also adding loading state to the submit button

https://www.youtube.com/watch?v=EcRFYF4B3IQ&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=29

4. Lesson # 30. #30 - Programmatic Redirects. Afther submit. It goes automatically to the home page

https://www.youtube.com/watch?v=TmVqwhBUiSM&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=30

5. Lesson # 31 - Deleting Blogs

https://www.youtube.com/watch?v=Wb-0CkLiyQk&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=31

6. Lesson # 32 - 404 Pages & Next Steps. In case that there is the page, it will show a message and redirect to the homepage. Sort of atching problem. Notes are in:
App.js
NotFound.js (we create this component specifically for this porpuse)

https://www.youtube.com/watch?v=XW0t2lk4Ffo&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=32
