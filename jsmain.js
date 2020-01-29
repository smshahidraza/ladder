 var EXP_LIMIT_PER_ROW = 8;

 function init(){
  // initParser();
  // initParser($("#expressionText").val());

  var expString = "<svg height='800' width='1300' xmlns='http://www.w3.org/2000/svg' >";

  var yCo = 20;
 

  $.each(expObject.bolExpRow, function(key, val) {
      var xCo = 20;
      var orEndUp = 0;
      $.each(val.bolExprCol, function(i, j){
        var name = this.text;
        var status = this.status==="true"?"ladder_true":"ladder_false";
        var color = this.value === "1"?"green":"black";
        // console.log("taskName"+name + "-->"+ status);
        var connectionType = this.connectType;
        var connected =  this.connected;
        


        if(i == 0 ){
          expString += "<use xlink:href='#connectRow' x='"+xCo+"' y='"+yCo+"' class='black' />";
        }

        var xCoOREnd = xCo;
        if (connected === "false"){

          if ( i < EXP_LIMIT_PER_ROW ){
              xCo = xCo + 20;
            for (var inc = i; inc  <= EXP_LIMIT_PER_ROW ; inc++ ) {
                if(connectionType === "OUTPUT"){
                  expString += "<line x1='"+xCo+"' y1='"+(yCo+20)+"' x2='"+(xCo+100)+"' y2='"+(yCo+ 20)+"' class='black' />";
                }
              if ( inc != EXP_LIMIT_PER_ROW ){
                xCo = xCo + 100;                
              }else {
                xCo = xCo + 80;                                
              }
            }

          }                    
        }

          expString += "<use xlink:href='#"+status+"' x='"+xCo+"' y='"+yCo+"' id='"+name+"' class='"+color+"'/>";
          expString += "<text x='"+(xCo + 40)+"' y='"+(yCo - 10)+"'>"+name+"</text>";
          xCo = xCo + 100;


        if (connectionType === "OUTPUT"){
            // expString += "<use xlink:href='#connectOutput' x='"+xCo+"' y='"+yCo+"' id='"+name+"'/>";
            // xCo = xCo + 300;
            expString += "<use xlink:href='#ladder_output' x='"+xCo+"' y='"+yCo+"' id='"+name+"' class='"+color+"'/>";
            expString += "<text x='"+(xCo + 60)+"' y='"+(yCo - 10)+"'>"+name+"</text>";
            xCo = xCo + 130;
            // xCo = xCo + 40;
           //  expString += "<use xlink:href='#connectRowEnd' x='"+xCo+"' y='"+yCo+"' id='"+name+"' class='black'/>";          

        }else if (connectionType  === "OR_END"){


            var i = 0;
            var j = orEndUp;
            while(orEndUp > 0){

            expString += "<use xlink:href='#connectRowOR' x='"+(xCo+20)+"' y='"+(yCo-100*i)+"' id='"+name+"' class='black'/>";              
            orEndUp--;
            i++;
            }


            //expString += "<use xlink:href='#connectRowOR' x='"+(xCo+20)+"' y='"+yCo+"' id='"+name+"' class='black'/>";
            //expString += "<use xlink:href='#connectRowOR' x='"+(xCo+20)+"' y='"+(yCo-100)+"' id='"+name+"' class='black'/>";
            yCo = yCo - (100 * j);
            //orEndUp = 0;
        }else if (connectionType  === "OR_END_DOWN"){
            expString += "<use xlink:href='#connectRowORDown' x='"+(xCo - 60)+"' y='"+yCo+"' id='"+name+"' class='green'/>";
            xCo = xCo - 100;
            yCo = yCo + 100;
            orEndUp++;
        }else{
            // expString += "<use xlink:href='#"+status+"' x='"+xCo+"' y='"+yCo+"' id='"+name+"' class='"+color+"'/>";
            // expString += "<text x='"+(xCo + 40)+"' y='"+(yCo - 10)+"'>"+name+"</text>";
            // xCo = xCo + 100;
        }



        if(val.bolExprCol.length -1  == i) {
          xCo = xCo + 40;
          if (connectionType  === "OR_END" ){
            expString += "<line x1='"+xCo+"' y1='"+(yCo-30)+"' x2='"+xCo+"' y2='"+(yCo+70)+"' class='black' />";
          }else if (connectionType  === "OR_END_DOWN"){
            expString += "<line x1='"+xCo+"' y1='"+(yCo-30)+"' x2='"+xCo+"' y2='"+(yCo+70)+"' class='black' />";
          }else {
            expString += "<use xlink:href='#connectRowEnd' x='"+xCo+"' y='"+yCo+"' id='"+name+"' class='black'/>";          
          }
        }

    });
    yCo = yCo + 100;
  });
  expString += "</svg>";
  // console.log(expString);
  // $("#svgxml").text(rpn);
  // $("#svgxml").append("<br>\r\n"+total);
  // $("#drawingCanvas").append(expString);
 }
