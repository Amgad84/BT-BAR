


  
  



// inpu=inputs;

// console.log(inpu);



function on() {
  // var inpu;
  // var inputs;
  // var startlabel;
  // var labeln;
  // var buf;
  // var x = document.getElementById('0');
  // buf=x;

  // startlabel = document.getElementsByTagName("label")[0];

  // console.log(startlabel);

  // labeln=document.getElementsByTagName("label")[0];

  // console.log(inputs);

  // inpu = document.getElementById("hd");


// labeln=document.getElementsByTagName("label")[0];
// console.log( 'now lbel val is ' + labeln.htmlFor); // go to line  57

// var link =document.getElementById('file');
// console.log(link);
// link.setAttribute('href',"2.css")

// console.log(link);

var divs = document.getElementById("divs");
console.log(divs);

console.log(divs);

var alldivs=divs.getElementsByTagName("div");

console.log(alldivs);
// alldivs.item(0).id="amgad"
console.log(alldivs);
var i;
for ( i=0; i < 50; i++) {
  
  console.log(alldivs.item(i).id);
  alldivs.item(i).id='sb'+i.toString();
}


console.log(alldivs);




     navigator.bluetooth.requestDevice(
      {filters: [{services: ['battery_service']}]})
    .then(device => {  
      console.log('Connecting to GATT Server...');
      return device.gatt.connect();
    })
    .then(server => {
      console.log('Getting Battery Service...');
      return server.getPrimaryService('battery_service');
    })
    .then(service => {
      console.log('Getting Battery Level Characteristic...');
      return service.getCharacteristic('battery_level');
    })
    .then(characteristic => {
      console.log('Reading Battery Level...');
      return characteristic.readValue();
    })
    .then(value => {
      let batteryLevel = value.getUint8(0);
      
      console.log('> Battery Level is ' + batteryLevel + '%');

      console.log(batteryLevel);
      // اذا كانت القيمة من 1 الى مية ضعها تحت

      if ( batteryLevel >0 && batteryLevel <50)
      {
        i=batteryLevel;
        console.log('i ist '+i);

        alldivs.item(i).id='sa'+batteryLevel.toString();
        console.log('true');
        console.log(alldivs);

      }
    


      //  inpu.setAttribute('id',batteryLevel);
      //  console.log(inpu); // buبدها شرط فقط اذا كان ال انبوت لا يساوي الصغر
     

       
//يحتاج الاسفل الى تصليج


// inputs = batteryLevel;



// inputs.setAttribute('id',"hd");
// startlabel.setAttribute('for', "hd");
       
      // labeln.
        // console.log('labeln attr valeu is ' + buf);





    })

    .catch(error => {
     
      console.log('Argh!' + error);
    });
  
  }
  
  
  function onButtonClick2() {
         let tx= document.getElementById("nam").innerText;
         document.getElementById("nam").innerText=('the new data from BT is ' + tx);
         ;
      }


      function m() {
        alert('Hello');
      }
      