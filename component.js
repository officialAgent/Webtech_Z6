console.log("sds0ds0000");
const template = document.createElement('template');
template.innerHTML = `
 
    <input type="checkbox" id="texton">Text
    <input type="checkbox" id="slideron">Slider<br>
    <div id="textshow">
        <label for="text" > Value <small>1-10</small>:</label>
        <input type="text" class="value" id="text" name="value"><br><br>
    </div>
    <div id="slidershow">

        <label for="volume">Value:</label>
        <input type="range" class="value" id="volume" name="volume"
               min="1" max="10">
        <label id="output"></label>

    </div>

`;


class QuestionareItem extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }

    connectedCallback() {
        document.getElementById("text").value=1;
        document.getElementById("volume").value=1;
        document.getElementById("output").textContent=document.getElementById("volume").value;
        document.getElementById("text").value=document.getElementById("volume").value;
        document.getElementById("textshow").style.display="none";
        document.getElementById("slidershow").style.display="none";

        document.getElementById("volume").addEventListener("mouseup",function (){
            document.getElementById("text").value=document.getElementById("volume").value;
            document.getElementById("output").textContent=document.getElementById("volume").value;

        })

        document.getElementById("text").addEventListener("blur",function (){
            if(valid(document.getElementById("text"))) {
                document.getElementById("output").textContent = document.getElementById("text").value;
                document.getElementById("volume").value = document.getElementById("text").value;
            }
            else {
                return false
            }
        })

        document.getElementById("texton").addEventListener("change",function (){

            if (this.checked === true){
                document.getElementById("textshow").style.display="block";
            }
            else {
                document.getElementById("textshow").style.display="none";
            }
        })

        document.getElementById("slideron").addEventListener("change",function (){

            if (this.checked === true){
                document.getElementById("slidershow").style.display="block";
            }
            else {
                document.getElementById("slidershow").style.display="none";
            }
        })

    }
}


window.customElements.define('value-mater', QuestionareItem);