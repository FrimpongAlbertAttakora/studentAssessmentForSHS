
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
            output += '<p>' + data[i].name + '<input type="text" name="score">'+ '' + '</input>' + '</p>'; 
            console.log(data[i]._id);
     }
      document.getElementById('inside').innerHTML = output;
  }})
    .catch(err => {
   	console.log(err);
  });
  }


  var subjectSelect = document.getElementById('subject');
  subjectSelect.addEventListener('change', formAction);

  function formAction(){
    cl = document.getElementById('nClasses').value;
      fetch("/student/name_and_class", {
      "method": "GET",
      })
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i < data.length; i++){
            if (cl === data[i].class){
                if (subjectSelect.value === 'coremaths'){
                  document.querySelector('form').action = `student/coremaths/${data[i]._id}`;
                  console.log(document.querySelector('form').action);
                } else if (subjectSelect.value === 'electivemaths') {
                  document.querySelector('form').action = `student/electivemaths/${data[i]._id}`;
                  console.log(document.querySelector('form').action);
                } else {document.querySelector('form').action = "";
              }
       }
          }})
      .catch(err => {
       console.log(err);
    });
    }