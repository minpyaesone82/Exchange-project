let input   = document.querySelector(".input");
let from    =document.querySelector(".from");
let to  =document.querySelector(".to");
let result =document.querySelector(".result");
let historylist = document.querySelector(".historylist");

function createoption(x,y,z){
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.setAttribute("value",toNum(z));
    o.appendChild(t);
    x.appendChild(o);
}

function toNum(x){
    return Number(x.replace(",",""));
}


for(x in data.rates){
    createoption(from,x,data.rates[x]);
    createoption(to,x,data.rates[x]);
}

function abc (x){
    let rowspacer = document.querySelector(".rowspacer");
    if(rowspacer){
        rowspacer.remove();
    }
    let tr = document.createElement("tr");
    x.map (function(el){
            
            let td = document.createElement("td");
            let text = document.createTextNode(el);
            td.appendChild(text);
            tr.appendChild(td);
        } )
    historylist.appendChild(tr);
}


document.querySelector(".calc").onsubmit = function main(e){
    e.preventDefault();
    let x = input.value;
    let y = from.value;
    let z =to.value;

    let fromtext =x + "     "+  from.options[from.selectedIndex].innerText;
    let totext = to.options[to.selectedIndex].innerText;
    let first = x * y;
    let second = first/z;
    let resultNum= second.toFixed(2);
    let date = new Date().toLocaleString();
    
    let arr = [date,fromtext,totext,resultNum];
    abc(arr);
    store();

   
    result.innerHTML = resultNum;
    input.value = "";
    input.focus();
    from.value = "";
    to.value = "1";
};

function store(){
    localStorage.setItem("record",historylist.innerHTML);
}
(function (){
        if (localStorage.getItem("record")){
            historylist.innerHTML= localStorage.getItem("record");
        }else{
            historylist.innerHTML = `<tr class="rowspacer"><td colspan="4">There is no record</td></tr>`;
        }
})();


