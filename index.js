var url = "https://jrmylee.herokuapp.com/action";

var route = window.location.href;

var funStuff = function(route){
    return new Promise((resolve, reject) => {
        fetch(url + '/' + route, {
            method: 'POST',
        }).then((res) => res.json()).then((data) => {
            resolve(data)
        }).catch(err => {
            reject(err);
        })
    })
}
if(route.endsWith('index.html')){
    funStuff('index').then(res => console.log(res))
}

if(route.endsWith('projects.html')){
    funStuff('projects').then(res => console.log(res))
}

if(route.endsWith('writing.html')){
    funStuff('writing').then(res => console.log(res))
}
