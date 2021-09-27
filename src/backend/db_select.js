const axios = require('axios');

const getCo2Live = async(sensorId) => {
  try {
    return await axios.get('/api/co2Live?sensorId=' + sensorId); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getTolueneLive = async(sensorId) => {
  try {
    return await axios.get('/api/tolueneLive?sensorId=' + sensorId); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getPm1Live = async(sensorId) => {
  try {
    return await axios.get('/api/pm1Live?sensorId=' + sensorId); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getPm25Live = async(sensorId) => {
  try {
    return await axios.get('/api/pm25Live?sensorId=' + sensorId); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getPm10Live = async(sensorId) => {
  try {
    return await axios.get('/api/pm10Live?sensorId=' + sensorId); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getO2Live = async(sensorId) => {
  try {
    return await axios.get('/api/o2Live?sensorId=' + sensorId); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getVocLive = async(sensorId) => {
  try {
    return await axios.get('/api/vocLive?sensorId=' + sensorId); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getH2hoLive = async(sensorId) => {
  try {
    return await axios.get('/api/h2hoLive?sensorId=' + sensorId);
  } catch (error) {
    console.error(error);
  }
};

const getRadonLive = async(sensorId) => {
  try {
    return await axios.get('/api/radonLive?sensorId=' + sensorId);
  } catch (error) {
    console.error(error);
  }
};

const getCoLive = async(sensorId) => {
  try {
    return await axios.get('/api/coLive?sensorId=' + sensorId);
  } catch (error) {
    console.error(error);
  }
};

const getLongTerm = async (type, sensorId, datetime) => {
  try {
    return await axios.get('/api/long-term?sensorId=' + sensorId + '&startDatetime=' + (datetime ? datetime: '') + '&type=' + type);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getCo2Live, getTolueneLive, getPm1Live, getPm25Live, getPm10Live, getO2Live, getVocLive, getH2hoLive, getRadonLive, getCoLive, getLongTerm,
}
