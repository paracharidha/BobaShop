$(document).ready(function (e) {

    //Image slider
    $("#slider").bxSlider({
        auto: true,
        minSlides: 1, //1 picture shown at a time
        maxSlides: 1,
        slideWidth: 200,
        adaptiveHeight: true,
        randomStart: false, //images are shown in order
        pause: 2000, //pause between pictures
        captions: true, //display captions under images
        pager: true,
        pagerType: 'short',
        pagerSelector: "#pager"
    });

    $("#uploadimage").on('submit',(function(e) {
    e.preventDefault();
    $("#message").empty();
    $('#loading').show();
    $.ajax({
    url: "gallery_file.php", // Url to which the request is send
    type: "POST",             // Type of request to be send, called as method
    data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
    contentType: false,       // The content type used when sending data to the server.
    cache: false,             // To unable request pages to be cached
    processData:false,        // To send DOMDocument or non processed data file it is set to false
    success: function(data)   // A function to be called if request succeeds
    {
    $("#message").html(data);
    }
    });
    }));
    
    // Function to preview image after validation
    $(function() {
    $("#file").change(function() {
    $("#message").empty(); // To remove the previous error message
    var file = this.files[0];
    var imagefile = file.type;
    var match= ["image/jpeg","image/png","image/jpg"];
    if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]))) {
    $('#previewing').attr('src','noimage.png');
    $("#message").html("<p id='error'>Please select a valid image file</p>"+"<h4>Note:</h4>"+"<span id='error_message'>Only jpeg, jpg and png images type allowed</span>");
    return false;
    }
    else {
    var reader = new FileReader();
    reader.onload = imageIsLoaded;
    reader.readAsDataURL(this.files[0]);
    
    }
    });
});

    function imageIsLoaded(e) {
    $("#file").css("color","green");
    $('#image_preview').css("display", "block");
    $('#previewing').attr('src', e.target.result);
    $('#previewing').attr('width', '250px');
    $('#previewing').attr('height', '230px');
    };
    });