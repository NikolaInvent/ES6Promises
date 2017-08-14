
"use strict"

function getData(method, url){
  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function(){
      if(this.status >= 200 && this.status < 300){
        resolve(xhr.response);
      }else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function(){
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

getData('GET', 'http://mysafeinfo.com/api/data?list=constellations&format=json').then(function(data){
  let constellations = JSON.parse(data);
  let output = '';
  for(let constellation of constellations){
    output += `
      <li>
        <h3>${constellation.nm}</h3>
        <p>URL: ${constellation.url}</p>
      </li>
    `;
  }

  document.getElementById('template').innerHTML = output;
}).catch(function(err){
  console.log(err);
});