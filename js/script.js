let Name=document.getElementById('name')
let price=document.getElementById('price')
let tax=document.getElementById('tax')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let category=document.getElementById('category')
let count=document.getElementById('count')
let create=document.getElementById('create')
let currentIndex=0;
let container;
if(localStorage.getItem("product") !=null){
    container=JSON.parse(localStorage.getItem("product"))
    display();
}
else{
    container=[]
}

function gettotal(){
    if(price.value!=''){
let ress=( +price.value * +tax.value/100)
 let res= +price.value + ress + +ads.value - +discount.value
    total.innerHTML=`Total: ${res}`
    total==res;
    console.log(total.innerHTML)
    total.style.background="green"
    return res 
  
    }
    else{
        total.style.background="brown "
    }

}
function addupdate(){
    if(create.innerHTML=="Create"){
        add()
    }
    else{
        Update()
    }
}
function add(){
    let product={
        prname:Name.value,
        prprice:price.value,
        prtax:tax.value,
        prads:ads.value,
        prdiscount:discount.value,
        prtotal:total.innerHTML,
        prcategort:category.value,
        prcount:count.value
    }
    container.push(product);
    console.log(container);
    localStorage.setItem("product",JSON.stringify(container));
    clear();
    display();
}
function clear(){
Name.value="";
price.value="";
tax.value="";
ads.value="";
discount.value="";
category.value="";
count.value="";
total.innerHTML="Total:";
}
function display(){
    let showdata="";
    for(let i=0;i<container.length;i++){
    showdata+=
    `
    <tr>
    <td>${container[i].prname}</td>
    <td>${container[i].prprice}</td>
    <td>${container[i].prtax}</td>
    <td>${container[i].prads}</td>
    <td>${container[i].prdiscount}</td>
    <td>${container[i].prtotal}</td>
    <td>${container[i].prcategort}</td>
    <td>${container[i].prcount}</td>
    <td><button class="btn btn-success" onclick="setForm(${i})">Update</button></td>
    <td><button class="btn btn-outline-danger" onclick="Del(${i})">Del</button></td>
    </tr>
    `
    };
    document.getElementById('tablebody').innerHTML=showdata;
}

function Del(index){
container.splice(index,1);
localStorage.setItem("product",JSON.stringify(container));
display();
}

function setForm(index){
    currentIndex=index;
    Name.value=container[index].prname
    price.value=container[index].prprice
    tax.value=container[index].prtax
    ads.value=container[index].prads
    discount.value=container[index].prdiscount
    category.value=container[index].prcategort
    count.value=container[index].prcount
    total.innerHTML=container[index].prtotal
    create.innerHTML="Update"
   
}
function Update(){
    container[currentIndex].prname=Name.value
    container[currentIndex].prprice=price.value
    container[currentIndex].prtax=tax.value
    container[currentIndex].prads=ads.value
    container[currentIndex].prdiscount=discount.value
    container[currentIndex].prcategort=category.value
    container[currentIndex].prcount=count.value
    container[currentIndex].prtotal=total.innerHTML
    create.innerHTML="Create"
    localStorage.setItem("product",JSON.stringify(container));
    display()
    clear()
}
function search() {

    let searchInput = document.getElementById("Search").value.trim().toLowerCase();
    let box2 = '';

    for (let i = 0; i < container.length; i++) {
    let item=container[i]
        if (item.prname.toLowerCase().includes(searchInput)) {
       
            box2 += `
                <tr>
                    <td>${item.prname}</td>
                    <td>${item.prprice}</td>
                    <td>${item.prtax}</td>
                    <td>${item.prads}</td>
                    <td>${item.prdiscount}</td>
                    <td>${item.prtotal}</td>
                    <td>${item.prcategort}</td>
                    <td>${item.prcount}</td>
                    <td><button class="btn btn-success" onclick="setForm(${i})">Update</button></td>
                    <td><button class="btn btn-outline-danger" onclick="Del(${i})">Del</button></td>
                </tr>`;
        }
    }
    if (box2 === '') {
        box2 = `<tr><td colspan="10">No results found</td></tr>`;
    }
    document.getElementById("tablebody").innerHTML = box2;
}


