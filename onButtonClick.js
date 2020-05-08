// not delet 
// {
//   
// Set bounce animation speed
// '00:12:6f:82:f3:c'
//  here herehere herehere herehere herehere herehere herehere here
// function onButtonClick2() {
//    let tx= document.getElementById("nam").innerText;
//    document.getElementById("nam").innerText=('the new data from BT is ' + tx);
//    ;
// }
function onButtonClick() {
    document.getElementById("demo").style.color = "red";
    consol.log('Requesting Bluetooth Device...');
    navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
        .then(device => {
            log('Connecting to GATT Server...');
            return device.gatt.connect();
        });
}
