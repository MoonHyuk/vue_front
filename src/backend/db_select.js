const axios = require('axios');

const get_Con_dust = async (dust_size) => {
  try {
    return await axios.get('http://localhost:3000/dust_'+dust_size); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};

const getCo2Live = async () => {
  try {
    return await axios.get('http://localhost:3000/co2Live'); //dust_size에 따른 url 변경
  } catch (error) {
    console.error(error);
  }
};


module.exports ={
  get_Con_dust, getCo2Live
}