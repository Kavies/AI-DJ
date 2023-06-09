function setup(){
    canvas=createCanvas(580,480);
    canvas.center();


}
var status1="";
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}
function draw(){
    image(video,0,0,580,480);
    if(status1!=""){
        objectdetector.detect(video,gotResults);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("num_of_objects").innerHTML="Number of objects detected are= "+object.length;

            fill("red");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+ percent+"%",object[i].x,object[i].y);
            noFill();
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
function start(){
    objectdetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";

}
function modelLoaded(){
    console.log("model_is_loaded");
status1="true";
video.loop();
video.volume(0);
video.speed(1);
}
object=[];
function gotResults(error,results){
if(error){
    console.log(error)
}
else{
    console.log(results);
object=results;
}
}