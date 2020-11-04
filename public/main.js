
var select = document.querySelector('select');
select.addEventListener('change', run);

function run(){
  cl = document.getElementById('nClasses').value;
    fetch("/student/name_and_class", {
	  "method": "GET",
    })
    .then(response => response.json())
    .then(data => {
      var output = '';
      	for (var i = 0; i < data.length; i++){
          if (cl === data[i].class){
            output += '<p>' + data[i].name + '<input type="text" name="name">'+ '' + '</input>' + '</p>'; 
            console.log(data[i].name);
     }
      document.getElementById('inside').innerHTML = output;
  }})
    .catch(err => {
   	console.log(err);
  });
  }
