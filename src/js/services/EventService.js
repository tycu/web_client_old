import request from 'reqwest';
import when from 'when';

class EventService {

  loadEvents(url, offset) {
    return when(request({
      url: url,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      data: {
        offset: offset
      }
    })).then(function(response) {
      return {events: response};
    });
  }

}

export default new EventService()
