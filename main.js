song = "";

pulso1X = 0;
pulso1Y = 0;

pulso2X = 0;
pulso2Y = 0;

pulso1S = 0;
pulso2S = 0;

function preload(){
    song = loadSound("Mozart_ Symphony No. 25 in G Minor K. 183 - I. Allegro con brio.mp3")
}

function setup(){
    canvas = createCanvas(500, 450);
    canvas.position(480,250);
    
    video = createCapture(VIDEO);
    video.size(450, 500);
    video.position(480,250)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Tudo Pronto - All ready - Tout est prêt - Helemaal klaar - Ĉio preta");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
if(results.length > 0){
    console.log (results);
    pulso1S = results[0].pose.keypoints[10].score;
    pulso2S = results[0].pose.keypoints[9].score;
    console.log(pulso1S + pulso2S);

    pulso1X = results[0].pose.rightWrist.x;
    pulso1Y = results[0].pose.rightWrist.y;

    pulso2X = results[0].pose.leftWrist.x;
    pulso2Y = results[0].pose.leftWrist.y;
}
}

function draw(){
    image(video, 0, 0, 500, 450);

    fill("#4d0303");
    stroke("#4d0303");
    circle(pulso1X,pulso1Y,20);

    if(pulso1S > 0.2){


        if(pulso1Y >0 && pulso1Y <= 100){
            document.getElementById("s").innerHTML = "0.5x"
            song.rate(0.5)
        }

        else if(pulso1Y >100 && pulso1Y <= 200){
            document.getElementById("s").innerHTML = "1x"
            song.rate(1)
    
    }

    
    else if(pulso1Y >200 && pulso1Y <= 300){
        document.getElementById("s").innerHTML = "1.5x"
        song.rate(1.5)

}

else if(pulso1Y >300 && pulso1Y <= 400){
    document.getElementById("s").innerHTML = "2x"
    song.rate(2);

}

else if(pulso1Y >400){
    document.getElementById("s").innerHTML = "2.5x"
    song.rate(2.5);

}

}
if(pulso2S > 0.2){
    circle(pulso2X,pulso2Y,20);
    Pulso2YY = Number(leftWrist);
    Rd = floor(Pulso2YY);
    v = Rd/500;
    document.getElementById("v").innerHTML = v;
    song.setVolume(v);


}


}


