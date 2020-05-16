



// var data2;
// var data=data2;
function chartamg(  data2){
var ch=document.getElementById('doughnutChart').innerText;
// $summaryNumber.value=0;

  $(function(){
    $("#doughnutChart").drawDoughnutChart([
      // { title: "T",         value : 100,  color: "#2C3E50" },
      // { title: "a", value: 0,   color: "#2C3E50" },
      // { title: "b",      value:  0,   color: "#2C3E50" },
      // { title: "c",        value : 0,   color: "#2C3E50" },
        { title: "e",        value : data2,   color: "#FC4349" },
      { title: "Berlin",        value : 100,   color:  "#2C3E50" }
    ]);

  
  
  




  });
  /*!
   * jquery.drawDoughnutChart.js
   * Version: 0.4.1(Beta)
   * Inspired by Chart.js(http://www.chartjs.org/)
   *
   * Copyright 2014 hiro
   * https://github.com/githiro/drawDoughnutChart
   * Released under the MIT license.
   * 
   */
  ;(function($, undefined) {
    $.fn.drawDoughnutChart = function(data, options) {
      var $this = this,
        W = $this.width(),
        H = $this.height(),
        centerX = W/2,
        centerY = H/2,
        cos = Math.cos,
        sin = Math.sin,
        PI = Math.PI,
        settings = $.extend({
          segmentShowStroke : true,
          segmentStrokeColor : "#0C1013",
          segmentStrokeWidth : 1,
          baseColor: "rgba(0,0,0,0.5)",
          baseOffset: 4,
          edgeOffset : 10,//offset from edge of $this
          percentageInnerCutout : 75,
          animation : true,
          animationSteps : 90,
          animationEasing : "easeInOutExpo",
          animateRotate : true,
          tipOffsetX: -8,
          tipOffsetY: -45,
          tipClass: "doughnutTip",
          summaryClass: "doughnutSummary",
          summaryTitle: "قيمة البطارية :",
          summaryTitleClass: "doughnutSummaryTitle",
          summaryNumberClass: "doughnutSummaryNumber",
          beforeDraw: function() {  },
          afterDrawed : function() {  },
          onPathEnter : function(e,data) {  },
          onPathLeave : function(e,data) {  }
        }, options),
        animationOptions = {
          linear : function (t) {
            return t;
          },
          easeInOutExpo: function (t) {
            var v = t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
            return (v>1) ? 1 : v;
          }
        },
        requestAnimFrame = function() {
          return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
              window.setTimeout(callback, 1000 / 60);
            };
        }();
  
      settings.beforeDraw.call($this);
  
      var $svg = $('<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this),
          $paths = [],
          easingFunction = animationOptions[settings.animationEasing],
          doughnutRadius = Min([H / 2,W / 2]) - settings.edgeOffset,
          cutoutRadius = doughnutRadius * (settings.percentageInnerCutout / 100),
          segmentTotal = 0;
  
      //Draw base doughnut
      var baseDoughnutRadius = doughnutRadius + settings.baseOffset,
          baseCutoutRadius = cutoutRadius - settings.baseOffset;
      $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
        .attr({
          "d": getHollowCirclePath(baseDoughnutRadius, baseCutoutRadius),
          "fill": settings.baseColor
        })
        .appendTo($svg);
  
      //Set up pie segments wrapper
      var $pathGroup = $(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
      $pathGroup.attr({opacity: 0}).appendTo($svg);
  
      //Set up tooltip
      var $tip = $('<div class="' + settings.tipClass + '" />').appendTo('body').hide(),
          tipW = $tip.width(),
          tipH = $tip.height();
  
      //Set up center text area
      var summarySize = (cutoutRadius - (doughnutRadius - cutoutRadius)) * 2,
          $summary = $('<div class="' + settings.summaryClass + '" />')
                     .appendTo($this)
                     .css({ 
                       width: summarySize + "px",
                       height: summarySize + "px",
                       "margin-left": -(summarySize / 2) + "px",
                       "margin-top": -(summarySize / 2) + "px"
                     });
      var $summaryTitle = $('<p class="' + settings.summaryTitleClass + '">' + settings.summaryTitle + '</p>').appendTo($summary);
      var $summaryNumber = $('<p class="' + settings.summaryNumberClass + '"></p>').appendTo($summary).css({opacity: 0});
  
      for (var i = 0, len = data.length; i < len; i++) {
        segmentTotal+= data[i].value;
        $paths[i] = $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
          .attr({
            "stroke-width": settings.segmentStrokeWidth,
            "stroke": settings.segmentStrokeColor,
            "fill": data[i].color,
            "data-order": i
          })
          .appendTo($pathGroup)
          .on("mouseenter", pathMouseEnter)
          .on("mouseleave", pathMouseLeave)
          .on("mousemove", pathMouseMove);
      }
     
      //Animation start
      animationLoop(drawPieSegments);
  
      //Functions
      function getHollowCirclePath(doughnutRadius, cutoutRadius) {
          //Calculate values for the path.
          //We needn't calculate startRadius, segmentAngle and endRadius, because base doughnut doesn't animate.
          var startRadius = -1.570,// -Math.PI/2
              segmentAngle = 6.2831,// 1 * ((99.9999/100) * (PI*2)),
              endRadius = 4.7131,// startRadius + segmentAngle
              startX = centerX + cos(startRadius) * doughnutRadius,
              startY = centerY + sin(startRadius) * doughnutRadius,
              endX2 = centerX + cos(startRadius) * cutoutRadius,
              endY2 = centerY + sin(startRadius) * cutoutRadius,
              endX = centerX + cos(endRadius) * doughnutRadius,
              endY = centerY + sin(endRadius) * doughnutRadius,
              startX2 = centerX + cos(endRadius) * cutoutRadius,
              startY2 = centerY + sin(endRadius) * cutoutRadius;
          var cmd = [
            'M', startX, startY,
            'A', doughnutRadius, doughnutRadius, 0, 1, 1, endX, endY,//Draw outer circle
            'Z',//Close path
            'M', startX2, startY2,//Move pointer
            'A', cutoutRadius, cutoutRadius, 0, 1, 0, endX2, endY2,//Draw inner circle
            'Z'
          ];
          cmd = cmd.join(' ');
          return cmd;
      };
      function pathMouseEnter(e) {
        var order = $(this).data().order;
        $tip.text(data[order].title + ": " + data[order].value)
            .fadeIn(200);
        settings.onPathEnter.apply($(this),[e,data]);
      }
      function pathMouseLeave(e) {
        $tip.hide();
        settings.onPathLeave.apply($(this),[e,data]);
      }
      function pathMouseMove(e) {
        $tip.css({
          top: e.pageY + settings.tipOffsetY,
          left: e.pageX - $tip.width() / 2 + settings.tipOffsetX
        });
      }
      function drawPieSegments (animationDecimal) {
        var startRadius = -PI / 2,//-90 degree
            rotateAnimation = 1;
        if (settings.animation && settings.animateRotate) rotateAnimation = animationDecimal;//count up between0~1
  
        drawDoughnutText(animationDecimal, segmentTotal);
  
        $pathGroup.attr("opacity", animationDecimal);
  
        //If data have only one value, we draw hollow circle(#1).
        if (data.length === 1 && (4.7122 < (rotateAnimation * ((data[0].value / segmentTotal) * (PI * 2)) + startRadius))) {
          $paths[0].attr("d", getHollowCirclePath(doughnutRadius, cutoutRadius));
          return;
        }
        for (var i = 0, len = data.length; i < len; i++) {
          var segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (PI * 2)),
              endRadius = startRadius + segmentAngle,
              largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
              startX = centerX + cos(startRadius) * doughnutRadius,
              startY = centerY + sin(startRadius) * doughnutRadius,
              endX2 = centerX + cos(startRadius) * cutoutRadius,
              endY2 = centerY + sin(startRadius) * cutoutRadius,
              endX = centerX + cos(endRadius) * doughnutRadius,
              endY = centerY + sin(endRadius) * doughnutRadius,
              startX2 = centerX + cos(endRadius) * cutoutRadius,
              startY2 = centerY + sin(endRadius) * cutoutRadius;
          var cmd = [
            'M', startX, startY,//Move pointer
            'A', doughnutRadius, doughnutRadius, 0, largeArc, 1, endX, endY,//Draw outer arc path
            'L', startX2, startY2,//Draw line path(this line connects outer and innner arc paths)
            'A', cutoutRadius, cutoutRadius, 0, largeArc, 0, endX2, endY2,//Draw inner arc path
            'Z'//Cloth path
          ];
          $paths[i].attr("d", cmd.join(' '));
          startRadius += segmentAngle;
        }
      }
      //الرقم

      function drawDoughnutText(animationDecimal, segmentTotal) {
        $summaryNumber
          .css({opacity: animationDecimal})
          .text((data2 * animationDecimal).toFixed(1));
      }
      function animateFrame(cnt, drawData) {
        var easeAdjustedAnimationPercent =(settings.animation)? CapValue(easingFunction(cnt), null, 0) : 1;
        drawData(easeAdjustedAnimationPercent);
      }
      function animationLoop(drawData) {
        var animFrameAmount = (settings.animation)? 1 / CapValue(settings.animationSteps, Number.MAX_VALUE, 1) : 1,
            cnt =(settings.animation)? 0 : 1;
        requestAnimFrame(function() {
            cnt += animFrameAmount;
            animateFrame(cnt, drawData);
            if (cnt <= 1) {
              requestAnimFrame(arguments.callee);
            } else {
              settings.afterDrawed.call($this);
            }
        });
      }
      function Max(arr) {
        return Math.max.apply(null, arr);
      }
      function Min(arr) {
        return Math.min.apply(null, arr);
      }
      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      function CapValue(valueToCap, maxValue, minValue) {
        if (isNumber(maxValue) && valueToCap > maxValue) return maxValue;
        if (isNumber(minValue) && valueToCap < minValue) return minValue;
        return valueToCap;
      }
      return $this;
    };
  
    console.log(ch);
  if (ch!=null){
  ch.innerText="ggg";
  console.log('this is'+ ch);
  
  }
  })(jQuery);
  return true;



}

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
for ( i=0; i < 100; i++) {
  
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

      if ( batteryLevel >=0 && batteryLevel <=100)
      {
        i=batteryLevel;
        console.log('i ist '+i);

        alldivs.item(i).id='sa'+batteryLevel.toString();
        console.log(alldivs.item(i).id);
        // console.log(alldivs);
        // data2=batteryLevel.toString();
        // console.log(data2);
        // var check=chartamg(batteryLevel);
// if check==true
//       {
//       }

// console.log(check);


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
      
