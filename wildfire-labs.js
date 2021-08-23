var lines = [];

$(document).ready(function () {
    $.ajax({
        url: "labs.csv",
        dataType: "text",
        success: function (data) {
            var allTextLines = data.split(/\r\n|\n/);
            var titles = allTextLines[0].split(',');
            var headers = allTextLines[1].split(',');
            for (var i = 1; i < allTextLines.length; i++) {
                var data = allTextLines[i].split(',');
                if (data.length == headers.length) {
                    var tarr = [];
                    for (var j = 0; j < headers.length; j++) {
                        tarr.push(data[j]);
                    }
                    lines.push(tarr);
                }
            }
//            console.log(lines);
        }
    });
});

function getLab(email) {
    var index=-1;
    for (var i=1;i<lines.length;i++)
        if (lines[i][0]==email) 
            index=i;
    var table_data = '<div class="alert alert-warning" role="alert">User Not Found</div>'
    if (index != -1) {
        table_data = '<dl class="row">';
        for (var i=1;i<lines[index].length-2;i++) {
            table_data += '<dt class="col-sm-4">' + lines[0][i] +  '</dt>';
            table_data += '<dd class="col-sm-8">' + lines[index][i] +  '</dd>';
        }
        table_data += '</dl>';
    }
    $('#lab').html(table_data);
}
