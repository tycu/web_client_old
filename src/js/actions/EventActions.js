import dispatcher from "../dispatcher";


// Not Create, edit, update, more like
// support/oppose/refresh


export function createEvent(text) {
  dispatcher.dispatch({
    type: "CREATE_EVENT",
    text,
  });
}

export function deleteEvent(id) {
  dispatcher.dispatch({
    type: "DELETE_EVENT",
    id,
  });
}

export function editEvent(id) {
  dispatcher.dispatch({
    type: "EDIT_EVENT",
    id,
    text,
  })
}

export function reloadEvents() {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
  dispatcher.dispatch({type: "FETCH_EVENTS"});
  setTimeout(() => {
    dispatcher.dispatch({type: "RECEIVE_EVENTS", events: [
      {
        id: 8484848484,
        text: "Go Shopping Again",
        complete: false
      },
      {
        id: 6262627272,
        text: "Hug Wife",
        complete: true
      },
    ]});

    // for errors
    if (false) {
      dispatcher.dispatch({type: "FETCH_EVENTS_ERROR"});
    }

  }, 1000);
}
