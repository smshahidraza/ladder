var lexer = new Lexer;

lexer.addRule(/\s+/, function () {
    /* skip whitespace */
});

lexer.addRule(/[a-zA-Z_]/, function (lexeme) {
    return lexeme; // symbols
});

lexer.addRule(/[\(\+\-\*\/\)]/, function (lexeme) {
    return lexeme; // punctuation (i.e. "(", "+", "-", "*", "/", ")")
});

var factor = {
    precedence: 2,
    associativity: "left"
};

var term = {
    precedence: 1,
    associativity: "left"
};

var parser = new Parser({
    "+": term,
    "-": term,
    "*": factor,
    "/": factor
});

function parse(input) {
    lexer.setInput(input);
    var tokens = [], token;
    while (token = lexer.lex()) tokens.push(token);
    // console.log(tokens);
    return parser.parse(tokens);
}


var stack = [];
var result=[];

var lastOperater, first, second;

var operator = {
    "+": "+",
    "-": "subtract",
    "*": "*",
    "/": "divide"
};


function toObject(token) {
  return {
            name: token,
            type: 'INPUT',
            isReverse: false,
            state: false
          };
}

function regTest(){

    var expression = [];

    expression.push("a * ((b * (c + d) * e * f) + (g * (h + i) * k * l))");
    expression.push("a * ((((b * (c + d) * e * f) + (g * (h + i) * k * l) + (l * (m + n) * o * p) + q + r + s + t + u + v) * ((w * x * y * z) + a)) + (((b *(c + d)) + (e * (f + g)) + (h * (j + y))) * m * n * p))");
    expression.push("(e+(m*y))*s");
    expression.push("((i*j)+k+l)*m");
    expression.push("((a*b*c)+(d*e*f)+(g+(h*((i*j)+k+l)*m)))");
    expression.push("((a+b)*(c+d))");
    expression.push("(a+b+c+d)");
    expression.push("(a*b*c*d)");
    expression.push("e+(m*y)*s");
    expression.push("e+(m*y)+s");
    expression.push("(e*(a*(b+c))+d)");
    expression.push("(e*((a*(b+c))+d))");
    expression.push("(a+b)+c*d");
    expression.push("(e+(a*b*c)*d)");
    expression.push("(e+(a*b)+(m*d))");


      $("#drawingCanvas1").empty();

    expression.forEach(function (c) {

      var output = initParser(c);
      var expString =    drawGraph(output);
      expString += "</svg>";
      $("#drawingCanvas1").append(output);
      $("#drawingCanvas1").append(expString);

    }); 

}

function clickDraw(){
    // regTest();
    var output = initParser($("#expressionText").val());

    var expString =    drawGraph(output);

  expString += "</svg>";
// alert(output);
$("#drawingCanvas").empty();
$("#drawingCanvas").append(expString);

// var rpn = infixToPostfix(output);
// console.log(rpn);
jQuery("#postfixExp").text(output);
console.log(output);
// alert(output);

 var jsonString = "";

    $.each(result, function( index, value ) {
        jsonString+=value+"\n\r";
    });


    // jQuery("#svgxml").text(jsonString);

}
function initParser(expressionTextVal){
    outputExpr = [];
    result= [];
    var input = expressionTextVal;
    var count = 0;
    parse(input).forEach(function (c) {
    switch (c) {
    case "+":
    case "-":
    case "*":
    case "/":
        var b = stack.pop();
        var a = stack.pop();
        stack.push(operator[c] + "(" + a + ", " + b + ")");
        // outputExpr.push(operator[c] + "(" + a + ", " + b + ")--||--");
        lastOperater = operator[c]; first = a; second = b;
        //console.log(operator[c] + "(" + a + ", " + b + ")--")
            count = 0;

        break;
    default:
        stack.push(c);
        count++;
        //  outputExpr.push(c);

    }
});

return stack.pop();   

    // drawGraph(lastOperater, first, second);


}
var bracket1=[];
var bracket2=[];



function drawGraph(output){
var open=0;
var close=0;
    var operatorArr = [];

    var counter=0;
var yCo = 20;
var xCo = 20;
   var operators = ['*','+'];
   counter++;
    // console.log("operator"+ operator+"\nfirst"+first+"\n-second"+second);
    var tokens = output.match(/([a-zA-Z]+)|[()+,*]/gi);
    var containsInvalidChars = /[^(),+*a-zA-Z.\s]/gi.test(output);
    var status = "ladder_true";
    var color = "black";
    var popupOperator = [];
    var lastCordinate = [];
    var commOperator = [];
    var lastOperater = "";
    var commacordx=0;
    var commacordy=0;
    var consoleLog="";
    var closeBracket = 0;
    var xMax = 0;
    var yMax = 0;
    var operand = [];


    var expString="";

    if (Array.isArray(tokens) && !containsInvalidChars) {
        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];
          // console.log("xCo:"+xCo+"-- yCo"+yCo);

          if (token == ")"){
                          closeBracket++;
          }else if (token != ","){
            closeBracket = 0; 
          }

          if (token === "*" || token === "+" ) {
            operatorArr.push(token);
            popupOperator.push(token);
            // break;

          }else if (token === "(") {
            open++; // close=1;
            // if (lastCordinate.length != 0){
            //     var cord = lastCordinate.pop();
            //     var xycord = cord.split(",");
            //     if(xycord[2] == "*"){
            //       var xCoTemp = (Number(xycord[0])+xCo);
            //       var yCorTemp = (Number(xycord[1]));
            //       lastCordinate.push(xCoTemp+","+yCorTemp+","+xycord[2]);
            //     }else{
            //       lastCordinate.push(cord);
            //     }
            // }

            lastCordinate.push(xCo+","+yCo+","+tokens[i-1]);

          }else if (token === ")"){
            close++;

            // console.log(lastCordinate.pop());

            var lop = popupOperator.pop();
            var cord = lastCordinate.pop();
            var comm100 = commOperator.pop();
            // console.log("comm100---"+comm100)
            // commOperator.pop();

            // if(lop === "+"){
                // xCo = xCo-120;
                // expString += "<use xlink:href='#connectRowOR' x='"+(xCo+10)+"' y='"+(yCo)+"' id='"+token+"' class='green'/>";              
                var xycord = comm100.split(",");

                var xCoTemp = (Number(xycord[0]));
                var yCorTemp = (Number(xycord[1]));

                var oper1 = xycord[2];

                var xtemp2 = xCoTemp;
                  if(xtemp2 < xMax ){
                    var cnt1 = 1;
                    for (var k = 1; k < operand.length - 2 ; k++){
                    //operand.forEach(function(operandTemp){
                        var xycord = operand[k].split(",");

                        var xCoTemp1 = (Number(xycord[1]));
                        var yCorTemp1 = (Number(xycord[2]));
                        if(xCoTemp1 > xCoTemp && yCorTemp1 == yCorTemp ){
                          xtemp2 += 100;
                          cnt1++;
                        }
                    //});
                  }

                  }

                  var yLength = yMax;
                  if(xCo+100 == xMax && xCoTemp == xMax){
                     
                     yLength = 20;
                  }

                  var xMaxNew = xMax;

                  // var count5 = 0;
                  // for (var k = 1; k < operand.length - 1 ; k++){
                  //   //operand.forEach(function(operandTemp){
                  //       var xycord = operand[k].split(",");

                  //       var xCoTemp1 = (Number(xycord[1]));
                  //       var yCorTemp1 = (Number(xycord[2]));
                  //       if(xCoTemp1 > (xCoTemp) && yCorTemp1 == yCorTemp ){
                  //         xMaxNew += 100;
                  //         count5++;
                  //       }
                  //   //});
                  // }

                  // if(count5 == 0){
                  //   xMaxNew = xCo;
                  // }

                  if(xCoTemp >= xMax ){
                    xMaxNew = xMax;
                  }else{
                    xMaxNew = xCo;
                  }

              if(oper1 === "+"){
                expString += "<line id='xbottom"+i+"' x1='"+(xCo+20)+"' y1='"+(yCo+20)+"' x2='"+(xMaxNew+20)+"' y2='"+(yCo+20)+"' class='green'/>";;              
                expString += "<line id='yHori"+i+"' x1='"+(xMaxNew+20)+"' y1='"+(yCo+20)+"' x2='"+(xMaxNew+20)+"' y2='"+(yCorTemp+20)+"' class='green'/>";;              
                expString += "<line id='xTop"+i+"' x1='"+(xMaxNew+20)+"' y1='"+(yCorTemp+20)+"' x2='"+(xCoTemp)+"' y2='"+(yCorTemp+20)+"' class='blue'/>";;              
                    yCo = yCorTemp;
                    xCo = xMaxNew;
                console.log("-------"+lastCordinate+"---"+xycord+"-->"+yCorTemp);
                // if(lastOperater === "+"){
                //    yCo = yCo - 100;
                //}
                // xCo = xCo - 100;
             } else if(oper1 === "*"){

                  //if(xCoTemp < xMax ){
                  //  xCoTemp = xMax;
                  // xCo = xMax;
                  // }
                  // expString += "<line id='xTop"+i+"' x1='"+(xCo+20)+"' y1='"+(yCo)+"' x2='"+(xCoTemp)+"' y2='"+(yCo)+"' class='green'/>";;              

                // expString += "<line id='line1_hor1' x1='"+xCo+"' y1='"+(yCo+20)+"' x2='"+(xCo+40)+"' y2='"+(yCo+20)+"' class='green'/>";
                // if(lastOperater == '+'){
                    // yCo = yCo - 60;
                 //   xCo = xCo - 100;
                //}
                // expString += "<line id='line1_hor1' x1='"+xCo+"' y1='"+(yCo+20)+"' x2='"+(xCo+40)+"' y2='"+(yCo+20)+"' class='red'/>";
                // xCo = xCo - (100)*close;

                // xCo = xCo - 100;
            }

                commacordy = 0;
                commacordx = 0;
            // xCo = xCo + 20;
            // yCo = yCo - 100;
            // xCo = xCo + 100;
                                    lastOperater = lop;
             if(tokens[i-1] == ")"){
              // closeBracket++;
             }                       
            console.log(lop+" close("+xCo+":"+yCo+")");
            consoleLog +=lop+" close("+xCo+":"+yCo+")";
          }else if (token === ","){
          close=1;
                      // var lastCordinate = xCo+":"+yCo;
            var x = operatorArr.pop();
                            commOperator.push(xCo+","+yCo+","+x);
            // popupOperator = x;
            if( x == "+"){
             
                xCo = xCo - 100;
                if(lastOperater === "+"){
                    yCo = yCo + (100);
                    lastOperater="";
                }

                console.log(closeBracket+"--|("+xCo+":"+yCo+")");
                var tempYCo = yCo;
                if (xCo == 20 && yCo == 20){
                  expString += "<use xlink:href='#connectRowORDown' x='"+(xCo+40)+"' y='"+yCo+"' id='"+token+"' class='blue'/>";
                   yCo = yCo + 100;
                }else{
                  var cord = lastCordinate[lastCordinate.length - 1];
                  var xycord = cord.split(",");

                  var xCoTemp = (Number(xycord[0]));
                  var yCorTemp = (Number(xycord[1]));
                  var oper1 = xycord[2];
                  
                  var y1 = yCorTemp;
                  var yMaxTemp = yCo;
                  if(yCorTemp < yMax ){
                    var cnt1 = 1;
                    // var yMaxTemp = yCo;
                    for (var k = 0; k < operand.length ; k++){
                    //operand.forEach(function(operandTemp){
                        var xycord = operand[k].split(",");

                        var xCoTemp1 = (Number(xycord[1]));
                        var yCorTemp1 = (Number(xycord[2]));
                        if(xCoTemp1 < xCoTemp  && yCorTemp1 == yCorTemp && yCorTemp1 != 20){
                          yCorTemp += 100;
                          // yMaxTemp = yCorTemp1;
                          
                        }else if (xCoTemp1 > xCoTemp  && yCorTemp1 == yMax){
                          cnt1++;
                        }
                    //});
                  }

                  }

                  // var x1 = xCoTemp;
                  // while(x1 < xMax ){
                  //   x1 += 120;
                  // }
                  
                   var yLength = yCo;
                  if(cnt1 > 1){
                    yLength = yMax; 

                  }

                  // if(yCo+100 == yMax && yCorTemp == yMax){
                     
                  //    yLength = 20;
                  // }
                  expString += "<line id='line2_ver11' x1='"+(xCoTemp+20)+"' y1='"+(yCorTemp+20)+"' x2='"+(xCoTemp+20)+"' y2='"+ (yLength+120)+"' class='red'/>";
                  // expString += "<line id='line2_ver11' x1='"+(xCoTemp+20)+"' y1='"+(120+yMax)+"' x2='"+(x1-100)+"' y2='"+ (120+yMax)+"' class='red'/>";
                  yCo = yLength +100;
                  xCo = xCoTemp;
                }

                
                consoleLog +=close+"--|("+xCo+":"+yCo+")";
                lop+" close("+xCo+":"+yCo+")"
                            closeBracket = 0; 

                // close=1;

                commacordx = xCo;
                commcordy = yCo;

            }else if( x == "*"){
                // expString += "<use xlink:href='#connectRow' x='"+xCo+"' y='"+yCo+"' class='black' />";
                //                expString += "<line x1='"+xCo+"' y1='"+(yCo-30)+"' x2='"+xCo+"' y2='"+(yCo+70)+"' class='black' />";
                // xCo = xCo + 100;
                // yCo = yCo - 100;

                // yCo = yCo - 100;
                if(tokens[i-1] === ")"){
                  // if(xCo < xMax){
                  //  xCo = xMax;
                  // }
                }

                
                // expString += "<line id='line1_hor1' x1='"+xMax+"' y1='"+(yCo+20)+"' x2='"+(xMax+40)+"' y2='"+(yCo+20)+"' class='red'/>";
                // xCo = xCo + 20;

                
                // operatorArr.pop();
                console.log("____("+xCo+":"+yCo+")\n\r");
                consoleLog +="____("+xCo+":"+yCo+")";                
            }
                        lastOperater = x;

          }else{
              /// close=1;
                console.log(token+"("+xCo+":"+yCo+")"); 
                consoleLog +="<p>"+token+"("+xCo+":"+yCo+")</p>";                 
              expString += "<use xlink:href='#"+status+"' x='"+xCo+"' y='"+yCo+"' id='"+token+"' class='"+color+"'/>";
              expString += "<text x='"+(xCo + 40)+"' y='"+(yCo - 10)+"'>"+token+"</text>";
              xCo = xCo+100;
                            operand.push(token+","+xCo+","+yCo)               

              


          }
          if(xMax < xCo ){
            xMax = xCo;
          }

          if(yMax < yCo){
            yMax = yCo;
          }

    }
    console.log("pppp"+commOperator);

}
// jQuery("#result").html(consoleLog);
    jQuery("#result").html(lastCordinate);


// jQuery("#postfixExp").text(consoleLog);
var expStringPrefix = "<svg height='"+(yMax+200)+"' width='"+(xMax+500)+"' xmlns='http://www.w3.org/2000/svg' >";

return expStringPrefix+expString;
}
//console.log("bracket1"+bracket1);
//console.log("bracket2"+bracket2);

function getOperand(first){
    var stack=[];  
    var result=[];  
      var indentOpen = 0;
      var indentClose = 0;
    var tokens = first.match(/([a-zA-Z]+)|[()+,*]/gi);
    var containsInvalidChars = /[^(),+*a-zA-Z.\s]/gi.test(first);
     
    if (Array.isArray(tokens) && !containsInvalidChars) {
        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];

           

          if (token === '(') {
            indentOpen++;
            stack.push(token);
          } else if (token === ')') {
            indentClose++;      
            stack.push(token);
          } else if (token === ',') {
             if(indentOpen == indentClose){
                for(var j = i + 1; j < tokens.length; j++ ){
                    result.push(tokens[j]);
                }
                break;                
            }else{
                stack.push(token);
            }
          } else  {
              stack.push(token);
          }
        }

    }
    // console.log();
    var firstOp="";
    $.each(stack, function( index, value ) {
        firstOp+=value;
    });
        var secondOp="";
    $.each(result, function( index, value ) {
        secondOp+=value;
    });

    return  firstOp+":"+secondOp;

}



function infixToPostfix(expression) {

var operator = {
    "+": "+",
    "*": "*"
};

  if (typeof expression !== 'string') {
    if (expression instanceof String) {
      expression = expression.toString();
    } else {
      return null;
    }
  }

  var first;
  var second;
  var result = [];
  var stack = [];
  var operators = ['*','+'];
  var expOperators = [];
  var indentOpen = 0;
  var indentClose = 0;
  var tokens = expression.match(/([a-zA-Z]+)|[()+,*]/gi);
  var containsInvalidChars = /[^(),+*a-zA-Z.\s]/gi.test(expression);

  if (Array.isArray(tokens) && !containsInvalidChars) {
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

       

      if (operators.indexOf(token) > -1) {
        expOperators.push(token);
      } else if (token === '(') {
        indentOpen++;
      } else if (token === ')') {
        indentClose++;      
      } else if (token === ',') {
         stack.pop();
      } else if (token) {
          result.push(token);
      }
    }
  }

  while (stack.length) {
    var item = stack.pop();
    result.push(item);
  }

  return (result.length >= 1 ? result : null);
}


// parse("e*((a*(b+c))+d)").forEach(function (c) {
//     switch (c) {
//     case "+":
//     case "-":
//     case "*":
//     case "/":
//         var b = stack.pop();
//         var a = stack.pop();
//         stack.push(operator[c] + "(" + a + ", " + b + ")");
//         break;
//     default:
//         stack.push(c);
//     }
// });

// var output = stack.pop();

// alert(output);