const axios = require('axios');

const get_Con_dust = async (dust_size) => {
  try {
    return await axios.get('http://58.121.58.139:3000/dust_'+dust_size); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getCo2Live = async () => {
  try {
    return await axios.get('http://58.121.58.139:3000/co2Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getTolueneLive = async () => {
  try {
    return await axios.get('http://58.121.58.139:3000/tolueneLive'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getPm1Live = async () => {
  try {
    return await axios.get('http://58.121.58.139:3000/pm1Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getPm25Live = async () => {
  try {
    return await axios.get('http://58.121.58.139:3000/pm25Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getPm10Live = async () => {
  try {
    return await axios.get('http://58.121.58.139:3000/pm10Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getO2Live = async () => {
  try {
    return await axios.get('http://58.121.58.139:3000/o2Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getVocLive = async () => {
  try {
    return await axios.get('http://58.121.58.139:3000/vocLive'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};


module.exports ={
  get_Con_dust, getCo2Live, getTolueneLive, getPm1Live, getPm25Live, getPm10Live, getO2Live, getVocLive
}