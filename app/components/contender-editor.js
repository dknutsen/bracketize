import { computed, get, set } from '@ember/object';
import Component from '@ember/component';
import parseCSV from '../utils/parse-csv';
import parseJSON from '../utils/parse-json';

export default Component.extend({
  // if we are in 'quickInput' mode or not (CSV or JSON editor)
  quickInput: false,

  // which input mode we're currently in
  inputMode: 'csv',
  inputCSV: computed.equal('inputMode', 'csv'),
  inputJSON: computed.equal('inputMode', 'json'),

  parsedContenders: computed('csvValue', function() {
    let inputMode = this.get('inputMode');
    let textValue = this.get('textValue');
    let parsed = inputMode === 'csv' ? parseCSV(textValue) : parseJSON(textValue);
    let parsedObjects = this.arraysToObject(parsed);
    return parsedObjects;
  }),

  arraysToObject(data) {
    let keys = data.shift();
    let output = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      for (let j = 0; j < keys.length; j++) {
        obj[keys[j]] = data[i][j];
      }
      output.push(obj);
    }
    return output;
  },

  // table
  // contenders: [],
  // columns: ['name'],
  headers: computed('contenders', 'contenders.[]', 'columns', 'columns.[]', function() {
    let headers = {};
    this.get('contenders').forEach((contender) => {
      for (let property in contender) {
        if (contender.hasOwnProperty(property)) {
          let header = property.capitalize();
          headers[header] = property;
        }
      }
    });
    return headers;
  }),

  // getContendersFromTable: function(){
  //   return JSON.parse(JSON.stringify(this.get('contenders')));
  // },
  getContendersFromCSV() {
    let csvInputText = this.get('csvInputText');
    try {
      let parsed = parseCSV(csvInputText);
      let sparsed = this.arraysToObject(parsed);
      return sparsed;
    } catch(error) {
      return null;
    }
  },
  getContendersFromJSON() {
    let jsonInputText = this.get('jsonInputText');
    try {
      // let parsed = parseJSON(jsonInputText);
      let parsed = JSON.parse(jsonInputText);
      return parsed;
    } catch(error) {
      return null;
    }
  },
  contendersToCSV() {
    let contenders = this.get('contenders');
    let columns = this.get('columns');
    // set CSV text
    let csvText = `${columns.join(',')}\n`;
    contenders.forEach((contender) => {
      let line = [];
      columns.forEach((column) => {
        line.push(contender[column]);
      });
      csvText += `${line.join(',')}\n`;
    });
    return csvText;
  },
  contendersToJSON() {
    return JSON.stringify(this.get('contenders'), null, 2);
  },
  setContenderDataFromObjects(objects) {
    let contenders = this.get('contenders');
    // let columns = this.get('columns');

    if (contenders.length !== objects.length) {
      return false;
    }

    let columns = {};

    for (let i = 0; i < objects.length; i++) {
      let cobj = objects[i];
      for (let property in cobj) {
        if (cobj.hasOwnProperty(property)) {
          let lowerProp = property.toLowerCase();
          set(contenders[i], lowerProp, cobj[property]);
          columns[lowerProp] = true;
        }
      }
    }
    this.set('columns', Object.keys(columns));
    return true;
  },

  actions: {
    tabChanged(mode) {
      this.set('inputMode', mode);
    },
    startQuickInput() {
      /*
      let contenders = this.get('contenders');
      let columns = this.get('columns');
      // set CSV text
      let csvText = columns.join(',') + '\n';
      contenders.forEach((contender) => {
        let line = [];
        columns.forEach((column) => {
          line.push(contender[column]);
        });
        csvText += line.join(',') + '\n';
      });
      */
      this.set('csvInputText', this.contendersToCSV());
      this.set('jsonInputText', this.contendersToJSON());
      this.set('quickInput', true);
    },
    saveQuickInput() {
      let objects = this.getContendersFromCSV();
      let saved = this.setContenderDataFromObjects(objects);
      if (saved) {
        this.set('quickInput', false);
      }
    },
    cancelQuickInput() {
      this.set('quickInput', false);
    },
    addColumn() {
      get(this, 'addColumn')();
    },
    deleteColumn(prop) {
      get(this, 'deleteColumn')(prop);
    },

    // column name editing
    editColumnName(header, prop) {
      this.set('editingColumn', prop);
      this.set('editingColumnValue', header);
    },
    doneEditingColumnName(header, prop) {
      let value = this.get('editingColumnValue').toLowerCase();
      // validate
      if (value === '' || value === 'name' || (this.get('headers')[value.capitalize()] && value !== prop)) {
        return;
      }
      this.set('editingColumn', null);
      get(this, 'columnNameChanged')(prop, value);
    }
  }
});
