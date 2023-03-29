status = "";
input = " ";
objects = [];
function setup()
{
    canvas = createCanvas(480, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(500, 430);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 480, 400);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input)
            {
                video.stop();
                objectDetector.detect(gotResult);

                document.getElementById("object_found"). innerHTML = input + " " + "found";

                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(input + "found");
                synth.speak(utterThis);
            } else
            {
                document.getElementById("object_found").innerHTML = input + " " + "not found";
            }
        }
    }
}

function start()
{
    objectDetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input = document.getElementById("input").value;
}

function modelLoaded()
{
    console.log("Model is loaded");
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}