














$(document).ready(function () {
    $(".title").lettering();
    $(".button").lettering();
  });
  
  $(document).ready(function () {
    animation();
  }, 1000);
  
  $(".button").click(function () {
    animation();
  });
  
  function animation() {
    var title1 = new TimelineMax();
    title1.to(".button", 0, { visibility: "hidden", opacity: 0 });
    title1.staggerFromTo(
      ".title span",
      0.5,
      { ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80 },
      { ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0 },
      0.05
    );
    title1.to(".button", 0.2, { visibility: "visible", opacity: 1 });
  }
  


function animation() {
  var title1 = new TimelineMax();
  title1.to(".button", 0, {visibility: 'hidden', opacity: 0})
  title1.staggerFromTo(".title span", 0.5, 
  {ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80},
  {ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0}, 0.05);
  title1.to(".button", 0.2, {visibility: 'visible' ,opacity: 1})
}
  // not delet 

// {
//   
// Set bounce animation speed



// '00:12:6f:82:f3:c'

//  here herehere herehere herehere herehere herehere herehere here
// 




   
    
   //      .then(service => {
   //     console.log('Getting Battery Level Characteristic...');
   //     return service.getCharacteristic('battery_level');
   //   })
   //         .then(value => {
   //     // var   batteryLevel = value.getUint8(0) ;  //ccccccccccccccccccccccccccccccccccccc
   
   //     console.log(value.getUint16(0));
   //     // console.log('> Battery Level is ' + batteryLevel + value '%');
   //   })
   // .catch(error => { console.log(error); });
   // }
   
   
   
   // حتى هنا 
   
   // }



     
 function onButtonClick() {
  document.getElementById("demo").style.color = "red";

  console.log('Requesting Bluetooth Device...');
  
  navigator.bluetooth.requestDevice(
    {filters: [{services: ['battery_service']}]})
  .then(device => {
    console.log('Connecting to GATT Server...');
    
    
  })

  .then(server => {
    console.log('Getting Battery Service...');

    

    return server.getPrimaryService('battery_service');
    console.log(server);
    console.log(server.filters);
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

    document.getElementById("nam").innerText=('the new data from BT is ' + batteryLevel);
  })
  .catch(error => {
    console.log('Argh! ' + error);
  });



}    //انتباه اجذف القوس




function onButtonClick2() {
  let bn=document.getElementById("nam").innerText;
document.getElementById("nam").innerText= 'data tow is '  + bn ;
console.log(bn);

}

