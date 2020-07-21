console.log('JS file is loaded!');

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const firstpara = document.querySelector("#location");
const secondpara = document.querySelector("#forecast");
const errormsg = document.querySelector("#error-msg");

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(searchInput.value);
    const searchVal = searchInput.value;
    firstpara.textContent="loading data...";
    //firstpara.textContent='';
    secondpara.textContent='';
    errormsg.textContent ='';
    const url = "/weather?address="+searchVal;
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                errormsg.textContent = data.error;
                firstpara.textContent='';
                secondpara.textContent='';
            }else{
               firstpara.textContent = data.forcast;
               secondpara.textContent = data.location; 
               errormsg.textContent ='';
            }
        })
    })
})