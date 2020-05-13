


  
  



// inpu=inputs;

// console.log(inpu);



function on() {
  var inpu;
  var inputs;
  var startlabel;
  var labeln;
  var buf;
  var x = document.getElementById('0');
  buf=x;

  startlabel = document.getElementsByTagName("label")[0];

  console.log(startlabel);

  labeln=document.getElementsByTagName("label")[0];

  console.log(inputs);

  inpu = document.getElementById("hd");


// labeln=document.getElementsByTagName("label")[0];
// console.log( 'now lbel val is ' + labeln.htmlFor); // go to line  57

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
      //  inpu.setAttribute('id',batteryLevel);
      //  console.log(inpu); // buبدها شرط فقط اذا كان ال انبوت لا يساوي الصغر
      var n = s+batteryLevel;
      buf=document.getElementById(s);
      console.log(n);
       buf.setAttribute(' buf.id', batteryLevel);
       console.log( gdjdkdkdddhhahaha);

       
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
      