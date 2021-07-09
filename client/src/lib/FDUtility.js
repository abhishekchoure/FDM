let FDUtility = {}

FDUtility.calcMaturityAmount = (amount,period,interest,pFormat,ci) =>{   
        const P = amount;
        let n = 365;
        let t = period;
        let r = interest / 100;

        if(pFormat === "days"){
            t = period / 365;
        }else if(pFormat === "months" && period < 12){
            t = period / 12;
        }else if(pFormat === "months" && period > 12){
            t = period /12;
            n=4;
        }else{
            t = period;
            n = 4;
        }

        if(ci === "quarterly"){
            n=4;
        }else if(ci === "yearly"){
            n=1;
        }
        console.log("n : ",n," t : ",t);

        const ans = P * (Math.pow((1 + (r / n)), (n * t)));
        return ans;
}

FDUtility.generateMaturityDate = (oldDate,offset,offsetType)=>{
        let arr = oldDate.split('-');
        var year = parseInt(arr[0]);
        var month = parseInt(arr[1]);
        var date = parseInt(arr[2]);
      
        var newDate = new Date(year,month-1,date);

        switch (offsetType) {
            case "years":
                newDate.setFullYear(newDate.getFullYear() + parseInt(offset));
                break;
            case "months":
                newDate.setMonth(newDate.getMonth() + parseInt(offset));
                break;
            case "days":
                newDate.setDate(newDate.getDate() + parseInt(offset));
                break;
            default: console.log("error in pFormat");
        }

        date = newDate.getDate();
        month = newDate.getMonth()+1;

        if (date < 10) {
            date = '0' + date;
        }

        if (month < 10) {
            month = '0' + month;
        }

        return newDate.getFullYear()+"-"+month+"-"+date;
}



module.exports = FDUtility