const axios = require('axios');

const getCo2Live = async () => {
  try {
    return await axios.get('/api/co2Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getTolueneLive = async () => {
  try {
    return await axios.get('/api/tolueneLive'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getPm1Live = async () => {
  try {
    return await axios.get('/api/pm1Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getPm25Live = async () => {
  try {
    return await axios.get('/api/pm25Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getPm10Live = async () => {
  try {
    return await axios.get('/api/pm10Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getO2Live = async () => {
  try {
    return await axios.get('/api/o2Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getVocLive = async () => {
  try {
    return await axios.get('/api/vocLive'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};


module.exports = {
  getCo2Live, getTolueneLive, getPm1Live, getPm25Live, getPm10Live, getO2Live, getVocLive
}