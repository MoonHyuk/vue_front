export default class chartData{
    constructor(name){
        this.name = name;
    }

    createArray(){
        var arr = new Array();
        for(var i =0;i<12;i++){
            arr.push(Math.floor(Math.random()*100)+1);
        }

        return arr;
    }
}







