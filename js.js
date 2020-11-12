
let alma= new InputTextSlider();
document.getElementById("zoom").appendChild(alma);



var xArray=[];
var y1Array=[];
var y2Array=[];

var layout = {
 showlegend: false
};

var config = {displaylogo: false, modeBarButtons: [[ "zoom2d", "zoomIn2d", "zoomOut2d", "pan2d","autoScale2d" ]] }
var started=false;

var show = {
    visible:true
};
var hide = {
    visible:"legendonly"
};


document.getElementById("sinus").checked=true;
document.getElementById("kosinus").checked= true;
function showHide(){


    if(started !== false){
        var sin=(document.getElementById("sinus").checked);
        var cos=(document.getElementById("kosinus").checked);
        var toEdit=document.getElementById('graf');

        if(sin===true){
            Plotly.restyle(toEdit, show, 0);
        }
        else{
            Plotly.restyle(toEdit, hide, 0);
        }
        if(cos===true){
            Plotly.restyle(toEdit, show, 1);
        }
        else{
            Plotly.restyle(toEdit, hide, 1);
        }
    }
}
Plotly.plot('graf', [{
    y: [],
    name:'sin',
    mode: 'lines'
}, {
    y: [],
    name:'cos',
    mode: 'lines'
}],layout, config);

function start(){
    if(typeof(EventSource) !== "undefined") {
        if(started===true){

            source.close();
            Plotly.deleteTraces(document.getElementById('graf'), [0,1]);
            xArray=[];
            y1Array=[];
            y2Array=[];
            Plotly.plot('graf', [{
                y: [],
                name:'sin',
                mode: 'lines'
            }, {
                y: [],
                name:'cos',
                mode: 'lines'
            }],layout);
        }
        source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
        started=true;
        source.onmessage = function(event) {
            var text=event.data;
            var casti=JSON.parse(text);
            casti.y1=parseFloat(casti.y1)*alma.getVolumeValue();
            casti.y2=parseFloat(casti.y2)*alma.getVolumeValue();


            document.getElementById("x").innerHTML = casti.x;
            document.getElementById("y1").innerHTML = casti.y1
            document.getElementById("y2").innerHTML = casti.y2
            xArray.push(casti.x);
            y1Array.push(casti.y1);
            y2Array.push(casti.y2);

            Plotly.extendTraces('graf', {
                y: [[casti.y1], [casti.y2]]
            }, [0, 1])

        };

    } else {
        document.getElementById("x").innerHTML = "Sorry, your browser does not support server-sent events...";
    }
}

function resize(){
    var toResize = document.getElementById('graf');
    var update = {
        width: toResize.clientWidth,
        height:toResize.clientHeight
    };

    Plotly.relayout(toResize, update);
}

