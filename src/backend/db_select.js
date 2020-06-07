const axios = require('axios');
const server = "local";

const getCo2Live = async () => {
  try {
    if(server!=="local")
      return await axios.get('http://58.121.58.139:3000/co2Live'); //dust_size에 따른 url 변경
    else
      return await axios.get('http://localhost:3000/co2Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getTolueneLive = async () => {
  try {
    if(server!=="local")
      return await axios.get('http://58.121.58.139:3000/tolueneLive'); //dust_size에 따른 url 변경
    else
      return await axios.get('http://localhost:3000/tolueneLive'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getPm1Live = async () => {
  try {
    if(server!=="local")
      return await axios.get('http://58.121.58.139:3000/pm1Live'); //dust_size에 따른 url 변경
    else
      return await axios.get('http://localhost:3000/pm1Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getPm25Live = async () => {
  try {
    if(server!=="local")
      return await axios.get('http://58.121.58.139:3000/pm25Live'); //dust_size에 따른 url 변경
    else
      return await axios.get('http://localhost:3000/pm25Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getPm10Live = async () => {
  try {
    if(server!=="local")
      return await axios.get('http://58.121.58.139:3000/pm10Live'); //dust_size에 따른 url 변경
    else
      return await axios.get('http://localhost:3000/pm10Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getO2Live = async () => {
  try {
    if(server!=="local")
      return await axios.get('http://58.121.58.139:3000/o2Live'); //dust_size에 따른 url 변경
    else
      return await axios.get('http://localhost:3000/o2Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getVocLive = async () => {
  try {
    if(server!=="local")
      return await axios.get('http://58.121.58.139:3000/vocLive'); //dust_size에 따른 url 변경
    else
      return await axios.get('http://localhost:3000/vocLive'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};


module.exports ={
  getCo2Live, getTolueneLive, getPm1Live, getPm25Live, getPm10Live, getO2Live, getVocLive
}