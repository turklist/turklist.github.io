let counter = document.querySelector('h1');
let count = 1;
setInterval(()=>{
    counter.innerText = count;
    count++
    
    if(count > 3) location.replace('https://trlist.pages.dev/')
    
},500)