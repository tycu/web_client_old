import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class DateStore extends EventEmitter {
  constructor() {
    super()

    this.months = [
      { value: '0',  label: 'Month' },
      { value: '1',  label: '01 - Jan' },
      { value: '2',  label: '02 - Feb' },
      { value: '3',  label: '03 - Mar' },
      { value: '4',  label: '04 - Apr' },
      { value: '5',  label: '05 - May' },
      { value: '6',  label: '06 - Jun' },
      { value: '7',  label: '07 - Jul' },
      { value: '8',  label: '08 - Aug' },
      { value: '9',  label: '09 - Sep' },
      { value: '10', label: '10 - Oct' },
      { value: '11', label: '11 - Nov' },
      { value: '11', label: '12 - Dec' }
    ];

    this.years = [
      { value: 'NA',  label: 'Year' },
      { value: '2016',  label: '2016' },
      { value: '2017',  label: '2017' },
      { value: '2018',  label: '2018' },
      { value: '2019',  label: '2019' },
      { value: '2020',  label: '2020' },
      { value: '2021',  label: '2021' },
      { value: '2022',  label: '2022' },
      { value: '2023',  label: '2023' },
      { value: '2024',  label: '2024' },
      { value: '2025',  label: '2025' },
      { value: '2026',  label: '2026' },
      { value: '2027',  label: '2027' }
    ];
  }

  getMonths() {
    return this.months;
  }

  getYears() {
    return this.years;
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  handleActions(action) {
    // console.log("DateStore received an action", action);
  }
}

const dateStore = new DateStore;
dispatcher.register(dateStore.handleActions.bind(dateStore));
export default dateStore;
