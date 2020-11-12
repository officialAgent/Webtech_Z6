const template = document.createElement('template');
template.innerHTML = `
    <div>
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
    </div>
`;



class InputTextSlider extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));


    }

    getVolumeValue(){
        return  this.shadowRoot.querySelector('#volume').value;
    }

    valid (number){
        if (/^\D*$/.test(number.value)) {
            this.shadowRoot.querySelector('#'+number.id).style.borderColor = "red";
            alert("Enterd invalid ipnut");
            return false
        }
        else {
            if (parseInt(number.value) < 1 || parseInt(number.value) > 10) {
                this.shadowRoot.querySelector('#'+number.id).style.borderColor = "red";
                alert("Enterd invalid ipnut");

                return false
            } else {
                this.shadowRoot.querySelector('#'+number.id).style.borderColor = "black";
                return true
            }
        }
    }
    connectedCallback() {

        this.shadowRoot.querySelector('#text').value=1;
        this.shadowRoot.querySelector('#volume').value=1;
        this.shadowRoot.querySelector('#output').textContent = this.shadowRoot.querySelector('#volume').value;
        this.shadowRoot.querySelector("#text").value = this.shadowRoot.querySelector("#volume").value;
        this.shadowRoot.querySelector("#textshow").style.display="none";
        this.shadowRoot.querySelector("#slidershow").style.display="none";

        this.shadowRoot.querySelector("#volume").addEventListener("mouseup",()=>{


            this.shadowRoot.querySelector("#text").value=this.shadowRoot.querySelector("#volume").value;
            this.shadowRoot.querySelector("#output").textContent=this.shadowRoot.querySelector("#volume").value;

        })

        this.shadowRoot.querySelector("#text").addEventListener("blur",()=>{
            if(this.valid(this.shadowRoot.querySelector("#text"))) {
                this.shadowRoot.querySelector("#output").textContent = this.shadowRoot.querySelector("#text").value;
                this.shadowRoot.querySelector("#volume").value = this.shadowRoot.querySelector("#text").value;
            }
            else {
                return false
            }
        })



        this.shadowRoot.querySelector("#texton").addEventListener("change",()=>{

            if ( this.shadowRoot.querySelector("#texton").checked === true){

                this.shadowRoot.querySelector("#textshow").style.display='block';
            }
            else {
                this.shadowRoot.querySelector("#textshow").style.display="none";
            }
        })

       this.shadowRoot.querySelector("#slideron").addEventListener("change",()=>{

            if ( this.shadowRoot.querySelector("#slideron").checked === true){
                this.shadowRoot.querySelector("#slidershow").style.display="block";
            }
            else {
                this.shadowRoot.querySelector("#slidershow").style.display="none";
            }
        })


    }

}


window.customElements.define('input-text', InputTextSlider);