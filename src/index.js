document.getElementById("app").innerHTML = `
<h1>Hello Parcel!</h1>
<div>
  Look
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>
  for more info about Parcel.
</div>
`;

window.KarlPromise = function(myWaitFunc) {
  function constructor(wf) {

    var PromObj = {
      fulfilled: false,
      reject: function() {},
      promiseGroup: [],
      goodVal: null,
      resolve: function(desireVal) {
        var dVal = desireVal;
        
        document.write("<br/>dVal = ", dVal , "<br/>");

        try{
          for (var i in this.promiseGroup ){
            document.write("i = ", i, "<br/>" );

            
            this.promiseGroup[i]();
          }
        }catch (error){
          this.promiseGroup = [];

          this.reject( error );
        }

        this.fulfilled = true;
      },
      reject: function(myError) {},
      then: function(myThenFunc) {
        this.promiseGroup.push(myThenFunc );

        return this;
      },
      constructor: function( wf ){
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);

        wf(this.resolve, this.reject );
      }
    };

    PromObj.constructor(myWaitFunc);

    return PromObj;
  }

  return constructor( myWaitFunc );
};

//NOTE: not a reference to high school dances
var karlsProm = window.KarlPromise(function( resolve, reject ) {
  document.write("karls new promise.  So, what else will occur here?");

  setTimeout(function(){
    
    try{
      document.write( "<br/> warming up" );

      resolve("hey man, this worked");
    }catch(e){
      reject("error: ", e ,  ", dude, this failed.  The dude does not abide!");
    }
  }, 2000);

});

//document.write("abc");

karlsProm.then( function(){
  document.write( "then method executed" );
} );

