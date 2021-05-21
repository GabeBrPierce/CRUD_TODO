$( function() {
    $("#options").change(function () { 
        switch ($("#options").val()) {
            case "all":
                alert('all was selected');
                break;
            case "pending":
                alert('pending was selected');
                break;
            case "complete":
                alert('complete was selected');
                break;
            default:
                alert('all was selected');
                break;
        }
    });
});
