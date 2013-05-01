// JavaScript Document
// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
    getLocation();
    navigator.splashscreen.hide();
}

function getLocation() {
    myNewFunction();
}
  
function myNewFunction(){
    navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
}
  
//=======================Say Hello (Page 1) Operations=======================//
function sayHello() {
    var sayHelloInputElem = document.getElementById('helloWorldInput');
    var sayHelloTextElem = document.getElementById('helloWorldText');
    var inputText = document.getElementById('txtName');
    
    sayHelloTextElem.innerHTML = 'Hello, ' + inputText.value + '!';
    sayHelloTextElem.style.display = 'block';
    sayHelloInputElem.style.display = 'none';
}

function sayHelloReset() {
    var sayHelloInputElem = document.getElementById('helloWorldInput');
    var sayHelloTextElem = document.getElementById('helloWorldText');
    var inputText = document.getElementById('txtName');
    
    inputText.value = '';
    sayHelloTextElem.style.display = 'none';
    sayHelloInputElem.style.display = 'block';
}

//=======================Geolocation Operations=======================//
// onGeolocationSuccess Geolocation
function onGeolocationSuccess(position) {
    // Use Google API to get the location data for the current coordinates
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.geocode({ "latLng": latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if ((results.length > 1) && results[1]) {
                $("#myLocation").html(results[1].formatted_address);
            }
        }
    });
    
    // Use Google API to get a map of the current location
    // http://maps.googleapis.com/maps/api/staticmap?size=280x300&maptype=hybrid&zoom=16&markers=size:mid%7Ccolor:red%7C42.375022,-71.273729&sensor=true
    var googleApis_map_Url = 'http://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=hybrid&zoom=16&sensor=true&markers=size:mid%7Ccolor:red%7C' + latlng;
    var mapImg = '<img src="' + googleApis_map_Url + '" />';
    $("#map_canvas").html(mapImg);
}

// onGeolocationError Callback receives a PositionError object
function onGeolocationError(error) {
    $("#myLocation").html("<span class='err'>" + error.message + "</span>");
}

//=======================Video Capture Operations=======================//
function captureVideo() {
    // limit capture operation to 3 video clips
    var options = { limit: 3 };

    navigator.device.capture.captureVideo(onCaptureSuccess, captureError, options);
}
function onCaptureSuccess(mediaFiles) {
    var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        // do something interesting with the file
        uploadFile(mediaFiles[i]);
    }
}
function captureError(error) {
    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
}
// Upload files to server
function uploadFile(mediaFile) {
    var ft = new FileTransfer(),
        path = mediaFile.fullPath,
        name = mediaFile.name;
    var options = new FileUploadOptions();
    options.chunkedMode = true;
            options.fileKey = "file";
            options.fileName = name;
            options.mimeType = "video/mpeg";
    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    ft.upload(path, "http://www.ayoaya.co.il/video/upload.php",
        function(result) {
            alert("Response = " + r.response);
            console.log('Upload success: ' + result.responseCode);
            console.log(result.bytesSent + ' bytes sent');
            console.log("Response = " + r.
        },
        function(error) {
            alert('Error uploading file ' + path + ': ' + error.code);
            console.log('Error uploading file ' + path + ': ' + error.code);
        },
        options); 
    alert(mediaFile.fullPath);
}