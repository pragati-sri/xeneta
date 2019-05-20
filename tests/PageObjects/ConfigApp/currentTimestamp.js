'use strict';
module.exports = {
    currentTimestamp: function(){
        var today= new Date();
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        var cmonth= month[today.getMonth()];
        var date= today.getDate();
        var year= today.getFullYear();
        var hour= today.getHours();
        var timestamp= cmonth+' '+date+', '+year+' '+hour;
        return timestamp;
    },
};