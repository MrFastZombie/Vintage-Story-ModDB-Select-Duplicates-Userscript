// ==UserScript==
// @name        Vintage Story Notifications Select Duplicates
// @namespace   Violentmonkey Scripts
// @icon        https://mods.vintagestory.at/web/favicon/favicon-32x32.png
// @version     1.0.0
//
// @match       https://mods.vintagestory.at/notifications*
// @grant       none
//
// @author      MrFastZombie
// @description Adds a button that automatically selects duplicates in the nofications to make them easier to go through.
// ==/UserScript==

(function () {
  var header = document.querySelector("body > div > main > h2");
  var clearButton = document.querySelector("body > div > main > h2 > small");
  var selectButton = clearButton.cloneNode(true); //Clone the clear all button to use as a base.var
  var newButton = document.createElement('button');
  var selected = false;

  newButton.innerHTML = "Select Duplicates";
  newButton.id = "selectDuplicates";
  selectButton.children[0].id = "selectDuplicates"; //The small has an extra <a> in it for some reason. Just gonna leave it in.
  selectButton.children[0].text = "Select Duplicates";
  selectButton.replaceChild(newButton, selectButton.children[1]); //Add the actual button.
  header.append(selectButton); //Appending places it on the left side.

  let style = {background:"none", border:"none", color:"#3d6594", "text-decoration":"underline", cursor:"pointer", "padding-right":"5px", "padding-bottom":"5px", font:"inherit"}; //Make the button look like the anchors next to it.
  Object.assign(newButton.style, style);

  newButton.onclick = function() {
    var list = document.querySelector("#notifications-list").children; //List of notifications
    var existing = new Set(); //Use a set to store each value

    for(const item of list) {
      var text = item.childNodes[2].nodeValue; //Should select just the text next to the text box.
      var checkbox = item.childNodes[1];
      var exists = existing.has(text);
      if(exists) checkbox.click(); //Simulate a click instead of setting the click state to make sure the pagee acts as if the user clicked the box themselves.

      existing.add(text);
    };

    selected = !selected; //Flip the bool to keep track of the state.
    if(selected) this.innerHTML = "Deselect Duplicates"
    if(!selected) this.innerHTML = "Select Duplicates"
  }
})();
