var currentRate = 0;
var currentFocus = new Object();

function initCounterDisplay() {
  var currentCount = window.sessionStorage.getItem( 'counter' );
  if( currentCount == null ) {
    currentCount = '0';
  }
  var tmp = document.getElementById( "rate" );
  clearNode( tmp );
  tmp.appendChild( document.createTextNode( currentCount ) );
}

function incrementRate() {
  var currentCount = window.sessionStorage.getItem( 'counter' );
  if( currentCount == null ) {
    currentCount = '0';
  }
  var newCount = parseInt( currentCount ) + 1;
  window.sessionStorage.setItem( 'counter', newCount );
  var tmp = document.getElementById( "rate" );
  clearNode( tmp );
  tmp.appendChild( document.createTextNode( newCount ) );
}

function clearNode( thisNode ) {
  while( thisNode.firstChild ) {
    thisNode.removeChild( thisNode.firstChild );
  }
}

function processOneEntry( elementType, elementTitle, elementContent ) {
  var elementTmp = document.createElement( elementType );
  var elementTextEntry = document.createTextNode( elementTitle + elementContent );
  elementTmp.appendChild( elementTextEntry );
  return elementTmp;
}

function processOne( data, intoWhere ) {
  var thisContainer = document.getElementById( intoWhere );
  var subNode = document.createElement( "div" );
  subNode.appendChild( processOneEntry( "h2", "", data.screen_name + " (" + data.name + ")" ) );
  thisContainer.appendChild( subNode );
  thisContainer.appendChild( processCoreResults( data ) );
}

function showOneAvatarPic( myUri ) {
  var avatarNode = document.createElement( "img" );
  avatarNode.src = myUri;
  var subElement = document.createElement( "li" );
  subElement.appendChild( avatarNode );
  return avatarNode;
}

 function processCoreResults( response ) {
   var listTmp = document.createElement( "ul" );
   var linkNode = document.createElement( "a" );
   linkNode.href = response.url;
   linkNode.appendChild( document.createTextNode( "Web home (click to visit) " ) );
   var subElement = document.createElement( "li" );
   subElement.appendChild( linkNode );
   listTmp.appendChild( subElement );
   subElement = document.createElement( "li" );
   subElement.appendChild( showOneAvatarPic( response.profile_image_url ) );
   listTmp.appendChild( subElement );
   listTmp.appendChild( processOneEntry( "li", "Description: ", response.description ) );
   listTmp.appendChild( processOneEntry( "li", "Location: ", response.location ) );
   listTmp.appendChild( processOneEntry( "li", "Following: ", response.friends_count ) );
   listTmp.appendChild( processOneEntry( "li", "Followed by: ", response.followers_count ) );
   listTmp.appendChild( processOneEntry( "li", "Favorites: ", response.favourites_count ) );
   listTmp.appendChild( processOneEntry( "li", "Protected updates: ", response.protected ) );
   listTmp.appendChild( processOneEntry( "li", "Account created: ", response.created_at ) );
   listTmp.appendChild( processOneEntry( "li", "TZ: ", response.time_zone ) );
   listTmp.setAttribute('style', "font-size: 40%;");
   listTmp.appendChild( processOneEntry( "li", "ID: ", response.id ) );
   return listTmp;
 }