import { all, put, call } from 'redux-saga/effects';
import pick from 'lodash.pick';
import mapValues from 'lodash.mapvalues';
import method from 'lodash.method';
import { loadConfig } from '../Api/api';
import { LOAD_CONFIG_SUCCESS, LOAD_CONFIG_ERROR, UPDATE_CONFIG_SUCCESS, UPDATE_CONFIG_ERROR } from '../constants/actionTypes';


// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.

export function* loadConfigSaga(){
    try {
      const config = yield call(loadConfig);
      yield put({ type: LOAD_CONFIG_SUCCESS, payload: config })
      
    } catch(error){
        yield[
            put({ type: LOAD_CONFIG_ERROR, payload: error})
        ]
    }
}

export function* updateConfigSaga(action){
    try {
     const { payload } = action;
      let config = pick(payload, Object.keys(payload).filter(item => 
            {
                // only update changes made by user
                if(typeof(payload[item]) === 'string'){
                    if ( Number(payload[item]) > 0){
                        return item;
                    } else if (payload[item] !== '' && Number(payload[item]) === 0){
                        if(item === 'refresh_rate'){
                            return item;
                        }
                    } else {
                        // all non positive values and blank values are thrown as error
                        throw Error('Error: Please enter valid positive values only');
                    }
                } 
            } 
        )
       );
      if(Object.keys(config).length === 0 ) {
          // no updates
          throw Error('Error: Nothing to update. Please make the required changes first!');
      }
      config = mapValues(config, (value) => Number(value));
      yield put({ type: UPDATE_CONFIG_SUCCESS, payload: config });
      
    } catch(error){
        yield put({ type: UPDATE_CONFIG_ERROR, payload: error.message});
    }
}


