



### To run locally

get latest packages (only occasionally):
`npm install`

remove unncessary stuff (only occasionally):
`npm prune`

start redis, start api, then start webpack locally (always):
`npm start`

One should see VALID in terminal if it says INVALID there are errors.


### TODO (unfinished)

building static files:
`npm run static`



### To run on server


`npm start`






## Installation (development)

1. ```npm install```
2. ```cp etc/client-config.json.sample etc/client-config.json``` (by default connect to production REST API)
3. ```npm run webpack-devserver``` (wait until build is ready, it will create file "etc/webpack-assets.json")
4. ```npm run nodemon```  (in another terminal, and wait until build is ready)
5. open http://localhost:3001


## About the application

Watch the video:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=eiougg2UhYA
" target="_blank"><img src="http://img.youtube.com/vi/eiougg2UhYA/0.jpg"
alt="IMAGE ALT TEXT HERE" width="480" height="320" border="10" /></a>


## Solved problems:

1. How to deal with routing.
2. How do we deal with data fetching.
3. How to share the same configuration. (And do not bundle it)
4. How to import css in your react components.  Inline CSS (why not Radium, Material-UI)
5. How to deal with css. It should be loaded before html and splitted out.
6. Working with history (Invariant Violation: Browser history needs a DOM)
7. How to deal with I18N.
8. How to deal with long term assets caching


[Post from Viktor Turskyi (aka koorchik) which describes all the ideas in details](http://blog.koorchik.com/isomorphic-react/).



Async actions:

    { type: 'FETCH_POSTS_REQUEST' }
    { type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
    { type: 'FETCH_POSTS_SUCCESS', response: { ... } }

