$(document).ready(function () {

    $("#recipient").val(_spPageContextInfo.userLoginName);

    $("#send").click(function (e) {
        e.preventDefault();

        $("#result").html("");
        var body = $("#body").val();
        var subject = $("#subject").val();
        var to = $("#recipient").val().trim().split(";");

        $.ajax({
            method: "POST",
            contentType: "application/json",
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/SP.Utilities.Utility.SendEmail",
            headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            data: JSON.stringify({
                'properties': {
                    '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                    'To': { 'results': to },
                    'Body': body,
                    'Subject': subject
                }
            })
        })
        .done(function () {
            $("#result").html("Email sucessfully sent");
        })
        .fail(function (xhr, status, error) {
            var obj = JSON.parse(xhr.responseText);
            console.error(obj);
            $("#result").html(obj.error.message.value);
        });
    });
});