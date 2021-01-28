// ==UserScript==
// @name         Decklog To Tabletop simulator script
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Download TCG image from Decklog and save it for use in Tabletop simulator
// @author       Royal
// @match        https://decklog.bushiroad.com/view/*
// @grant        GM_download
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

var t1 = "";
var t2 = "";
var t3 = "";
var t4 = "";
var totalnum = "";
var lua_base = "";
var cardback = "https://www.tcgcard.tw/wp-content/uploads/2020/05/ws_cardback.png";
var target = document.querySelector('.body-page-view');
// create an observer instance
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        setTimeout(function() {
//Code to run After timeout elapses
        remove_landscape_card();
}, 500); //Two seconds will elapse and Code will execute.
    });
});

// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };




(function() {
    'use strict';

    // Your code here...
$(document).ready(function() { //When document has loaded

observer.observe(target, config);


setTimeout(function() {
//Code to run After timeout elapses
    // test button
    //$(".deckview").append('<button type="button" id="Testbbt">Testbbt</button>');
    //$("#Testbbt").click (Testbbt);
    $(".deckview").append('<button type="button" id="DL_TTS_bt">Download As TTS card set</button>');
    $("#DL_TTS_bt").click (card_set);
    $(".deckview").append('<button type="button" id="getdata">Get Lua Code</button>');
    $("#getdata").click (getdata);


}, 4000); //Two seconds will elapse and Code will execute.



});






})();







function card_set (zEvent) {
    alert ("Downloading as TTS card set");
        $(".deckview").find(".card-item").each(function( index ) {
        console.log( index + ": " + $(this).find("img").attr("title"));
        var name = $(this).find("img").attr("title").replace('/', '-');
        var dl_url = $(this).find("img").attr("src");
        var num = "0"+$(this).find(".card-controller-inner").find(".num").first().text()+"x"
        var path = 'Decklog_TTS/'; // use a special folder for all the images
        var arg = {
            url: dl_url,
            name: path + num + " " + name + ".png"
        };
        var result= GM_download(arg);
        console.log(result);
    });
    //download card back
        var arg = {
        url: "https://www.tcgcard.tw/wp-content/uploads/2020/05/ws_cardback.png",
        name: "Decklog_TTS/00 back.png"
        };
        var result= GM_download(arg);
        console.log(result);




}



function getdata (zEvent) {
    // alert ("Test");
    var urllist = [];
    var cardidlist = [];
    var cardtitlelist = [];
    var carddesc = [];
    totalnum = $(".graph-sum-value").text();

     $(".deckview").find(".card-item").each(function( index ) {
        //console.log( index + ": " + $(this).find("img").attr("title"));

         var num = $(this).find(".card-controller-inner").find(".num").first().text()
         var i;
         for (i = 0; i < num; i++) {
             var dl_url = $(this).find("img").attr("src");
             urllist.push(dl_url);
             var name = $(this).find("img").attr("title");
             var spname = name.split(" : ");
             cardidlist.push(spname[0]);
             cardtitlelist.push(spname[1]);
             }

});
    console.log("'"+urllist.join("','")+"'");
    console.log("'"+cardidlist.join("','")+"'");
    console.log("'"+cardtitlelist.join("','")+"'");
    console.log("'"+carddesc.join("','")+"'");
    GM_setClipboard ("'"+urllist.join("','")+"'");
    //GM_setClipboard ("'"+cardidlist.join("','")+"'");
    //GM_setClipboard ("'"+cardtitlelist.join("','")+"'");
    //GM_setClipboard ("'"+carddesc.join("','")+"'");
    t1 = "'"+urllist.join("','")+"'";
    t2 = "'"+cardidlist.join("','")+"'";
    t3 = "'"+cardtitlelist.join("','")+"'";
    //var t4 = "'"+carddesc.join("','")+"'";
    t4 = "";
    combine()







}



/*

function getdata (zEvent) {
    alert ("Test");
    var urllist = [];
    var cardidlist = [];
    var cardtitlelist = [];
    var carddesc = [];

     $(".deckview").find(".card-item").each(function( index ) {
        //console.log( index + ": " + $(this).find("img").attr("title"));

         var num = $(this).find(".card-controller-inner").find(".num").first().text()
         var name = $(this).find("img").attr("title");
         var spname = name.split(" : ");
         var dataurl = "https://ws-tcg.com/cardlist/?cardno="+spname[0];
         var i;
         for (i = 0; i < num; i++) {
             cardidlist.push(spname[0]);
             cardtitlelist.push(spname[1]);


             var dl_url = $(this).find("img").attr("src");
             urllist.push(dl_url);

             }

});
    console.log("'"+urllist.join("','")+"'");
    console.log("'"+cardidlist.join("','")+"'");
    console.log("'"+cardtitlelist.join("','")+"'");
    console.log("'"+carddesc.join("','")+"'");
    //GM_setClipboard ("'"+urllist.join("','")+"'");
    //GM_setClipboard ("'"+cardidlist.join("','")+"'");
    GM_setClipboard ("'"+cardtitlelist.join("','")+"'");
    //GM_setClipboard ("'"+carddesc.join("','")+"'");


}

*/

function remove_landscape_card (zEvent) {
    //alert ("Test");
    const img = new Image();
        $(".deckview").find(".card-item").each(function( index ) {
            //console.log( index + ": " + $(this).find("img"));

            const img = new Image();
            //img.onload = function() {
            //    console.log( index + ": " + this.width + 'x' + this.height);
            //}


            img.src = $(this).find("img").attr("src");
            console.log( index + ": " + img.width + 'x' + img.height);
            if (img.width > img.height){
                var name = $(this).find("img").attr("title");
                var spname = name.split(" : ");
                var yyturl1 = 'https://yuyu-tei.jp/game_ws/sell/sell_price.php?name='+spname[0];


                let getimg = new Promise((resolve,reject) => {

                GM_xmlhttpRequest({
                    method: 'GET',
                    url: yyturl1 ,
                    headers: {
                        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                        'Accept': 'application/atom+xml,application/xml,text/xml',
                    },
                    onload: function(responseDetails) {
                        //console.log('Request for Atom feed returned ' + responseDetails.status + ' ' + responseDetails.statusText + '\n\n' +'Feed data:\n' + responseDetails.responseText);
                        //console.log(responseDetails.responseText)
                        var yyturl2 = "https://yuyu-tei.jp"+$(responseDetails.responseText).find(".card_list_box").find("a").attr("href")

                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: yyturl2 ,
                            headers: {
                                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                                'Accept': 'application/atom+xml,application/xml,text/xml',
                            },
                            onload: function(responseDetails) {
                                //console.log('Request for Atom feed returned ' + responseDetails.status + ' ' + responseDetails.statusText + '\n\n' +'Feed data:\n' + responseDetails.responseText);
                                //console.log(responseDetails.responseText)
                                var data = responseDetails.responseText;
                                var newimg = $(data).find(".image_box").find("img").first().attr("src");
                                console.log(newimg);
                                 if (newimg != "" ){
                                     resolve(newimg);
                                 } else{
                                     reject("img no found");
                                 }


                            }
                        });
                    }
                });


            });

           getimg.then(successdata =>{
                console.log($(this).find("img").attr("src", successdata))
                });
           }

        //alert(name);
    });

}


function Testbbt (zEvent) {
    alert ("Test");
    combine();


};

let get_lua_code = new Promise((resolve,reject) => {

                            GM_xmlhttpRequest({
                            method: 'GET',
                            url: "https://raw.githubusercontent.com/RoyalShooter/Decklog-To-Tabletop-simulator-script/main/Lua_Basecode/lua_base" ,
                            headers: {
                                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                                'Accept': 'application/atom+xml,application/xml,text/xml',
                            },
                            onload: function(responseDetails) {
                                //console.log('Request for Atom feed returned ' + responseDetails.status + ' ' + responseDetails.statusText + '\n\n' +'Feed data:\n' + responseDetails.responseText);
                                //console.log(responseDetails.responseText)
                                lua_base = responseDetails.responseText;
                                //GM_setClipboard (lua_base);
                                 if (lua_base != "" ){
                                     resolve(lua_base);
                                 } else{
                                     reject("err on base lua");
                                 }
                            }
                        });

});

function combine(){
    get_lua_code.then(successdata =>{
                lua_base = successdata ;
                });
    var lua_top = "local testurl = {"+t1+"} \n local cardid = {"+t2+"} \n local cardname = {"+t3+"} \n local carddesc = {"+t4+"} \n local totalnum = '" +totalnum+"' \n local cardBack = '"+cardback+"'\n";
    var lua = lua_top + "\n" + lua_base
    GM_setClipboard (lua);
    alert("Lua code finished, please paste lua in the scripting tab");





};
