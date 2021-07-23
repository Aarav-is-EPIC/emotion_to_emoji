perdiction1="";
perdiction2="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90

});

camera = document.getElementById("camera");
Webcam.attach(camera);

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='image_captured' src ='" + data_uri + "'>"
    });
}
console.log("ml5 version:",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/V0GzkvDLH/model.json", modelLoaded);
function modelLoaded(){
    console.log("Model Loaded :) :) :)");
}

function speakcomputar(){
    var synth= window.speechSynthesis;
        data_1="The first perdiction is" + perdiction1;
        data_2="The second perdiction is" + perdiction2;
        var utterThis = new SpeechSynthesisUtterance(data_1+data_2);
        synth.speak(utterThis);
    
}

function check(){
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        perdiction1=results[0].label;
        perdiction2=results[1].label;
        document.getElementById("emotion_to_name_1").innerHTML = perdiction1;
        document.getElementById("emotion_to_name_2").innerHTML = perdiction2;
        speakcomputar()

        if(perdiction1=="Happy"){
            document.getElementById("emotion_to_emoji_1").innerHTML = "&#128512;";
        }
        if(perdiction1=="Sad"){
            document.getElementById("emotion_to_emoji_1").innerHTML = "&#128532;";
        }
        if(perdiction1=="Angry"){
            document.getElementById("emotion_to_emoji_1").innerHTML = "&#128545;";
        }

        if(perdiction2=="Happy"){
            document.getElementById("emotion_to_emoji_2").innerHTML = "&#128512;";
        }
        if(perdiction2=="Sad"){
            document.getElementById("emotion_to_emoji_2").innerHTML = "&#128532;";
        }
        if(perdiction2=="Angry"){
            document.getElementById("emotion_to_emoji_2").innerHTML = "&#128545;";
        }
    }
}
