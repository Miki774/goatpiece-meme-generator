const btn = document.querySelector('.btn');
const bgColors = ["#4509eb", "#6fc8f7", "#29ff7e", "#f2112f", "#a311f2"];
const colors = ["#ffffff", "#000000", "#000000", "#ffffff", "#000000"];
let after=''; 
function colorChange(){
    let random = Math.floor(Math.random()*bgColors.length);
    btn.style.backgroundColor = bgColors[random];
    btn.style.color = colors[random];
}

function fetchMemes(){
    let parentDiv = document.createElement('div');
    if(document.getElementById('memes')){
        document.getElementById('memes').remove();
    }
    parentDiv.id = 'memes';
    fetch(`https://www.reddit.com/r/MemePiece.json?after=${after}`)
    .then(response => response.json())
    .then(body => {
        after = body.data.after;
        for(let i=0;i<body.data.children.length;i++){
            if(body.data.children[i].data.post_hint==='image'){
                let div = document.createElement('div');
                let h4 = document.createElement('h4');
                let image = document.createElement('img');
                image.src = body.data.children[i].data.url_overridden_by_dest;
                h4.textContent = body.data.children[i].data.title;
                div.appendChild(h4);
                div.appendChild(image);
                parentDiv.appendChild(div);
            }
        }
        document.body.appendChild(parentDiv);
    }
    );
}

btn.addEventListener('click', colorChange);
btn.addEventListener('click', fetchMemes);