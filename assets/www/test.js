function getOneUser( whichUser ) {
  var fullUri = "https://api.twitter.com/1/users/show.json?screen_name=" + whichUser + "&callback=?";
  incrementRate();
  $.getJSON( fullUri,
    function( data ) {
      processCurrentFocus( data );
  });
  var friendsUri = "https://api.twitter.com/1/friends/ids.json?cursor=-1&screen_name=" + whichUser + "&callback=?";
  incrementRate();
  $.getJSON( friendsUri,
    function( friendData ) {
      processFriends( friendData );
  });
    var followerUri = "https://api.twitter.com/1/followers/ids.json?cursor=-1&screen_name=" + whichUser + "&callback=?";
  incrementRate();
  $.getJSON( followerUri,
    function( followerData ) {
      processFollowers( followerData );
  });
}

function processCurrentFocus( data ) {
  currentFocus = data;
  processOne( currentFocus, "focusUser" );
}

function processFriends( friendData ) {
  var focusFriends = friendData;
  var thisContainer = document.getElementById( "following" );
  var listTmp = document.createElement( "ul" );
  var tmpList = "";
  for( var i=0; (i<focusFriends.ids.length) && (i<100); i++ ) {
    if( tmpList.length <= 0 ) {
      tmpList = focusFriends.ids[ i ];
    }
    else {
      tmpList = tmpList + "," + focusFriends.ids[ i ];
    }
  }

  var friendInfoUri = "https://api.twitter.com/1/users/lookup.json?user_id=" + tmpList + "&callback=?";
  incrementRate();
  $.getJSON( friendInfoUri,
    function( thisData ) {
      var data = thisData;

      for( var key in data ) {
        var thisSublist = document.createElement( "ul" );
        thisSublist.setAttribute('style', "border-bottom: 1px solid #000; width: 80%;");
        var thisItem = document.createElement( "li" );
        var thisAnchorText = data[key].screen_name;
        var friendPic = data[key].profile_image_url;
        var friendDesc = data[key].description;
        var friendLocation = data[key].location;
        var friendCreated = data[key].created_at;

        if( data.hasOwnProperty( key ) ) {
          var thisAnchor = document.createElement( "a" );
          thisAnchor.setAttribute('style', "font-size: 25px; padding-bottom: 20px;");
          thisAnchor.appendChild(document.createTextNode(thisAnchorText));
          thisAnchor.onmouseover = function() {
            this.setAttribute('style', "cursor:pointer; text-decoration:underline;font-size:25px; padding-bottom: 20px;");
          };
          thisAnchor.onmouseout = function() {
            this.setAttribute('style', "cursor:default; text-decoration:none;font-size:25px; padding-bottom: 20px;");

          };
          thisAnchor.onclick = function() {
            document.getElementById( "targetUser" ).value = this.firstChild.nodeValue;
            clearNode( document.getElementById( "focusUser" ) );
            clearNode( document.getElementById( "following" ) );
            clearNode( document.getElementById( "followers" ) );
            getOneUser( document.getElementById( "targetUser" ).value );
          };
          thisItem.appendChild( thisAnchor );
            if( data.hasOwnProperty( key ) ) {
            var duyList = document.createElement("li");
            var thisPic =  document.createElement("img");
            thisPic.setAttribute('src', friendPic);
            thisPic.setAttribute('style', "border:1px solid #000;");
            duyList.appendChild(thisPic);
            thisItem.appendChild(duyList);
        }
         if( data.hasOwnProperty( key ) ) {
             var duyList = document.createElement("li");
             duyList.setAttribute('style', "padding-bottom: 10px;margin-top:-15px;margin-left:53px;font-size:12px;");
             duyDesc = document.createTextNode(friendDesc);
             duyList.appendChild(duyDesc);
              thisItem.appendChild(duyList);
              thisItem.setAttribute('style', "width:70%;");
              var duyList = document.createElement("li");
              duyList.setAttribute('style', "font-size: 40%;");
              duyLocation = document.createTextNode("Location: " + friendLocation);
              duyList.appendChild(duyLocation);
              thisItem.appendChild(duyList);
              var duyList = document.createElement("li");
              duyList.setAttribute('style', "font-size: 40%;");
              duyCreated = document.createTextNode("Join Date: " + friendCreated);
              duyList.appendChild(duyCreated);
              thisItem.appendChild(duyList);
         }
          thisItem.appendChild( thisSublist );
        }
        listTmp.appendChild( thisItem );
      }
      thisContainer.appendChild( listTmp );
  });
}
//////////////////////////////////////////////////////////////////////////////////////////////

function processFollowers( followerData ) {
  var focusFollowers = followerData;
  var thisContain = document.getElementById( "followers" );
  var listTmp = document.createElement( "ul" );
  var tmpList = "";
  for( var i=0; (i<focusFollowers.ids.length) && (i<100); i++ ) {
    if( tmpList.length <= 0 ) {
      tmpList = focusFollowers.ids[ i ];
    }
    else {
      tmpList = tmpList + "," + focusFollowers.ids[ i ];
    }
  }

  var followersInfoUri = "https://api.twitter.com/1/users/lookup.json?user_id=" + tmpList + "&callback=?";
  incrementRate();
  $.getJSON( followersInfoUri,
    function( thisData ) {
      var data = thisData;

      for( var key in data ) {
        var followerSublist = document.createElement( "ul" );
        followerSublist.setAttribute('style', "border-bottom: 1px solid #000; width: 80%;");
        var thisItem = document.createElement( "li" );
        var thisAnchorText = data[key].screen_name;
        var followerPic = data[key].profile_image_url;
        var followerDesc = data[key].description;
        var followerLocation = data[key].location;
        var followerCreated = data[key].created_at;

        if( data.hasOwnProperty( key ) ) {
          var thisAnchor = document.createElement( "a" );
          thisAnchor.setAttribute('style', "font-size: 25px; padding-bottom: 20px;");
          thisAnchor.appendChild(document.createTextNode(thisAnchorText));
          thisAnchor.onmouseover = function() {
            this.setAttribute('style', "cursor:pointer; text-decoration:underline;font-size:25px; padding-bottom: 20px;");
          };
          thisAnchor.onmouseout = function() {
            this.setAttribute('style', "cursor:default; text-decoration:none;font-size:25px; padding-bottom: 20px;");

          };
          thisAnchor.onclick = function() {
            document.getElementById( "targetUser" ).value = this.firstChild.nodeValue;
            clearNode( document.getElementById( "focusUser" ) );
            clearNode( document.getElementById( "following" ) );
            clearNode( document.getElementById( "followers" ) );
            getOneUser( document.getElementById( "targetUser" ).value );
          };
          thisItem.appendChild( thisAnchor );
            if( data.hasOwnProperty( key ) ) {
            var duyList = document.createElement("li");
            var thisPic =  document.createElement("img");
            thisPic.setAttribute('src', followerPic);
            thisPic.setAttribute('style', "border:1px solid #000;");
            duyList.appendChild(thisPic);
            thisItem.appendChild(duyList);
        }
         if( data.hasOwnProperty( key ) ) {
             var duyList = document.createElement("li");
             duyList.setAttribute('style', "padding-bottom: 10px;margin-top:-15px;margin-left:53px;font-size:12px;");
             duyDesc = document.createTextNode(followerDesc);
             duyList.appendChild(duyDesc);
              thisItem.appendChild(duyList);
              thisItem.setAttribute('style', "width:70%;");
              var duyList = document.createElement("li");
              duyList.setAttribute('style', "font-size: 40%;");
              duyLocation = document.createTextNode("Location: " + followerLocation);
              duyList.appendChild(duyLocation);
              thisItem.appendChild(duyList);
              var duyList = document.createElement("li");
              duyList.setAttribute('style', "font-size: 40%;");
              duyCreated = document.createTextNode("Join Date: " + followerCreated);
              duyList.appendChild(duyCreated);
              thisItem.appendChild(duyList);
         }
          thisItem.appendChild( followerSublist );
        }
        listTmp.appendChild( thisItem );
      }
      thisContain.appendChild( listTmp );
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////
function printResults( results ) {
  var doe = document.getElementById('wub');
  for( var i = 0; i < results.length; i++ ) {
 var myList = document.createElement( 'ul' );
    for( var key in results ) {
      var tweetSubList = document.createElement('ul');
      var tweetItem = document.createElement( "li" );
      tweetItem.setAttribute('style', "border-bottom: 1px solid #000; width: 80%;");
      if( results.hasOwnProperty( key ) ) {
        var myEle = document.createElement('li');
        myEle.setAttribute('style', "padding-bottom: 20px;padding-top:10px;font-weight: bold;");
        myEle.appendChild( oneEntry(results[key].text ) );
        tweetItem.appendChild(myEle);
         var myEle = document.createElement('li');
         myEle.setAttribute('style', "font-size: 40%;");
        myEle.appendChild( oneEntry( "Time Created : " + results[key].created_at ) );
        tweetItem.appendChild(myEle);
        var myEle = document.createElement('li');
        myEle.setAttribute('style', "font-size: 40%;");
        myEle.appendChild( oneEntry( "Source: " + results[key].source ) );
        tweetItem.appendChild(myEle);
      }
      myList.appendChild(tweetItem);
    }
  };
  document.getElementById( 'wub' ).appendChild( myList );
}
function fred(twitters){
   printResults(twitters);
}
function oneEntry( response){
  var tmpLi = document.createElement( 'li' );
  tmpLi.appendChild(document.createTextNode(response));
  return tmpLi;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function makeMoney(targetUser){
   var money = document.getElementById('targetUser').value;
   var ma = document.getElementById('wub');

  if(ma.hasChildNodes()){
    
    ma.removeChild(ma.lastChild);
  }

   if(money == ""){
    alert("hey type something");
   }
    else{

        var api = "https://api.twitter.com/1/statuses/user_timeline.json?screen_name="+money+"&callback=fred";
        var link = document.createElement("script");
        link.setAttribute("type", "text/javascript");
        link.setAttribute("src", api);
        document.getElementsByTagName('head')[0].appendChild(link);

    }
  
}