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
    var hash = String(CryptoJS.MD5(email.trim().toLowerCase()));
    var index = -1;
    for (var i = 1; i < lines.length; i++)
        if (lines[i][0] == hash)
            index = i;
    var table_data = '<div class="alert alert-warning" role="alert">Email not found.</div>'
    if (index != -1) {
        table_data = '<p>Below is the information you will need to access the exercises:</p>';
        table_data += '<h5>Using a web browser</h5>';
        table_data += '<p>Enter this URL address in the browser’s URL area: <mark>'+lines[index][1]+'</mark></p>';
        table_data += '<p>Authentication with username: <mark>'+lines[index][2]+'</mark></p>';
        table_data += '<p>using password: <mark>'+lines[index][5]+'</mark></p>';
        table_data += '<h5>Or using a Remote Desktop Connection:</h5>';
        table_data += '<p>Enter in the Computer area this IP address: <mark>'+lines[index][3]+'</mark></p>';
        table_data += '<p>Follow the instructions in the PDF above and authenticate with username: <mark>'+lines[index][4]+'</mark></p>';
        table_data += '<p>using the same password: <mark>'+lines[index][5]+'</mark></p>';
        table_data += '<p><small>When the password for USER1 is required, enter <mark>USER1</mark>  (USER1 is a RACF identity)</small></p>';
        table_data += '<p><small>When the password for Fred is required, enter <mark>fredpwd</mark> (Fred is not a RACF identity and case matters)</small></p>';
        table_data += '<p><strong>Please DO NOT shut Windows down, just close the session or disconnect from the remote desktop.</strong></p>';
    }
    $('#lab').html(table_data);
}
