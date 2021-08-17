// Creating the grid as a 2D array
import React, {useRef, useState} from 'react';
import './style.css';
import Popup from 'reactjs-popup';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server'
import { off } from 'process';
import { type } from 'os';

const grid_row_length = 8;
const  grid_col_length = 8;



const grid = []; // Initializing an empty array

var grid_index = 0; // Index of tiles in grid
var table, tr, td, paraId, para, isSelected, isTaken, currentTile, moveableTileIndex, moveableTileIndex2, tileCheck, isWhiteTurn, PawnNumber, RookNumber, KingNumber, QueenNumber, KnightNumber, BishopNumber; // Initializing critical components
var MoveableTiles = [] // creating array of moveable tiles
var CapturableTiles = [] // creating array of capturable tiles
var FiledOfMovement = [] // creating movement field
isWhiteTurn = true;
// List of white pieces
var WhitePieces = [];
WhitePieces = ["wPawn1", "wPawn2", "wPawn3", "wPawn4", "wPawn5", "wPawn6", "wPawn7", "wPawn8", "wRook1", "wRook2","wRook3","wRook4","wRook5","wRook6","wRook7","wRook8","wRook9","wRook10" ,"wKing", "wQueen1","wQueen2","wQueen3","wQueen4","wQueen5","wQueen6","wQueen7","wQueen8","wQueen9", "wKnight1", "wKnight2", "wKnight3","wKnight4","wKnight5", "wKnight6","wKnight7","wKnight8","wKnight9","wKnight10","wBishop1", "wBishop2","wBishop3","wBishop4","wBishop5","wBishop6","wBishop7","wBishop8","wBishop9","wBishop10"];

//List of black pieces
var BlackPieces = [];
BlackPieces = ["bPawn1", "bPawn2", "bPawn3", "bPawn4", "bPawn5", "bPawn6", "bPawn7", "bPawn8", "bRook1", "bRook2","bRook3","bRook4","bRook5","bRook6","bRook7","bRook8","bRook9","bRook10" ,"bKing", "bQueen1","bQueen2","bQueen3","bQueen4","bQueen5","bQueen6","bQueen7","bQueen8","bQueen9", "bKnight1", "bKnight2", "bKnight3","bKnight4","bKnight5", "bKnight6","bKnight7","bKnight8","bKnight9","bKnight10","bBishop1", "bBishop2","bBishop3","bBishop4","bBishop5","bBishop6","bBishop7","bBishop8","bBishop9","bBishop10"];

var CurrentPiece;

// column and row position variables
var getCol,getRow, prevGetCol, prevGetRow;

// Extra tile check
var squareCheck;

// Offsets for knight and king
var offset = [];

// En passent
var prevWhitePawnPosition, curWhitePawnPosition, prevBlackPawnPosition, curBlackPawnPosition;

// Castling
var wRook1HasMoved = false,wRook2HasMoved = false,bRook1HasMoved = false,bRook2HasMoved =false ,wKingHasMoved = false,bKingHasMoved=false;
var wCastleTriggerKingSide = false, wCastleTriggerQueenSide = false, bCastleTriggerKingSide = false, bCastleTriggerQueenSide = false;
var prevBlackKingPosition, curBlackKingPosition, prevWhiteKingPosition, curWhiteKingPosition;

// Check for pawn promotion
var wPawnPromotionAllowed = false;
var bPawnPromotionAllowed = false;
var PawnPromotionAllowed = false;
var Modal1, Modal2;
Modal1 = document.createElement("div");// Modal setup
Modal1.className="modal1-inactive";
Modal2 = document.createElement("div"); 
Modal2.className="modal2-inactive";

// Tracking piece promotion IDs
let wQueenPromotionNumber = 1;
let wRookPromotionNumber = 2;
let wBishopPromotionNumber = 2
let wKnightPromotionNumber = 2;
let bQueenPromotionNumber = 1
let bRookPromotionNumber = 2
let bBishopPromotionNumber = 2
let bKnightPromotionNumber = 2;

var QueenButton, RookButton, BishopButton, KnightButton;

// Check, checkmate and stalemate setup


var whitePieceMap = [];
var blackPieceMap = [];
var CurrentPieceInBlackPieceMap, CurrentTileInBlackPieceMap;
var CurrentTileInWhitePieceMap, CurrentPieceInWhitePieceMap;


/*
let whitePieceMap = [{
    name: String,
    moveList: []
}];

let blackPieceMap = [{
    name: String,
    moveList: []
}];
*/

// Function used to looping to create 8x8 grid
function DrawGrid(){

    table = document.createElement("table"); // Create table in HTML

    for (let i = 0; i < grid_row_length; i++){
        grid[i] = [grid_index];
        
        tr = document.createElement('tr');

        for(let j = 0; j<grid_col_length; j++){
            grid_index++;
            grid[i][j] = [grid_index];

            td = document.createElement('td');

            td.setAttribute("id", grid_index);

            if (i%2 === j%2){
                td.className = "white";
            } else { td.className = "black"; }

            para = document.createElement('p');
            para.className = "piece";

            if (grid_index === 1){
                para.innerHTML = "&#9820";
                para.setAttribute("id","bRook1");

                window.onload= function(){
                    paraId = document.getElementById("bRook1");
                    paraId.addEventListener("click", movePiece);
            }
            } else if (grid_index === 2){
                para.innerHTML = "&#9822";
                para.setAttribute("id","bKnight1");

                window.onload = function(){
                    paraId = document.getElementById("bKnight1");
                    paraId.addEventListener("click", movePiece);
                }
            } else if (grid_index === 3){
                para.innerHTML = "&#9821";
                para.setAttribute("id","bBishop1");
                
                window.onload = function(){
                    paraId = document.getElementById("bBishop1");
                    paraId.addEventListener("click", movePiece);
                }
            } else if (grid_index === 4){
                para.innerHTML = "&#9819";
                para.setAttribute("id","bQueen1");

                window.onload = function(){
                paraId = document.getElementById("bQueen1");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 5){
                para.innerHTML = "&#9818";
                para.setAttribute("id","bKing");

                window.onload = function(){
                paraId=document.getElementById("bKing");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 6){
                para.innerHTML = "&#9821";
                para.setAttribute("id","bBishop2");

                window.onload = function(){
                paraId = document.getElementById("bBishop2");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 7){
                para.innerHTML = "&#9822";
                para.setAttribute("id","bKnight2");

                window.onload = function(){
                paraId = document.getElementById("bKnight2");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 8){
                para.innerHTML = "&#9820";
                para.setAttribute("id","bRook2");

                window.onload = function(){
                paraId = document.getElementById("bRook2");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 57){
                para.innerHTML = "&#9814";
                para.setAttribute("id","wRook1");

                window.onload = function(){
                paraId = document.getElementById("wRook1");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 58){
                para.innerHTML = "&#9816";
                para.setAttribute("id","wKnight1");

                window.onload = function(){
                paraId = document.getElementById("wKnight1");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 59){
                para.innerHTML = "&#9815";
                para.setAttribute("id","wBishop1");

                window.onload = function(){
                paraId = document.getElementById("wBishop1");
                paraId.addEventListener("click", movePiece);
            } } else if (grid_index === 60){
                para.innerHTML = "&#9813";
                para.setAttribute("id","wQueen1");

                window.onload = function(){
                paraId = document.getElementById("wQueen1");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 61){
                para.innerHTML = "&#9812";
                para.setAttribute("id","wKing");

                window.onload = function(){
                paraId = document.getElementById("wKing");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 62){
                para.innerHTML = "&#9815";
                para.setAttribute("id","wBishop2");

                window.onload = function(){
                paraId = document.getElementById("wBishop2");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 63){
                para.innerHTML = "&#9816";
                para.setAttribute("id","wKnight2");

                window.onload = function(){
                paraId = document.getElementById("wKnight2");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 64){
                para.innerHTML = "&#9814";
                para.setAttribute("id","wRook2");

                window.onload = function(){
                paraId = document.getElementById("wRook2");
                paraId.addEventListener("click", movePiece);
            } } else if (grid_index === 9){
                para.innerHTML = "&#9823";
                para.setAttribute("id","bPawn1");

                window.onload = function(){
                paraId=document.getElementById("bPawn1");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 10){
                para.innerHTML = "&#9823";
                para.setAttribute("id","bPawn2");

                window.onload = function(){
                paraId=document.getElementById("bPawn2");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 11){
                para.innerHTML = "&#9823";
                para.setAttribute("id","bPawn3");

                window.onload = function(){
                paraId=document.getElementById("bPawn3");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 12){
                para.innerHTML = "&#9823";
                para.setAttribute("id","bPawn4");

                window.onload = function(){
                paraId = document.getElementById("bPawn4");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 13){
                para.innerHTML = "&#9823";
                para.setAttribute("id","bPawn5");

                window.onload = function(){
                paraId = document.getElementById("bPawn5");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 14){
                para.innerHTML = "&#9823";
                para.setAttribute("id","bPawn6");

                window.onload = function(){
                paraId = document.getElementById("bPawn6");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 15){
                para.innerHTML = "&#9823";
                para.setAttribute("id","bPawn7");

                window.onload = function(){
                paraId = document.getElementById("bPawn7");
                paraId.addEventListener("click", movePiece);
            }} else if (grid_index === 16){
                para.innerHTML = "&#9823";
                para.setAttribute("id","bPawn8");

                window.onload = function(){
                paraId = document.getElementById("bPawn8");
                paraId.addEventListener("click", movePiece);
            } } else if (grid_index === 49){
                para.innerHTML = "&#9817";
                para.setAttribute("id","wPawn1");

                window.onload = function(){
                paraId = document.getElementById("wPawn1");
                paraId.addEventListener("click", movePiece);
            } } else if (grid_index === 50){
                para.innerHTML = "&#9817";
                para.setAttribute("id","wPawn2");

                window.onload = function(){
                paraId = document.getElementById("wPawn2");
                paraId.addEventListener("click", movePiece);
            } } else if (grid_index === 51){
                para.innerHTML = "&#9817";
                para.setAttribute("id","wPawn3");

                window.onload = function(){
                paraId = document.getElementById("wPawn3");
                paraId.addEventListener("click", movePiece);
            } } else if (grid_index === 52){
                para.innerHTML = "&#9817";
                para.setAttribute("id","wPawn4");

                window.onload = function(){
                paraId = document.getElementById("wPawn4");
                paraId.addEventListener("click", movePiece);
            } } else if (grid_index === 53){
                para.innerHTML = "&#9817";
                para.setAttribute("id","wPawn5");

                window.onload = function(){
                paraId = document.getElementById("wPawn5");
                paraId.addEventListener("click", movePiece);
            } } else if (grid_index === 54){
                para.innerHTML = "&#9817";
                para.setAttribute("id","wPawn6");

                window.onload = function(){
                paraId = document.getElementById("wPawn6");
                paraId.addEventListener("click", movePiece);
            } } else if (grid_index === 55){
                para.innerHTML = "&#9817";
                para.setAttribute("id","wPawn7");

                window.onload = function(){
                paraId = document.getElementById("wPawn7");
                paraId.addEventListener("click", movePiece);
            } }
            else if (grid_index === 56){
                para.innerHTML = "&#9817";
                para.setAttribute("id","wPawn8");

                window.onload = function(){
                paraId = document.getElementById("wPawn8");
                paraId.addEventListener("click", movePiece);
            }} else {para.setAttribute("id","")}
            
            td.appendChild(para);

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    Modal1.appendChild(table);
    Modal2.appendChild(Modal1);
    document.body.appendChild(Modal2);




    // Tracking user clicks
    window.onload=function(){
        document.body.addEventListener("click", function(evt){
            movePiece();
            console.log(Modal2.className);
            console.log(Modal1.className);

            // White turn
            if(Modal1.className==="modal1-inactive"){
            if (isWhiteTurn === true){

                    // White piece movement
                    if (WhitePieces.includes(evt.target.id) === true){
                        CurrentPiece = evt.target.id;
                        for (var n =0; n < MoveableTiles.length; n++){
    
                            if ((document.getElementById(MoveableTiles[n])).className === "white") {
                                
                                document.getElementById(MoveableTiles[n]).style.backgroundColor = "#eeeed2";
                            } else if ((document.getElementById(MoveableTiles[n])).className === "black"){
                                document.getElementById(MoveableTiles[n]).style.backgroundColor = "#769656";
                            }
                        }
    
                        MoveableTiles = [];
                        CapturableTiles = [];
                        isSelected = true;
                        currentTile =(document.getElementById(evt.target.parentElement.id));

                        // Pawn movement
                        if (["wPawn1","wPawn2","wPawn3","wPawn4","wPawn5","wPawn6","wPawn7","wPawn8"].includes(CurrentPiece) === true){
                            
                             // getting row and column position
                             for(var i = 0; i < grid_row_length; i++){
                                for(var j = 0; j < grid_col_length; j++){
                                    if(grid[i][j].includes(parseInt(currentTile.id))){
                                        getRow = i;
                                        console.log(getRow);
                                        getCol = j;
                                        console.log(getCol);
                                    }
                                }                          
                            }

                            if((parseInt(currentTile.id) - 8) > 0){
                            if(document.getElementById(parseInt(currentTile.id) - 8).firstChild.id === ""){
                                MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) - 8).id));
                            }
                        }

                            if((parseInt(currentTile.id) - 16) > 0){
                                if((document.getElementById(parseInt(currentTile.id) - 16).firstChild.id === "") && ([49,50,51,52,53,54,55,56].includes(parseInt(currentTile.id)))){
                                    MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) - 16).id));
                                }
                            }

                            if((parseInt(currentTile.id) - 9) > 0){
                            if((BlackPieces.includes(document.getElementById(parseInt(currentTile.id) - 9).firstChild.id) && ([1,9,17,25,33,41,49,57].includes(parseInt(currentTile.id)) === false) ) ){
                                MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) - 9).id)); 
                            }

                            // En passent
                            if(([1,9,17,25,33,41,49,57].includes(parseInt(currentTile.id)) === false) && ((curBlackPawnPosition - prevBlackPawnPosition) === 16) && (["bPawn1","bPawn2","bPawn3","bPawn4","bPawn5","bPawn6","bPawn7","bPawn8"].includes(document.getElementById(parseInt(currentTile.id)-1).firstChild.id) ) && ([1,9,17,25,33,41,49,57].includes(parseInt(currentTile.id)) === false)){
                                MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) - 9).id)); 
                            }
                        }

                        if((parseInt(currentTile.id) - 7) > 0){
                            if((BlackPieces.includes(document.getElementById(parseInt(currentTile.id) - 7).firstChild.id) && ([8,16,24,32,40,48,56,64].includes(parseInt(currentTile.id)) === false) )){
                                MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) - 7).id)); 
                            }

                            // En passent
                            if(([1,9,17,25,33,41,49,57].includes(parseInt(currentTile.id)) === false) && ((curBlackPawnPosition - prevBlackPawnPosition) === 16) && (["bPawn1","bPawn2","bPawn3","bPawn4","bPawn5","bPawn6","bPawn7","bPawn8"].includes(document.getElementById(parseInt(currentTile.id)+1).firstChild.id ) )&& ([8,16,24,32,40,48,56,64].includes(parseInt(currentTile.id)) === false)){
                                MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) - 7).id)); 
                            }
                        }
                        }

                        // Rook movement
                        if (["wRook1","wRook2","wRook3","wRook4","wRook5","wRook6","wRook7","wRook8","wRook9","wRook10"].includes(CurrentPiece) === true){
                            

                            // getting row and column position
                            for(var i = 0; i < grid_row_length; i++){
                                for(var j = 0; j < grid_col_length; j++){
                                    if(grid[i][j].includes(parseInt(currentTile.id))){
                                        getRow = i;
                                        console.log(getRow);
                                        getCol = j;
                                        console.log(getCol);
                                    }
                                }                          
                            }

                            // all possible moves up
                            for(var n = parseInt(currentTile.id) - 8;n > 0 ;n=n-8){
                                console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

                                if(document.getElementById(n).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                                    continue;
                                } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                                    break;
                                } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
                                    break;
                                }
                            }


                            // all possible moves down
                            for(var n = parseInt(currentTile.id) + 8;n < 65 ;n=n+8){
                                console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

                                if(document.getElementById(n).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                                    continue;
                                } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                                    break;
                                } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
                                    break;
                                }
                            }

                            // all possible moves right
                            for(var n = parseInt(currentTile.id) + 1;n <= grid[getRow][7] ;n=n+1){
                                console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);
                                
                                            
                                            if(document.getElementById(n).firstChild.id === ""){
                                                MoveableTiles.push(parseInt(document.getElementById(n).id));
                                                continue;
                                              
                                            } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
                                                MoveableTiles.push(parseInt(document.getElementById(n).id));
                                                break;
                                            } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
                                                break;
                                            } 

                            }

                            
                            

                            // all possible moves left
                            for(var n = parseInt(currentTile.id) - 1;n >= grid[getRow][0] ;n=n-1){
                                console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

                           
                                            
                                if(document.getElementById(n).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                                    continue;
                                  
                                } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                                    break;
                                } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
                                    break;
                                } 

                        
                        }
                        
                        console.log(parseInt(currentTile.id));
                    }
                        // Knight movement
                        
                        if(["wKnight1","wKnight2","wKnight3","wKnight4","wKnight5","wKnight6","wKnight7","wKnight8","wKnight9","wKnight10"].includes(CurrentPiece)){
                                                     // getting row and column position
                                                     for(var i = 0; i < grid_row_length; i++){
                                                        for(var j = 0; j < grid_col_length; j++){
                                                            if(grid[i][j].includes(parseInt(currentTile.id))){
                                                                getRow = i;
                                                                console.log("row:",getRow);
                                                                getCol = j;
                                                                console.log("col:",getCol);
                                                            }
                                                        }                          
                                                    }


                                                    

                            offset = [-17,17,-15, 15,-6,6,-10,10];

                            // Removing out-of-border tiles
                            if(([8,16,24,32,40,48,56,64]).includes(parseInt(currentTile.id))){
                                offset.splice(offset.indexOf(17),1);
                                offset.splice(offset.indexOf(-15),1);
                                offset.splice(offset.indexOf(-6),1);
                                offset.splice(offset.indexOf(10),1);
                                }
                                
                            if(([7,15,23,31,39,47,55,63]).includes(parseInt(currentTile.id))){
                                offset.splice(offset.indexOf(-6),1);
                                offset.splice(offset.indexOf(10),1);
                            }
                            

                            if(([1,9,17,25,33,41,49,57]).includes(parseInt(currentTile.id))){
                                offset.splice(offset.indexOf(-17),1);
                                offset.splice(offset.indexOf(15),1);
                                offset.splice(offset.indexOf(6),1);
                                offset.splice(offset.indexOf(-10),1);
                                }
                                
                            if(([2,10,18,26,34,42,50,58]).includes(parseInt(currentTile.id))){
                                offset.splice(offset.indexOf(6),1);
                                offset.splice(offset.indexOf(-10),1);
                            }                            

                            for(var i in offset){
                                    console.log("i",i);
                                    console.log("j",i);
                                    console.log("offset pos",offset[i]);
                                    console.log(parseInt(currentTile.id) + offset[i]);  

                                    if(((parseInt(currentTile.id) + offset[i]) > 64) || ((parseInt(currentTile.id) + offset[i]) < 1)){
                                        continue;
                                    }

                                    if((document.getElementById(parseInt(currentTile.id) + offset[i]).firstChild.id === "") || (BlackPieces.includes(document.getElementById(parseInt(currentTile.id) + offset[i]).firstChild.id))){
                                        MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) + offset[i]).id));
                                        continue;
                                    } else if (WhitePieces.includes(document.getElementById(parseInt(currentTile.id) + offset[i]).firstChild.id)){
                                        continue;
                                    }
                            }

                            offset = [];
                        }


                        // Queen movement
                        if (["wQueen1","wQueen2","wQueen3","wQueen4","wQueen5","wQueen6","wQueen7","wQueen8","wQueen9"].includes(CurrentPiece)){

                            // getting row and column position
                            for(var i = 0; i < grid_row_length; i++){
                                for(var j = 0; j < grid_col_length; j++){
                                    if(grid[i][j].includes(parseInt(currentTile.id))){
                                        getRow = i;
                                        console.log(getRow);
                                        getCol = j;
                                        console.log(getCol);
                                        }
                                    }                          
                                }
                
                            // all moves in the down positive diagonal
    
                            for(var j = getCol +1, i = getRow+1; j<8 && i<8 ; j++, i++){ 
                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }

                            }

                            // all moves in the up positive diagonal
                            for(var j = getCol -1, i = getRow+1; j>-1 && i<8 ; j--, i++){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }


                            // all moves in the up negative diagonal
                            for(var j = getCol -1, i = getRow-1; j>-1 && i>-1 ; j--, i--){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }

                            // all moves in the down negative diagonal
                            for(var j = getCol +1, i = getRow-1; j<8 && i>-1 ; j++, i--){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }  

// all possible moves up
for(var n = parseInt(currentTile.id) - 8;n > 0 ;n=n-8){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

    if(document.getElementById(n).firstChild.id === ""){
        MoveableTiles.push(parseInt(document.getElementById(n).id));
        continue;
    } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
        MoveableTiles.push(parseInt(document.getElementById(n).id));
        break;
    } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
        break;
    }
}


// all possible moves down
for(var n = parseInt(currentTile.id) + 8;n < 65 ;n=n+8){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

    if(document.getElementById(n).firstChild.id === ""){
        MoveableTiles.push(parseInt(document.getElementById(n).id));
        continue;
    } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
        MoveableTiles.push(parseInt(document.getElementById(n).id));
        break;
    } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
        break;
    }
}

// all possible moves right
for(var n = parseInt(currentTile.id) + 1;n <= grid[getRow][7] ;n=n+1){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);
    
                
                if(document.getElementById(n).firstChild.id === ""){
                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                    continue;
                  
                } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                    break;
                } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
                    break;
                } 

}




// all possible moves left
for(var n = parseInt(currentTile.id) - 1;n >= grid[getRow][0] ;n=n-1){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);


                
    if(document.getElementById(n).firstChild.id === ""){
        MoveableTiles.push(parseInt(document.getElementById(n).id));
        continue;
      
    } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
        MoveableTiles.push(parseInt(document.getElementById(n).id));
        break;
    } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
        break;
    } 


}                            
                            

                        }   

                        // King movement
                        if((["wKing"]).includes(CurrentPiece)){

                        // getting row and column position
                        for(var i = 0; i < grid_row_length; i++){
                            for(var j = 0; j < grid_col_length; j++){
                                if(grid[i][j].includes(parseInt(currentTile.id))){
                                    getRow = i;
                                    console.log("row:",getRow);
                                    getCol = j;
                                    console.log("col:",getCol);
                                    console.log(parseInt(grid[getRow][getCol]), typeof(parseInt(grid[getRow][getCol])))
                                }
                                }                          
                                }


                                                    

                            offset = [-1,1,-8, 8, -9,9,-7,7];

                            console.log(offset);

                            // Removing out-of-border tiles
                            if(([8,16,24,32,40,48,56,64]).includes(parseInt(currentTile.id))){
                                offset.splice(offset.indexOf(1),1);
                                offset.splice(offset.indexOf(9),1);
                                offset.splice(offset.indexOf(-7),1);
                            }
                                                            
                            if(([1,9,17,25,33,41,49,57]).includes(parseInt(currentTile.id))){
                                offset.splice(offset.indexOf(-1),1);
                                offset.splice(offset.indexOf(-9),1);
                                offset.splice(offset.indexOf(7),1);
                            }

                            for(var i in offset){
                                console.log("i",i);
                                console.log("j",i);
                                console.log("offset pos",offset[i]);
                                console.log(parseInt(currentTile.id) + offset[i]);  

                                if(((parseInt(currentTile.id) + offset[i]) > 64) || ((parseInt(currentTile.id) + offset[i]) < 1)){
                                    continue;
                                }

                                if((document.getElementById(parseInt(currentTile.id) + offset[i]).firstChild.id === "") ){
                                    MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) + offset[i]).id));
                                    continue;
                                } else if ((BlackPieces.includes(document.getElementById(parseInt(currentTile.id) + offset[i]).firstChild.id))){
                                    MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) + offset[i]).id));
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById(parseInt(currentTile.id) + offset[i]).firstChild.id)){
                                    continue;
                                }

                        }

                        console.log(MoveableTiles);

                        offset=[];

                        // Castling - king side
                        if((wKingHasMoved === false) && (wRook2HasMoved === false) && 
                        (document.getElementById(parseInt(evt.target.parentElement.id)+1).firstChild.id === "") && 
                        (document.getElementById(parseInt(evt.target.parentElement.id)+2).firstChild.id === "")){
                            wCastleTriggerKingSide = true;
                            MoveableTiles.push(parseInt(document.getElementById(parseInt(evt.target.parentElement.id)+2).id));
                            console.log("Castling valid!");
                        } 

                        // Castling - queen side
                        if((wKingHasMoved === false) && (wRook1HasMoved === false) && 
                        (document.getElementById(parseInt(evt.target.parentElement.id)-1).firstChild.id === "") && 
                        (document.getElementById(parseInt(evt.target.parentElement.id)-2).firstChild.id === "") && 
                        (document.getElementById(parseInt(evt.target.parentElement.id)-3).firstChild.id === "")){
                            wCastleTriggerQueenSide = true;
                            MoveableTiles.push(parseInt(document.getElementById(parseInt(evt.target.parentElement.id)-2).id));
                            console.log("Castling valid!");
                        } 

                        }

                        // Bishop movement
                        if (["wBishop1","wBishop2","wBishop3","wBishop4","wBishop5","wBishop6","wBishop7","wBishop8","wBishop9","wBishop10"].includes(CurrentPiece)){

                            // getting row and column position
                            for(var i = 0; i < grid_row_length; i++){
                                for(var j = 0; j < grid_col_length; j++){
                                    if(grid[i][j].includes(parseInt(currentTile.id))){
                                        getRow = i;
                                        console.log(getRow);
                                        getCol = j;
                                        console.log(getCol);
                                        }
                                    }                          
                                }
                
                                console.log("Row:",getRow,"Type:",typeof(getRow));
                                console.log("Col",getCol,"Type:",typeof(getCol));
                                console.log(document.getElementById(toString(grid[getRow][getCol])));

                            // all moves in the down positive diagonal
    
                            for(var j = getCol +1, i = getRow+1; j<8 && i<8 ; j++, i++){ 
                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }

                            }

                            // all moves in the up positive diagonal
                            for(var j = getCol -1, i = getRow+1; j>-1 && i<8 ; j--, i++){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }


                            // all moves in the up negative diagonal
                            for(var j = getCol -1, i = getRow-1; j>-1 && i>-1 ; j--, i--){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }

                            // all moves in the down negative diagonal
                            for(var j = getCol +1, i = getRow-1; j<8 && i>-1 ; j++, i--){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }  

                        }

                        // Color coding moveable tiles
                        for (var n=0; n < MoveableTiles.length; n++){
    
                            console.log(MoveableTiles);

                            if (parseInt(MoveableTiles[n]) <= 0){
                                MoveableTiles.splice(n,1);
                            }
    
                            if (parseInt(MoveableTiles[n]) > 64){
                                MoveableTiles.splice(n,1);
                            }
                            try {
                                document.getElementById(MoveableTiles[n]).style="background-color:#FFE433";
                            } catch {
                                console.error();
                            }
    
                            try {
                                document.getElementById(MoveableTiles[n]).parentElement.style="background-color:#FFE433";
                            } catch {
                                console.error();
                            }
                        }
    
                    } else if ((isSelected===true) && (MoveableTiles.includes(parseInt(evt.target.id || evt.target.parentElement.id)))){

                        // Drawing piece based on class
                        if (MoveableTiles.includes(parseInt(evt.target.id))){
                            document.getElementById((evt.target.id)).firstChild.setAttribute("id",CurrentPiece);
                            document.getElementById((evt.target.id)).firstChild.setAttribute("className","piece");
                            
                            if (["wPawn1","wPawn2","wPawn3","wPawn4","wPawn5","wPawn6","wPawn7","wPawn8"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).firstChild.innerHTML = "&#9817";
                                prevWhitePawnPosition = parseInt(currentTile.id);
                                curWhitePawnPosition = parseInt(evt.target.id);

                                if(((curBlackPawnPosition - prevBlackPawnPosition) === 16) && ( ["bPawn1","bPawn2","bPawn3","bPawn4","bPawn5","bPawn6","bPawn7","bPawn8"].includes(document.getElementById(parseInt(evt.target.id)+8).firstChild.id ))){
                                    document.getElementById(parseInt(evt.target.id)+8).firstChild.textContent ="";
                                    document.getElementById(parseInt(evt.target.id)+8).firstChild.setAttribute("id","");
                                }

                                console.log(wPawnPromotionAllowed);
                                // Promotion check
                                if([1,2,3,4,5,6,7,8].includes(curWhitePawnPosition)){
                                    PawnPromotionAllowed = true;
                                    console.log(PawnPromotionAllowed);
                                }

                            } else if (["wRook1","wRook2","wRook3","wRook4","wRook5","wRook6","wRook7","wRook8","wRook9","wRook10"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).firstChild.innerHTML = "&#9814";
                                if(["wRook1"].includes(CurrentPiece)){
                                    wRook1HasMoved = true;
                                } else if (["wRook2"].includes(CurrentPiece)){
                                    wRook2HasMoved = true;
                                }
                            } else if (["wKnight1","wKnight2","wKnight3","wKnight4","wKnight5","wKnight6","wKnight7","wKnight8","wKnight9","wKnight10"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).firstChild.innerHTML = "&#9816";
                            } else if (["wBishop1","wBishop2","wBishop3","wBishop4","wBishop5","wBishop6","wBishop7","wBishop8","wBishop9","wBishop10"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).firstChild.innerHTML = "&#9815";
                            } else if (["wKing"].includes(CurrentPiece)){
                                prevWhiteKingPosition = parseInt(currentTile.id);
                                curWhiteKingPosition = parseInt(evt.target.id);

                                console.log("previous white king positon:", prevWhiteKingPosition);
                                console.log("current white king positon:", curWhiteKingPosition);
                                //Castling
                                if(((curWhiteKingPosition - prevWhiteKingPosition) === 2) && (wCastleTriggerKingSide === true)){

                                    document.getElementById(parseInt(evt.target.id)).firstChild.innerHTML = "&#9812";
                                    document.getElementById(parseInt(evt.target.id)-1).firstChild.innerHTML = "&#9814";

                                    document.getElementById(parseInt(evt.target.id)-1).firstChild.setAttribute("id","wRook2");
                                    document.getElementById(parseInt(evt.target.id)-1).firstChild.setAttribute("className","piece");

                                    document.getElementById(parseInt(evt.target.id)+1).firstChild.textContent ="";
                                    document.getElementById(parseInt(evt.target.id)+1).firstChild.setAttribute("id","");
                                    
                                    wKingHasMoved = true;
                                    wRook2HasMoved = true;
                                    wCastleTriggerKingSide = false;
                                } else if (((prevWhiteKingPosition-curWhiteKingPosition)=== 2) && (wCastleTriggerQueenSide === true)){

                                    document.getElementById(parseInt(evt.target.id)).firstChild.innerHTML = "&#9812";
                                    document.getElementById(parseInt(evt.target.id)+1).firstChild.innerHTML = "&#9814";

                                    document.getElementById(parseInt(evt.target.id)+1).firstChild.setAttribute("id","wRook1");
                                    document.getElementById(parseInt(evt.target.id)+1).firstChild.setAttribute("className","piece");

                                    document.getElementById(parseInt(evt.target.id)-2).firstChild.textContent ="";
                                    document.getElementById(parseInt(evt.target.id)-2).firstChild.setAttribute("id","");
                                    
                                    wKingHasMoved = true;
                                    wRook1HasMoved = true;

                                    wCastleTriggerQueenSide = false;
                                } else {
                                    document.getElementById(parseInt(evt.target.id)).firstChild.innerHTML = "&#9812";
                                    wKingHasMoved = true;    
                                }
                            } else if (["wQueen1","wQueen2","wQueen3","wQueen4","wQueen5","wQueen6","wQueen7","wQueen8","wQueen9"].includes(CurrentPiece)){
                                // document.getElementById((evt.target.id)).firstElementChild.innerHTML = "&#9813";
                                document.getElementById((evt.target.id)).firstChild.innerHTML = "&#9813";
                            }
                        } else if (MoveableTiles.includes(parseInt(evt.target.parentElement.id))){
                            document.getElementById((evt.target.id)).setAttribute("id",CurrentPiece);
                            document.getElementById((evt.target.id)).setAttribute("className","piece");
                            
                            if (["wPawn1","wPawn2","wPawn3","wPawn4","wPawn5","wPawn6","wPawn7","wPawn8"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).innerHTML = "&#9817";
                                prevWhitePawnPosition = parseInt(currentTile.id);
                                curWhitePawnPosition = parseInt(evt.target.id);

                                if(((curBlackPawnPosition - prevBlackPawnPosition) === 16) && ( ["bPawn1","bPawn2","bPawn3","bPawn4","bPawn5","bPawn6","bPawn7","bPawn8"].includes(document.getElementById(parseInt(evt.target.id)+8).firstChild.id ))){
                                    document.getElementById(parseInt(evt.target.id)+8).firstChild.textContent ="";
                                    document.getElementById(parseInt(evt.target.id)+8).firstChild.setAttribute("id","");
                                }

                                // Promotion check
                                console.log(wPawnPromotionAllowed);
                                if([1,2,3,4,5,6,7,8].includes(curWhitePawnPosition)){
                                    PawnPromotionAllowed = true;
                                    console.log(PawnPromotionAllowed)
                                }

                            } else if (["wRook1","wRook2","wRook3","wRook4","wRook5","wRook6","wRook7","wRook8","wRook9","wRook10"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).innerHTML = "&#9814";
                                if(["wRook1"].includes(CurrentPiece)){
                                    wRook1HasMoved = true;
                                } else if (["wRook2"].includes(CurrentPiece)){
                                    wRook2HasMoved = true;
                                }
                            } else if (["wKnight1","wKnight2","wKnight3","wKnight4","wKnight5","wKnight6","wKnight7","wKnight8","wKnight9","wKnight10"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).innerHTML = "&#9816";
                            } else if (["wBishop1","wBishop2","wBishop3","wBishop4","wBishop5","wBishop6","wBishop7","wBishop8","wBishop9","wBishop10"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).innerHTML = "&#9815";
                            } else if (["wKing"].includes(CurrentPiece)){
                                prevWhiteKingPosition = parseInt(currentTile.id);
                                curWhiteKingPosition = parseInt(evt.target.id);

                                console.log("previous white king positon:", prevWhiteKingPosition);
                                console.log("current white king positon:", curWhiteKingPosition);
                                //Castling
                                if(((curWhiteKingPosition - prevWhiteKingPosition) === 2) && (wCastleTriggerKingSide === true)){

                                    document.getElementById(parseInt(evt.target.id)).innerHTML = "&#9812";
                                    document.getElementById(parseInt(evt.target.id)-1).innerHTML = "&#9814";

                                    document.getElementById(parseInt(evt.target.id)-1).setAttribute("id","wRook2");
                                    document.getElementById(parseInt(evt.target.id)-1).setAttribute("className","piece");

                                    document.getElementById(parseInt(evt.target.id)+1).textContent ="";
                                    document.getElementById(parseInt(evt.target.id)+1).setAttribute("id","");
                                    
                                    wKingHasMoved = true;
                                    wRook2HasMoved = true;
                                    wCastleTriggerKingSide = false;
                                } else if (((prevWhiteKingPosition-curWhiteKingPosition)=== 2) && (wCastleTriggerQueenSide === true)){

                                    document.getElementById(parseInt(evt.target.id)).innerHTML = "&#9812";
                                    document.getElementById(parseInt(evt.target.id)+1).innerHTML = "&#9814";

                                    document.getElementById(parseInt(evt.target.id)+1).setAttribute("id","wRook1");
                                    document.getElementById(parseInt(evt.target.id)+1).setAttribute("className","piece");

                                    document.getElementById(parseInt(evt.target.id)-2).textContent ="";
                                    document.getElementById(parseInt(evt.target.id)-2).setAttribute("id","");
                                    
                                    wKingHasMoved = true;
                                    wRook1HasMoved = true;

                                    wCastleTriggerQueenSide = false;
                                } else {
                                    document.getElementById(parseInt(evt.target.id)).innerHTML = "&#9812";
                                    wKingHasMoved = true;    
                                }
                            } else if (["wQueen1","wQueen2","wQueen3","wQueen4","wQueen5","wQueen6","wQueen7","wQueen8","wQueen9"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).innerHTML = "&#9813";
                            }
                        }
    
                        currentTile.firstChild.textContent = "";
                        currentTile.firstChild.setAttribute("id","");
    
                        for (var n =0; n < MoveableTiles.length; n++){
    
                            if ((document.getElementById(MoveableTiles[n])).className === "white") {
                                document.getElementById(MoveableTiles[n]).style.backgroundColor = "#eeeed2";
                            } else if ((document.getElementById(MoveableTiles[n])).className === "black"){
                                document.getElementById(MoveableTiles[n]).style.backgroundColor = "#769656";
                            }
                        }

                        /*
                        // Pawn promotion
                        if (wPawnPromotionAllowed === true){
                            console.log("Promotion available!");

                            Modal2.className="modal2-active";
                            // Popup message
                            Modal2.textContent="Promote your pawn to:"
                            
                            //Button selection

                            // Queen promotion function
                            wQueenButton = document.createElement("button");
                            wQueenButton.textContent="Queen"
                            wQueenButton.setAttribute("onclick",wQueenPromotion());

                            window.onload=function(){
                                wQueenButton.addEventListener("click",wQueenPromotion());
                            }
                            Modal2.appendChild(wQueenButton);


                            Modal1.className="modal1-active";
                        } else {
                            Modal2.className="modal2-inactive";
                            Modal1.className="modal1-inactive";
                        }
                        */

                        MoveableTiles = [];
                        CapturableTiles = [];
                        isWhiteTurn = false;
                        isSelected = false;
                        
                    } else if ((isSelected === true) && !(MoveableTiles.includes(parseInt(evt.target.id || evt.target.parentElement.id)))){
    
                        for (var n =0; n < MoveableTiles.length; n++){
    
    
                            if ((document.getElementById(MoveableTiles[n])).className === "white") {
                                document.getElementById(MoveableTiles[n]).style.backgroundColor = "#eeeed2";
                            } else if ((document.getElementById(MoveableTiles[n])).className === "black"){
                                document.getElementById(MoveableTiles[n]).style.backgroundColor = "#769656";
                            }  
                        }
    
                        MoveableTiles = [];
                        CapturableTiles = [];
                        isSelected = false;
        }


    // Black piece movements
} else if (isWhiteTurn === false){

                    // Black piece movement
                    if (BlackPieces.includes(evt.target.id) === true){
                        CurrentPiece = evt.target.id;
                        for (var n =0; n < MoveableTiles.length; n++){
    
                            if ((document.getElementById(parseInt(MoveableTiles[n]))).className === "white") {
                                
                                document.getElementById(parseInt(MoveableTiles[n])).style.backgroundColor = "#eeeed2";
                            } else if ((document.getElementById(parseInt(MoveableTiles[n]))).className === "black"){
                                document.getElementById(parseInt(MoveableTiles[n])).style.backgroundColor = "#769656";
                            }
                        }
    
                        MoveableTiles = [];
                        CapturableTiles = [];
                        isSelected = true;
                        currentTile =(document.getElementById(evt.target.parentElement.id));

                        // Pawn movement
                        if (["bPawn1","bPawn2","bPawn3","bPawn4","bPawn5","bPawn6","bPawn7","bPawn8"].includes(CurrentPiece) === true){

                             // getting row and column position
                            for(var i = 0; i < grid_row_length; i++){
                                for(var j = 0; j < grid_col_length; j++){
                                    if(grid[i][j].includes(parseInt(currentTile.id))){
                                        getRow = i;
                                        console.log(getRow);
                                        getCol = j;
                                        console.log(getCol);
                                    }
                                }                          
                            }

                            if((parseInt(currentTile.id) + 8) < 65){
                            if(document.getElementById(parseInt(currentTile.id) + 8).firstChild.id === ""){
                                MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) + 8).id));
                            }
                        }

                            if((parseInt(currentTile.id) + 16) < 65){
                                if((document.getElementById(parseInt(currentTile.id) + 16).firstChild.id === "") && ([9,10,11,12,13,14,15,16].includes(parseInt(currentTile.id)))){
                                    MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) + 16).id));
                                }
                            }

                            if((parseInt(currentTile.id) + 9) < 65){
                            if((WhitePieces.includes(document.getElementById(parseInt(currentTile.id) + 9).firstChild.id) && ([8,16,24,32,40,48,56,64].includes(parseInt(currentTile.id)) === false) )){
                                MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) + 9).id)); 
                            }

                            // En passent
                            if(([8,16,24,32,40,48,56,64].includes(parseInt(currentTile.id)) === false) && ((prevWhitePawnPosition - curWhitePawnPosition) === 16) && (["wPawn1","wPawn2","wPawn3","wPawn4","wPawn5","wPawn6","wPawn7","wPawn8"].includes(document.getElementById(parseInt(currentTile.id)+1).firstChild.id) ) && ([8,16,24,32,40,48,56,64].includes(parseInt(currentTile.id)) === false)){
                                MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) + 9).id)); 
                            }
                        }

                        if((parseInt(currentTile.id) + 7) < 65){
                            if((WhitePieces.includes(document.getElementById(parseInt(currentTile.id) + 7).firstChild.id) && ([1,9,17,25,33,41,49,57].includes(parseInt(currentTile.id)) === false) )){
                                MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) + 7).id)); 
                            }

                            // En passent
                            if(([1,9,17,25,33,41,49,57].includes(parseInt(currentTile.id)) === false) && ((prevWhitePawnPosition - curWhitePawnPosition) === 16) && (["wPawn1","wPawn2","wPawn3","wPawn4","wPawn5","wPawn6","wPawn7","wPawn8"].includes(document.getElementById(parseInt(currentTile.id)-1).firstChild.id) ) && ([1,9,17,25,33,41,49,57].includes(parseInt(currentTile.id)) === false)){
                                MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) + 7).id)); 
                            }
                        }
                        }

                        // Rook movement
                        if (["bRook1","bRook2","bRook3","bRook4","bRook4","bRook5","bRook6","bRook7","bRook8","bRook9","bRook10"].includes(CurrentPiece) === true){
                            

                            // getting row and column position
                            for(var i = 0; i < grid_row_length; i++){
                                for(var j = 0; j < grid_col_length; j++){
                                    if(grid[i][j].includes(parseInt(currentTile.id))){
                                        getRow = i;
                                        console.log(getRow);
                                        getCol = j;
                                        console.log(getCol);
                                    }
                                }                          
                            }

                            // all possible moves up
                            for(var n = parseInt(currentTile.id) - 8;n > 0 ;n=n-8){
                                console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

                                if(document.getElementById(n).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
                                    break;
                                }
                            }


                            // all possible moves down
                            for(var n = parseInt(currentTile.id) + 8;n < 65 ;n=n+8){
                                console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

                                if(document.getElementById(n).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
                                    break;
                                }
                            }

                            // all possible moves right
                            for(var n = parseInt(currentTile.id) + 1;n <= grid[getRow][7] ;n=n+1){
                                console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);
                                
                                            
                                            if(document.getElementById(n).firstChild.id === ""){
                                                MoveableTiles.push(parseInt(document.getElementById(n).id));
                                                continue;
                                              
                                            } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
                                                MoveableTiles.push(parseInt(document.getElementById(n).id));
                                                break;
                                            } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
                                                break;
                                            } 

                            }

                            
                            

                            // all possible moves left
                            for(var n = parseInt(currentTile.id) - 1;n >= grid[getRow][0] ;n=n-1){
                                console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

                           
                                            
                                if(document.getElementById(n).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                                    continue;
                                  
                                } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
                                    break;
                                } 

                        
                        }
                        
                        console.log(parseInt(currentTile.id));
                    }
                        // Knight movement
                        
                        if(["bKnight1","bKnight2","bKnight3","bKnight4","bKnight5","bKnight6","bKnight7","bKnight8","bKnight9","bKnight10"].includes(CurrentPiece)){
                                                     // getting row and column position
                                                     for(var i = 0; i < grid_row_length; i++){
                                                        for(var j = 0; j < grid_col_length; j++){
                                                            if(grid[i][j].includes(parseInt(currentTile.id))){
                                                                getRow = i;
                                                                console.log("row:",getRow);
                                                                getCol = j;
                                                                console.log("col:",getCol);
                                                            }
                                                        }                          
                                                    }


                                                    

                            offset = [-17,17,-15, 15,-6,6,-10,10];

                            // Removing out-of-border tiles
                            if(([8,16,24,32,40,48,56,64]).includes(parseInt(currentTile.id))){
                                offset.splice(offset.indexOf(17),1);
                                offset.splice(offset.indexOf(-15),1);
                                offset.splice(offset.indexOf(-6),1);
                                offset.splice(offset.indexOf(10),1);
                                }
                                
                            if(([7,15,23,31,39,47,55,63]).includes(parseInt(currentTile.id))){
                                offset.splice(offset.indexOf(-6),1);
                                offset.splice(offset.indexOf(10),1);
                            }
                            

                            if(([1,9,17,25,33,41,49,57]).includes(parseInt(currentTile.id))){
                                offset.splice(offset.indexOf(-17),1);
                                offset.splice(offset.indexOf(15),1);
                                offset.splice(offset.indexOf(6),1);
                                offset.splice(offset.indexOf(-10),1);
                                }
                                
                            if(([2,10,18,26,34,42,50,58]).includes(parseInt(currentTile.id))){
                                offset.splice(offset.indexOf(6),1);
                                offset.splice(offset.indexOf(-10),1);
                            }                            

                            for(var i in offset){
                                    console.log("i",i);
                                    console.log("j",i);
                                    console.log("offset pos",offset[i]);
                                    console.log(parseInt(currentTile.id) + offset[i]);  

                                    if(((parseInt(currentTile.id) + offset[i]) > 64) || ((parseInt(currentTile.id) + offset[i]) < 1)){
                                        continue;
                                    }

                                    if((document.getElementById(parseInt(currentTile.id) + offset[i]).firstChild.id === "") || (WhitePieces.includes(document.getElementById(parseInt(currentTile.id) + offset[i]).firstChild.id))){
                                        MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) + offset[i]).id));
                                        continue;
                                    } else if (BlackPieces.includes(document.getElementById(parseInt(currentTile.id) + offset[i]).firstChild.id)){
                                        continue;
                                    }
                            }

                            offset = [];
                        }


                        // Queen movement
                        if (["bQueen1","bQueen2","bQueen3","bQueen4","bQueen5","bQueen6","bQueen7","bQueen8","bQueen9"].includes(CurrentPiece)){

                            // getting row and column position
                            for(var i = 0; i < grid_row_length; i++){
                                for(var j = 0; j < grid_col_length; j++){
                                    if(grid[i][j].includes(parseInt(currentTile.id))){
                                        getRow = i;
                                        console.log(getRow);
                                        getCol = j;
                                        console.log(getCol);
                                        }
                                    }                          
                                }
                
                            // all moves in the down positive diagonal
    
                            for(var j = getCol +1, i = getRow+1; j<8 && i<8 ; j++, i++){ 
                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }

                            }

                            // all moves in the up positive diagonal
                            for(var j = getCol -1, i = getRow+1; j>-1 && i<8 ; j--, i++){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }


                            // all moves in the up negative diagonal
                            for(var j = getCol -1, i = getRow-1; j>-1 && i>-1 ; j--, i--){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }

                            // all moves in the down negative diagonal
                            for(var j = getCol +1, i = getRow-1; j<8 && i>-1 ; j++, i--){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }  

// all possible moves up
for(var n = parseInt(currentTile.id) - 8;n > 0 ;n=n-8){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

    if(document.getElementById(n).firstChild.id === ""){
        MoveableTiles.push(parseInt(document.getElementById(n).id));
        continue;
    } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
        MoveableTiles.push(parseInt(document.getElementById(n).id));
        break;
    } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
        break;
    }
}


// all possible moves down
for(var n = parseInt(currentTile.id) + 8;n < 65 ;n=n+8){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

    if(document.getElementById(n).firstChild.id === ""){
        MoveableTiles.push(parseInt(document.getElementById(n).id));
        continue;
    } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
        MoveableTiles.push(parseInt(document.getElementById(n).id));
        break;
    } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
        break;
    }
}

// all possible moves right
for(var n = parseInt(currentTile.id) + 1;n <= grid[getRow][7] ;n=n+1){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);
    
                
                if(document.getElementById(n).firstChild.id === ""){
                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                    continue;
                  
                } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
                    MoveableTiles.push(parseInt(document.getElementById(n).id));
                    break;
                } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
                    break;
                } 

}




// all possible moves left
for(var n = parseInt(currentTile.id) - 1;n >= grid[getRow][0] ;n=n-1){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);


                
    if(document.getElementById(n).firstChild.id === ""){
        MoveableTiles.push(parseInt(document.getElementById(n).id));
        continue;
      
    } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
        MoveableTiles.push(parseInt(document.getElementById(n).id));
        break;
    } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
        break;
    } 


}                               
                            

                        }   

                        // King movement
                        if((["bKing"]).includes(CurrentPiece)){

                        // getting row and column position
                        for(var i = 0; i < grid_row_length; i++){
                            for(var j = 0; j < grid_col_length; j++){
                                if(grid[i][j].includes(parseInt(currentTile.id))){
                                    getRow = i;
                                    console.log("row:",getRow);
                                    getCol = j;
                                    console.log("col:",getCol);
                                    console.log(parseInt(grid[getRow][getCol]), typeof(parseInt(grid[getRow][getCol])))
                                }
                                }                          
                                }


                                                    

                            offset = [-1,1,-8, 8, -9,9,-7,7];

                            console.log(offset);

                            // Removing out-of-border tiles
                            if(([8,16,24,32,40,48,56,64]).includes(parseInt(currentTile.id))){
                                offset.splice(offset.indexOf(1),1);
                                offset.splice(offset.indexOf(9),1);
                                offset.splice(offset.indexOf(-7),1);
                            }
                                                            
                            if(([1,9,17,25,33,41,49,57]).includes(parseInt(currentTile.id))){
                                offset.splice(offset.indexOf(-1),1);
                                offset.splice(offset.indexOf(-9),1);
                                offset.splice(offset.indexOf(7),1);
                            }

                            for(var i in offset){
                                console.log("i",i);
                                console.log("j",i);
                                console.log("offset pos",offset[i]);
                                console.log(parseInt(currentTile.id) + offset[i]);  

                                if(((parseInt(currentTile.id) + offset[i]) > 64) || ((parseInt(currentTile.id) + offset[i]) < 1)){
                                    continue;
                                }

                                if((document.getElementById(parseInt(currentTile.id) + offset[i]).firstChild.id === "") ){
                                    MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) + offset[i]).id));
                                    continue;
                                } else if ((WhitePieces.includes(document.getElementById(parseInt(currentTile.id) + offset[i]).firstChild.id))){
                                    MoveableTiles.push(parseInt(document.getElementById(parseInt(currentTile.id) + offset[i]).id));
                                    continue;
                                } else if (BlackPieces.includes(document.getElementById(parseInt(currentTile.id) + offset[i]).firstChild.id)){
                                    continue;
                                }

                        }

                        console.log(MoveableTiles);

                        offset=[];


                        // Castling - king side
                        if((bKingHasMoved === false) && (bRook2HasMoved === false) && 
                        (document.getElementById(parseInt(evt.target.parentElement.id)+1).firstChild.id === "") && 
                        (document.getElementById(parseInt(evt.target.parentElement.id)+2).firstChild.id === "")){
                            bCastleTriggerKingSide = true;
                            MoveableTiles.push(parseInt(document.getElementById(parseInt(evt.target.parentElement.id)+2).id));
                            console.log("Castling valid!");
                        } 

                        // Castling - queen side
                        if((bKingHasMoved === false) && (bRook1HasMoved === false) && 
                        (document.getElementById(parseInt(evt.target.parentElement.id)-1).firstChild.id === "") && 
                        (document.getElementById(parseInt(evt.target.parentElement.id)-2).firstChild.id === "") && 
                        (document.getElementById(parseInt(evt.target.parentElement.id)-3).firstChild.id === "")){
                            bCastleTriggerQueenSide = true;
                            MoveableTiles.push(parseInt(document.getElementById(parseInt(evt.target.parentElement.id)-2).id));
                            console.log("Castling valid!");
                        } 
                        }

                        // Bishop movement
                        if (["bBishop1","bBishop2","bBishop3","bBishop4","bBishop5","bBishop6","bBishop7","bBishop8","bBishop9","bBishop10"].includes(CurrentPiece)){

                            // getting row and column position
                            for(var i = 0; i < grid_row_length; i++){
                                for(var j = 0; j < grid_col_length; j++){
                                    if(grid[i][j].includes(parseInt(currentTile.id))){
                                        getRow = i;
                                        console.log(getRow);
                                        getCol = j;
                                        console.log(getCol);
                                        }
                                    }                          
                                }
                
                                console.log("Row:",getRow,"Type:",typeof(getRow));
                                console.log("Col",getCol,"Type:",typeof(getCol));
                                console.log(document.getElementById(toString(grid[getRow][getCol])));

                            // all moves in the down positive diagonal
    
                            for(var j = getCol +1, i = getRow+1; j<8 && i<8 ; j++, i++){ 
                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }

                            }

                            // all moves in the up positive diagonal
                            for(var j = getCol -1, i = getRow+1; j>-1 && i<8 ; j--, i++){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }


                            // all moves in the up negative diagonal
                            for(var j = getCol -1, i = getRow-1; j>-1 && i>-1 ; j--, i--){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }

                            // all moves in the down negative diagonal
                            for(var j = getCol +1, i = getRow-1; j<8 && i>-1 ; j++, i--){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    MoveableTiles.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }  

                        }

                            // Deleting moveable tiles if they are not legal moves
                            for(let n = 0; n<blackPieceMap.length;n++){

                                if(blackPieceMap[n].name === CurrentPiece){

                                    for(let x = 0;x<MoveableTiles.length;x++){

                                        if(blackPieceMap[n].moveList.includes(  MoveableTiles[x]  ) === false){

                                            MoveableTiles.splice(x,1);

                                        }

                                    }

                                }

                            }
    
                        // Color coding moveable tiles
                        for (var n=0; n < MoveableTiles.length; n++){
    
                            console.log(MoveableTiles);

                            if (parseInt(MoveableTiles[n]) <= 0){
                                MoveableTiles.splice(n,1);
                            }
    
                            if (parseInt(MoveableTiles[n]) > 64){
                                MoveableTiles.splice(n,1);
                            }
                            try {
                                document.getElementById(MoveableTiles[n]).style="background-color:#FFE433";
                            } catch {
                                console.error();
                            }
    
                            try {
                                document.getElementById(MoveableTiles[n]).parentElement.style="background-color:#FFE433";
                            } catch {
                                console.error();
                            }
                        }
    

    
                    } else if ((isSelected===true) && (MoveableTiles.includes(parseInt(evt.target.id || evt.target.parentElement.id)))){

                        // Drawing piece based on class
                        if (MoveableTiles.includes(parseInt(evt.target.id))){
                            document.getElementById((evt.target.id)).firstChild.setAttribute("id",CurrentPiece);
                            document.getElementById((evt.target.id)).firstChild.setAttribute("className","piece");
                            
                            if (["bPawn1","bPawn2","bPawn3","bPawn4","bPawn5","bPawn6","bPawn7","bPawn8"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).firstChild.innerHTML = "&#9823";
                                prevBlackPawnPosition = parseInt(currentTile.id);
                                curBlackPawnPosition = parseInt(evt.target.id);


                                if(((prevWhitePawnPosition - curWhitePawnPosition) === 16) && ( ["wPawn1","wPawn2","wPawn3","wPawn4","wPawn5","wPawn6","wPawn7","wPawn8"].includes(document.getElementById(parseInt(evt.target.id)-8).firstChild.id ))){
                                    document.getElementById(parseInt(evt.target.id)-8).firstChild.textContent ="";
                                    document.getElementById(parseInt(evt.target.id)-8).firstChild.setAttribute("id","");
                                }

                                // Promotion check
                                if([57,58,59,60,61,62,63,64].includes(curBlackPawnPosition)){
                                    PawnPromotionAllowed = true;
                                    console.log(PawnPromotionAllowed);
                                }

                            } else if (["bRook1","bRook2","bRook3","bRook4","bRook5","bRook6","bRook7","bRook8","bRook9","bRook10"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).firstChild.innerHTML = "&#9820";
                            } else if (["bKnight1","bKnight2","bKnight3","bKnight4","bKnight5","bKnight6","bKnight7","bKnight8","bKnight9","bKnight10"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).firstChild.innerHTML = "&#9822";
                            } else if (["bBishop1","bBishop2","bBishop3","bBishop4","bBishop5","bBishop6","bBishop7","bBishop8","bBishop9","bBishop10"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).firstChild.innerHTML = "&#9821";
                            } else if (["bKing"].includes(CurrentPiece)){

                                prevBlackKingPosition = parseInt(currentTile.id);
                                curBlackKingPosition = parseInt(evt.target.id);

                                console.log("previous black king positon:", prevBlackKingPosition);
                                console.log("current black king positon:", curBlackKingPosition);
                                //Castling
                                if(((curBlackKingPosition - prevBlackKingPosition) === 2) && (bCastleTriggerKingSide === true)){

                                    document.getElementById(parseInt(evt.target.id)).firstChild.innerHTML = "&#9818";
                                    document.getElementById(parseInt(evt.target.id)-1).firstChild.innerHTML = "&#9820";

                                    document.getElementById(parseInt(evt.target.id)-1).firstChild.setAttribute("id","bRook2");
                                    document.getElementById(parseInt(evt.target.id)-1).firstChild.setAttribute("className","piece");

                                    document.getElementById(parseInt(evt.target.id)+1).firstChild.textContent ="";
                                    document.getElementById(parseInt(evt.target.id)+1).firstChild.setAttribute("id","");
                                    
                                    bKingHasMoved = true;
                                    bRook2HasMoved = true;
                                    bCastleTriggerKingSide = false;
                                } else if (((prevBlackKingPosition-curBlackKingPosition)=== 2) && (bCastleTriggerQueenSide === true)){

                                    document.getElementById(parseInt(evt.target.id)).firstChild.innerHTML = "&#9818";
                                    document.getElementById(parseInt(evt.target.id)+1).firstChild.innerHTML = "&#9820";

                                    document.getElementById(parseInt(evt.target.id)+1).firstChild.setAttribute("id","bRook1");
                                    document.getElementById(parseInt(evt.target.id)+1).firstChild.setAttribute("className","piece");

                                    document.getElementById(parseInt(evt.target.id)-2).firstChild.textContent ="";
                                    document.getElementById(parseInt(evt.target.id)-2).firstChild.setAttribute("id","");
                                    
                                    bKingHasMoved = true;
                                    bRook1HasMoved = true;

                                    bCastleTriggerQueenSide = false;
                                } else {
                                    document.getElementById(parseInt(evt.target.id)).firstChild.innerHTML = "&#9818";
                                    bKingHasMoved = true;    
                                }
                            } else if (["bQueen1","bQueen2","bQueen3","bQueen4","bQueen5","bQueen6","bQueen7","bQueen8","bQueen9"].includes(CurrentPiece)){
                                // document.getElementById((evt.target.id)).firstElementChild.innerHTML = "&#9819";
                                document.getElementById((evt.target.id)).firstChild.innerHTML = "&#9819";
                            }
                        } else if (MoveableTiles.includes(parseInt(evt.target.parentElement.id))){
                            document.getElementById((evt.target.id)).setAttribute("id",CurrentPiece);
                            document.getElementById((evt.target.id)).setAttribute("className","piece");
                            
                            if (["bPawn1","bPawn2","bPawn3","bPawn4","bPawn5","bPawn6","bPawn7","bPawn8"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).innerHTML = "&#9823";
                                prevBlackPawnPosition = parseInt(currentTile.id);
                                curBlackPawnPosition = parseInt(evt.target.id);



                                if(((prevWhitePawnPosition - curWhitePawnPosition) === 16) && ( ["wPawn1","wPawn2","wPawn3","wPawn4","wPawn5","wPawn6","wPawn7","wPawn8"].includes(document.getElementById(parseInt(evt.target.id)-8).firstChild.id ))){
                                    document.getElementById(parseInt(evt.target.id)-8).firstChild.textContent ="";
                                    document.getElementById(parseInt(evt.target.id)-8).firstChild.setAttribute("id","");
                                }

                                // Promotion check
                                if([57,58,59,60,61,62,63,64].includes(curBlackPawnPosition)){
                                    PawnPromotionAllowed = true;
                                    console.log(PawnPromotionAllowed);
                                }

                            } else if (["bRook1","bRook2","bRook3","bRook4","bRook5","bRook6","bRook7","bRook8","bRook9","bRook10"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).innerHTML = "&#9820";
                            } else if (["bKnight1","bKnight2","bKnight3","bKnight4","bKnight5","bKnight6","bKnight7","bKnight8","bKnight9","bKnight10"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).innerHTML = "&#9822";
                            } else if (["bBishop1","bBishop2","bBishop3","bBishop4","bBishop5","bBishop6","bBishop7","bBishop8","bBishop9","bBishop10"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).innerHTML = "&#9821";
                            } else if (["bKing"].includes(CurrentPiece)){
//Castling
                                if(((curBlackKingPosition - prevBlackKingPosition) === 2) && (bCastleTriggerKingSide === true)){

                                    document.getElementById(parseInt(evt.target.id)).innerHTML = "&#9818";
                                    document.getElementById(parseInt(evt.target.id)-1).innerHTML = "&#9820";

                                    document.getElementById(parseInt(evt.target.id)-1).setAttribute("id","bRook2");
                                    document.getElementById(parseInt(evt.target.id)-1).setAttribute("className","piece");

                                    document.getElementById(parseInt(evt.target.id)+1).textContent ="";
                                    document.getElementById(parseInt(evt.target.id)+1).setAttribute("id","");
                                    
                                    bKingHasMoved = true;
                                    bRook2HasMoved = true;
                                    bCastleTriggerKingSide = false;
                                } else if (((prevBlackKingPosition-curBlackKingPosition)=== 2) && (bCastleTriggerQueenSide === true)){

                                    document.getElementById(parseInt(evt.target.id)).innerHTML = "&#9818";
                                    document.getElementById(parseInt(evt.target.id)+1).innerHTML = "&#9820";

                                    document.getElementById(parseInt(evt.target.id)+1).setAttribute("id","bRook1");
                                    document.getElementById(parseInt(evt.target.id)+1).setAttribute("className","piece");

                                    document.getElementById(parseInt(evt.target.id)-2).textContent ="";
                                    document.getElementById(parseInt(evt.target.id)-2).setAttribute("id","");
                                    
                                    bKingHasMoved = true;
                                    bRook1HasMoved = true;

                                    bCastleTriggerQueenSide = false;
                                } else {
                                    document.getElementById(parseInt(evt.target.id)).innerHTML = "&#9818";
                                    bKingHasMoved = true;    
                                }
                            } else if (["bQueen"].includes(CurrentPiece)){
                                document.getElementById((evt.target.id)).innerHTML = "&#9819";
                            }
                        }
    
                        currentTile.firstChild.textContent = "";
                        currentTile.firstChild.setAttribute("id","");
    
                        for (var n =0; n < MoveableTiles.length; n++){
    
                            if ((document.getElementById(parseInt(MoveableTiles[n]))).className === "white") {
                                document.getElementById(parseInt(MoveableTiles[n])).style.backgroundColor = "#eeeed2";
                            } else if ((document.getElementById(parseInt(MoveableTiles[n]))).className === "black"){
                                document.getElementById(parseInt(MoveableTiles[n])).style.backgroundColor = "#769656";
                            }
                        }
                        
                        MoveableTiles = [];
                        CapturableTiles = [];
                        isWhiteTurn = true;
                        isSelected = false;
                        
                    } else if ((isSelected === true) && !(MoveableTiles.includes(parseInt(evt.target.id || evt.target.parentElement.id)))){
    
                        for (var n =0; n < MoveableTiles.length; n++){
    
    
                            if ((document.getElementById(MoveableTiles[n])).className === "white") {
                                document.getElementById(MoveableTiles[n]).style.backgroundColor = "#eeeed2";
                            } else if ((document.getElementById(MoveableTiles[n])).className === "black"){
                                document.getElementById(MoveableTiles[n]).style.backgroundColor = "#769656";
                            }  
                        }
    
                        MoveableTiles = [];
                        CapturableTiles = [];
                        isSelected = false;
        }

}   
            

        }

           // Pawn promotion
           if (PawnPromotionAllowed === true){
            console.log("Promotion available!");

            Modal2.className="modal2-active";
            // Popup message
            Modal2.textContent="Promote your pawn to:"
            
            //Button selection

            // Queen promotion function
            QueenButton = document.createElement("button");
            QueenButton.textContent="Queen"
            QueenButton.className="promotion-button"
            QueenButton.onclick = function() {QueenPromotion()};

            Modal2.appendChild(QueenButton);


            // Knight promotion function
            KnightButton = document.createElement("button");
            KnightButton.textContent="Knight"
            KnightButton.className="promotion-button"
            KnightButton.onclick = function() {KnightPromotion()};


            Modal2.appendChild(KnightButton);


            // Bishop promotion function
            BishopButton = document.createElement("button");
            BishopButton.textContent="Bishop"
            BishopButton.className="promotion-button"
            BishopButton.onclick = function() {BishopPromotion()};


            Modal2.appendChild(BishopButton);


            // Rook promotion function
            RookButton = document.createElement("button");
            RookButton.textContent="Rook"
            RookButton.className="promotion-button"
            RookButton.onclick = function() {RookPromotion()};

            Modal2.appendChild(RookButton);

            // Modal2.append(wBishopButton,wRookButton,wQueenButton, wKnightButton);

            Modal1.className="modal1-active";
            console.log(Modal2.className);
            console.log(Modal1.className);
        } else {
            if ([KnightButton,QueenButton,RookButton,BishopButton].includes(document.getElementsByClassName("promotion-button"))) {
                Modal2.removeChild(KnightButton);
                Modal2.removeChild(QueenButton);
                Modal2.removeChild(RookButton);
                Modal2.removeChild(BishopButton);
            }

            Modal2.className="modal2-inactive";
            Modal1.className="modal1-inactive";
        }

                             // promotion function setup
                             function QueenPromotion(){
                                Modal2.removeChild(Modal2.firstChild);
                                Modal2.appendChild(Modal1);

                                if(isWhiteTurn === false){
                                wQueenPromotionNumber++;
                                document.getElementById(curWhitePawnPosition).firstChild.innerHTML = "&#9813";
                                document.getElementById(curWhitePawnPosition).firstChild.setAttribute("id","wQueen"+(wQueenPromotionNumber));
                                } else if (isWhiteTurn === true){
                                    bQueenPromotionNumber++;
                                    document.getElementById(curBlackPawnPosition).firstChild.innerHTML = "&#9819";
                                    document.getElementById(curBlackPawnPosition).firstChild.setAttribute("id","bQueen"+(bQueenPromotionNumber));
                                }
                                Modal1.className="modal1-inactive";
                                Modal2.className="modal2-inactive";
                                Modal2.removeChild(KnightButton);
                                Modal2.removeChild(QueenButton);
                                Modal2.removeChild(RookButton);
                                Modal2.removeChild(BishopButton);
                                PawnPromotionAllowed = false;
                            }
    
                            function RookPromotion(){
                                Modal2.removeChild(Modal2.firstChild);
                                Modal2.appendChild(Modal1);
                                if(isWhiteTurn === false){
                                    wRookPromotionNumber++;
                                    document.getElementById(curWhitePawnPosition).firstChild.innerHTML = "&#9814";
                                    document.getElementById(curWhitePawnPosition).firstChild.setAttribute("id","wRook"+(wRookPromotionNumber));
                                    } else if (isWhiteTurn === true){
                                        bRookPromotionNumber++;
                                        document.getElementById(curBlackPawnPosition).firstChild.innerHTML = "&#9820";
                                        document.getElementById(curBlackPawnPosition).firstChild.setAttribute("id","bRook"+(bRookPromotionNumber));
                                    }
                                Modal1.className="modal1-inactive";
                                Modal2.className="modal2-inactive";
                                Modal2.removeChild(KnightButton);
                                Modal2.removeChild(QueenButton);
                                Modal2.removeChild(RookButton);
                                Modal2.removeChild(BishopButton);
                                PawnPromotionAllowed = false;
                            }
    
                            function KnightPromotion(){
                                Modal2.removeChild(Modal2.firstChild);
                                Modal2.appendChild(Modal1);
                                if(isWhiteTurn === false){
                                    wKnightPromotionNumber++;
                                    document.getElementById(curWhitePawnPosition).firstChild.innerHTML = "&#9816";
                                    document.getElementById(curWhitePawnPosition).firstChild.setAttribute("id","wKnight"+(wKnightPromotionNumber));
                                    } else if (isWhiteTurn === true){
                                        bKnightPromotionNumber++;
                                        document.getElementById(curBlackPawnPosition).firstChild.innerHTML = "&#9822";
                                        document.getElementById(curBlackPawnPosition).firstChild.setAttribute("id","bKnight"+(bKnightPromotionNumber));
                                    }
                                Modal1.className="modal1-inactive";
                                Modal2.className="modal2-inactive";
                                Modal2.removeChild(KnightButton);
                                Modal2.removeChild(QueenButton);
                                Modal2.removeChild(RookButton);
                                Modal2.removeChild(BishopButton);
                                PawnPromotionAllowed = false;
                            }
    
                            function BishopPromotion(){
                                Modal2.removeChild(Modal2.firstChild);
                                Modal2.appendChild(Modal1);
                                if(isWhiteTurn === false){
                                    wBishopPromotionNumber++;
                                    document.getElementById(curWhitePawnPosition).firstChild.innerHTML = "&#9815";
                                    document.getElementById(curWhitePawnPosition).firstChild.setAttribute("id","wBishop"+(wBishopPromotionNumber));
                                    } else if (isWhiteTurn === true){
                                        bBishopPromotionNumber++;
                                        document.getElementById(curBlackPawnPosition).firstChild.innerHTML = "&#9821";
                                        document.getElementById(curBlackPawnPosition).firstChild.setAttribute("id","bBishop"+(bBishopPromotionNumber));
                                    }
                                Modal1.className="modal1-inactive";
                                Modal2.className="modal2-inactive";
                                Modal2.removeChild(KnightButton);
                                Modal2.removeChild(QueenButton);
                                Modal2.removeChild(RookButton);
                                Modal2.removeChild(BishopButton);
                                PawnPromotionAllowed = false;
                            }

                            
                            // Threat Mapping for black pieces

                            // Emptying the array for every iteration of the program

                            /*
                            for(var z = 0;z<blackPieceMap.length; z++){
                                blackPieceMap[z].name = "";
                                blackPieceMap[z].move;
                            } 
                            */

                            blackPieceMap = [];

                                    // Calculating all living black pieces on chessboard
                                    for(var i = 0; i< grid.length; i++){
                                        for(var j = 0; j<grid[i].length; j++){
                                            if(     (document.getElementById((grid[i][j])).firstChild.id).startsWith("b")    ){
                                                blackPieceMap.push({ name: (document.getElementById((grid[i][j])).firstChild.id), moveList: [] }); 

                                        }
                                    }
                                }
                                    console.log(blackPieceMap);


                 
                                    // Adding all living black pieces's possible movement tiles on threat map list
                                    for(var z =0; z < blackPieceMap.length;z++){
                                        
                                        
                                        console.log(blackPieceMap[z].name);
                                        console.log(blackPieceMap[z], typeof(blackPieceMap[z]));
                                        CurrentTileInBlackPieceMap = parseInt( (document.getElementById((blackPieceMap[z].name))).parentElement.id);
                                        CurrentPieceInBlackPieceMap = (blackPieceMap[z].name);

                                        
                                        
                                        
                                        // Queen moveable tiles addded
                                        
                        if (["bQueen1","bQueen2","bQueen3","bQueen4","bQueen5","bQueen6","bQueen7","bQueen8","bQueen9"].includes(CurrentPieceInBlackPieceMap)){

    // getting row and column position
    for(var i = 0; i < grid_row_length; i++){
        for(var j = 0; j < grid_col_length; j++){
            if(grid[i][j].includes( parseInt(CurrentTileInBlackPieceMap)     )){
                getRow = i;
                console.log(getRow);
                getCol = j;
                console.log(getCol);
                }
                }                          
                }
                
                            // all moves in the down positive diagonal
    
                            for(var j = getCol +1, i = getRow+1; j<8 && i<8 ; j++, i++){
                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    blackPieceMap[z].moveList.push( parseInt(document.getElementById((grid[i][j])).id) );
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    // blackPieceMap[z].push(parseInt(document.getElementById((grid[i][j])).id));
                                    blackPieceMap[z].moveList.push(   parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }

                            }

                            // all moves in the up positive diagonal
                            for(var j = getCol -1, i = getRow+1; j>-1 && i<8 ; j--, i++){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    blackPieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    blackPieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }


                            // all moves in the up negative diagonal
                            for(var j = getCol -1, i = getRow-1; j>-1 && i>-1 ; j--, i--){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    blackPieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    blackPieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }

                            // all moves in the down negative diagonal
                            for(var j = getCol +1, i = getRow-1; j<8 && i>-1 ; j++, i--){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    blackPieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    blackPieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }  

// all possible moves up
for(var n = parseInt(CurrentTileInBlackPieceMap) - 8;n > 0 ;n=n-8){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);


    if(document.getElementById(n).firstChild.id === ""){
        blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
        continue;
    } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
        blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
        break;
    } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
        break;
    }
}


// all possible moves down
for(var n = parseInt(CurrentTileInBlackPieceMap) + 8;n < 65 ;n=n+8){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

    if(document.getElementById(n).firstChild.id === ""){
        blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
        continue;
    } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
        blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
        break;
    } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
        break;
    }
}

// all possible moves right
for(var n = parseInt(CurrentTileInBlackPieceMap) + 1;n <= grid[getRow][7] ;n=n+1){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);
    
                
                if(document.getElementById(n).firstChild.id === ""){
                    blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
                    continue;
                  
                } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
                    blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
                    break;
                } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
                    break;
                } 

}




// all possible moves left
for(var n = parseInt(CurrentTileInBlackPieceMap) - 1;n >= grid[getRow][0] ;n=n-1){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);


                
    if(document.getElementById(n).firstChild.id === ""){
        blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
        continue;
      
    } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
        blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
        break;
    } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
        break;
    } 


}                               
                         

    }

    // Rook movement
    if (["bRook1","bRook2","bRook3","bRook4","bRook5","bRook6","bRook7","bRook8","bRook9","bRook10"].includes(CurrentPieceInBlackPieceMap)){

    // getting row and column position
    for(var i = 0; i < grid_row_length; i++){
    for(var j = 0; j < grid_col_length; j++){
        if(grid[i][j].includes(parseInt(CurrentTileInBlackPieceMap))){
            getRow = i;
            console.log(getRow);
            getCol = j;
            console.log(getCol);
            }
            }                          
            }

    // all possible moves up
for(var n = parseInt(CurrentTileInBlackPieceMap) - 8;n > 0 ;n=n-8){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

    if(document.getElementById(n).firstChild.id === ""){
        blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
        continue;
    } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
        blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
        break;
    } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
        break;
    }
}


// all possible moves down
for(var n = parseInt(CurrentTileInBlackPieceMap) + 8;n < 65 ;n=n+8){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

    if(document.getElementById(n).firstChild.id === ""){
        blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
        continue;
    } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
        blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
        break;
    } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
        break;
    }
}

// all possible moves right
for(var n = parseInt(CurrentTileInBlackPieceMap) + 1;n <= grid[getRow][7] ;n=n+1){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);
    
                
                if(document.getElementById(n).firstChild.id === ""){
                    blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
                    continue;
                  
                } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
                    blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
                    break;
                } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
                    break;
                } 

}




// all possible moves left
for(var n = parseInt(CurrentTileInBlackPieceMap) - 1;n >= grid[getRow][0] ;n=n-1){
    console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);


                
    if(document.getElementById(n).firstChild.id === ""){
        blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
        continue;
      
    } else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
        blackPieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
        break;
    } else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
        break;
    } 


}  
                                    }

    // Knight movement
     
    if(["bKnight1","bKnight2","bKnight3","bKnight4","bKnight5","bKnight6","bKnight7","bKnight8","bKnight9","bKnight10"].includes(CurrentPieceInBlackPieceMap)){
        // getting row and column position
        for(var i = 0; i < grid_row_length; i++){
           for(var j = 0; j < grid_col_length; j++){
               if(grid[i][j].includes(parseInt(CurrentTileInBlackPieceMap))){
                   getRow = i;
                   console.log("row:",getRow);
                   getCol = j;
                   console.log("col:",getCol);
               }
           }                          
       }


       

offset = [-17,17,-15, 15,-6,6,-10,10];

// Removing out-of-border tiles
if(([8,16,24,32,40,48,56,64]).includes(parseInt(CurrentTileInBlackPieceMap))){
offset.splice(offset.indexOf(17),1);
offset.splice(offset.indexOf(-15),1);
offset.splice(offset.indexOf(-6),1);
offset.splice(offset.indexOf(10),1);
}

if(([7,15,23,31,39,47,55,63]).includes(parseInt(CurrentTileInBlackPieceMap))){
offset.splice(offset.indexOf(-6),1);
offset.splice(offset.indexOf(10),1);
}


if(([1,9,17,25,33,41,49,57]).includes(parseInt(CurrentTileInBlackPieceMap))){
offset.splice(offset.indexOf(-17),1);
offset.splice(offset.indexOf(15),1);
offset.splice(offset.indexOf(6),1);
offset.splice(offset.indexOf(-10),1);
}

if(([2,10,18,26,34,42,50,58]).includes(parseInt(CurrentTileInBlackPieceMap))){
offset.splice(offset.indexOf(6),1);
offset.splice(offset.indexOf(-10),1);
}                            

for(var i in offset){
console.log("i",i);
console.log("j",i);
console.log("offset pos",offset[i]);

if(((parseInt(CurrentTileInBlackPieceMap) + offset[i]) > 64) || ((parseInt(CurrentTileInBlackPieceMap) + offset[i]) < 1)){
continue;
}

if((document.getElementById(parseInt(CurrentTileInBlackPieceMap) + offset[i]).firstChild.id === "") || (WhitePieces.includes(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + offset[i]).firstChild.id))){
    blackPieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + offset[i]).id));
continue;
} else if (BlackPieces.includes(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + offset[i]).firstChild.id)){
continue;
}
}

offset = [];
}

    // Bishop movement
    if(["bBishop1","bBishop2","bBishop3","bBishop4","bBishop5","bBishop6","bBishop7","bBishop8","bBishop9","bBishop10"].includes(CurrentPieceInBlackPieceMap)){

    // getting row and column position
    for(var i = 0; i < grid_row_length; i++){
        for(var j = 0; j < grid_col_length; j++){
            if(grid[i][j].includes( parseInt(CurrentTileInBlackPieceMap)     )){
                getRow = i;
                console.log(getRow);
                getCol = j;
                console.log(getCol);
                }
                }                          
                }
                
                            // all moves in the down positive diagonal
    
                            for(var j = getCol +1, i = getRow+1; j<8 && i<8 ; j++, i++){
                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    blackPieceMap[z].moveList.push( parseInt(document.getElementById((grid[i][j])).id) );
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    // blackPieceMap[z].push(parseInt(document.getElementById((grid[i][j])).id));
                                    blackPieceMap[z].moveList.push(   parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }

                            }

                            // all moves in the up positive diagonal
                            for(var j = getCol -1, i = getRow+1; j>-1 && i<8 ; j--, i++){

                                if(document.getElementById((grid[i][j])).firstChild.id === ""){
                                    blackPieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
                                    continue;
                                } else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    blackPieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
                                    break;
                                } else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
                                    break;
                                }
                            }

    }

    // Pawn movement
                            if (["bPawn1","bPawn2","bPawn3","bPawn4","bPawn5","bPawn6","bPawn7","bPawn8"].includes(CurrentPieceInBlackPieceMap) === true){

                                // getting row and column position
                               for(var i = 0; i < grid_row_length; i++){
                                   for(var j = 0; j < grid_col_length; j++){
                                       if(grid[i][j].includes(parseInt(CurrentTileInBlackPieceMap))){
                                           getRow = i;
                                           console.log(getRow);
                                           getCol = j;
                                           console.log(getCol);
                                       }
                                   }                          
                               }
   
                               if((parseInt(CurrentTileInBlackPieceMap) + 8) < 65){
                               if(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + 8).firstChild.id === ""){
                                   blackPieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + 8).id));
                               }
                           }
   
                               if((parseInt(CurrentTileInBlackPieceMap) + 16) < 65){
                                   if((document.getElementById(parseInt(CurrentTileInBlackPieceMap) + 16).firstChild.id === "") && ([9,10,11,12,13,14,15,16].includes(parseInt(CurrentTileInBlackPieceMap)))){
                                       blackPieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + 16).id));
                                   }
                               }
   
                               if((parseInt(CurrentTileInBlackPieceMap) + 9) < 65){
                               if((WhitePieces.includes(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + 9).firstChild.id) && ([8,16,24,32,40,48,56,64].includes(parseInt(CurrentTileInBlackPieceMap)) === false) )){
                                   blackPieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + 9).id)); 
                               }
   
                               // En passent
                               if(([8,16,24,32,40,48,56,64].includes(parseInt(CurrentTileInBlackPieceMap)) === false) && ((prevWhitePawnPosition - curWhitePawnPosition) === 16) && (["wPawn1","wPawn2","wPawn3","wPawn4","wPawn5","wPawn6","wPawn7","wPawn8"].includes(document.getElementById(parseInt(CurrentTileInBlackPieceMap)+1).firstChild.id) ) && ([8,16,24,32,40,48,56,64].includes(parseInt(CurrentTileInBlackPieceMap)) === false)){
                                   blackPieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + 9).id)); 
                               }
                           }
   
                           if((parseInt(CurrentTileInBlackPieceMap) + 7) < 65){
                               if((WhitePieces.includes(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + 7).firstChild.id) && ([1,9,17,25,33,41,49,57].includes(parseInt(CurrentTileInBlackPieceMap)) === false) )){
                                   blackPieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + 7).id)); 
                               }
   
                               // En passent
                               if(([1,9,17,25,33,41,49,57].includes(parseInt(CurrentTileInBlackPieceMap)) === false) && ((prevWhitePawnPosition - curWhitePawnPosition) === 16) && (["wPawn1","wPawn2","wPawn3","wPawn4","wPawn5","wPawn6","wPawn7","wPawn8"].includes(document.getElementById(parseInt(CurrentTileInBlackPieceMap)-1).firstChild.id) ) && ([1,9,17,25,33,41,49,57].includes(parseInt(CurrentTileInBlackPieceMap)) === false)){
                                   blackPieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + 7).id)); 
                               }
                           }
                           }
     
    // King movement
    if((["bKing"]).includes(CurrentPieceInBlackPieceMap)){

        // getting row and column position
        for(var i = 0; i < grid_row_length; i++){
            for(var j = 0; j < grid_col_length; j++){
                if(grid[i][j].includes(parseInt(CurrentTileInBlackPieceMap))){
                    getRow = i;
                    console.log("row:",getRow);
                    getCol = j;
                    console.log("col:",getCol);
                    console.log(parseInt(grid[getRow][getCol]), typeof(parseInt(grid[getRow][getCol])))
                }
                }                              
                }


                                    

            offset = [-1,1,-8, 8, -9,9,-7,7];

            console.log(offset);

            // Removing out-of-border tiles
            if(([8,16,24,32,40,48,56,64]).includes(parseInt(CurrentTileInBlackPieceMap))){
                offset.splice(offset.indexOf(1),1);
                offset.splice(offset.indexOf(9),1);
                offset.splice(offset.indexOf(-7),1);
            }
                                            
            if(([1,9,17,25,33,41,49,57]).includes(parseInt(CurrentTileInBlackPieceMap))){
                offset.splice(offset.indexOf(-1),1);
                offset.splice(offset.indexOf(-9),1);
                offset.splice(offset.indexOf(7),1);
            }

            for(var i in offset){
                console.log("i",i);
                console.log("j",i);
                console.log("offset pos",offset[i]);
                console.log(parseInt(CurrentTileInBlackPieceMap) + offset[i]);  
                console.log(offset[i],typeof(offset[i]));
                console.log(CurrentTileInBlackPieceMap + offset[i], typeof(CurrentTileInBlackPieceMap + offset[i]));
                console.log(document.getElementById(CurrentTileInBlackPieceMap + offset[i]), typeof(document.getElementById(CurrentTileInBlackPieceMap + offset[i])));

                if( ((parseInt(CurrentTileInBlackPieceMap) + offset[i]) > 64) || ((parseInt(CurrentTileInBlackPieceMap) + offset[i]) < 1)){
                    continue;
                }

                if(( document.getElementById( parseInt(CurrentTileInBlackPieceMap) + offset[i] ).firstChild.id === "") ){
                    blackPieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + offset[i]).id));
                    continue;
                } else if ((WhitePieces.includes(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + offset[i]).firstChild.id))){
                    blackPieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + offset[i]).id));
                    continue;
                } else if (BlackPieces.includes(document.getElementById(parseInt(CurrentTileInBlackPieceMap) + offset[i]).firstChild.id)){
                    continue;
                }

        }


        offset=[];


        // Castling - king side
        if((bKingHasMoved === false) && (bRook2HasMoved === false) && 
        ( document.getElementById(parseInt( document.getElementById(CurrentPieceInBlackPieceMap).parentElement.id)+1).firstChild.id === "") && 
        ( document.getElementById(parseInt( document.getElementById(CurrentPieceInBlackPieceMap).parentElement.id)+2).firstChild.id === "")){
            blackPieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInBlackPieceMap)+2).id));
        } 

        // Castling - queen side
        if((bKingHasMoved === false) && (bRook1HasMoved === false) && 
        (document.getElementById(parseInt( document.getElementById(CurrentPieceInBlackPieceMap).parentElement.id)-1).firstChild.id === "") && 
        (document.getElementById(parseInt( document.getElementById(CurrentPieceInBlackPieceMap).parentElement.id)-2).firstChild.id === "") && 
        (document.getElementById(parseInt( document.getElementById(CurrentPieceInBlackPieceMap).parentElement.id)-3).firstChild.id === "")){
            blackPieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInBlackPieceMap)-2).id));
        } 
        }
    





                                  
    }

    whitePieceMap = [];

    // Calculating all living white pieces on chessboard
    for(var i = 0; i< grid.length; i++){
        for(var j = 0; j<grid[i].length; j++){
            if(     (document.getElementById((grid[i][j])).firstChild.id).startsWith("w")    ){
                whitePieceMap.push({ name: (document.getElementById((grid[i][j])).firstChild.id), moveList: [] }); 

        }
    }
}
    console.log(whitePieceMap);



    // Adding all living white pieces's possible movement tiles on threat map list
    for(var z =0; z < whitePieceMap.length;z++){
        
        
        console.log(whitePieceMap[z].name);
        console.log(whitePieceMap[z], typeof(whitePieceMap[z]));
        CurrentTileInWhitePieceMap = parseInt( (document.getElementById((whitePieceMap[z].name))).parentElement.id);
        CurrentPieceInWhitePieceMap = (whitePieceMap[z].name);

        
        
        
        // Queen moveable tiles addded
        
if (["wQueen1","wQueen2","wQueen3","wQueen4","wQueen5","wQueen6","wQueen7","wQueen8","wQueen9"].includes(CurrentPieceInWhitePieceMap)){

// getting row and column position
for(var i = 0; i < grid_row_length; i++){
for(var j = 0; j < grid_col_length; j++){
if(grid[i][j].includes( parseInt(CurrentTileInWhitePieceMap)     )){
getRow = i;
console.log(getRow);
getCol = j;
console.log(getCol);
}
}                          
}

// all moves in the down positive diagonal

for(var j = getCol +1, i = getRow+1; j<8 && i<8 ; j++, i++){
if(document.getElementById((grid[i][j])).firstChild.id === ""){
    whitePieceMap[z].moveList.push( parseInt(document.getElementById((grid[i][j])).id) );
    continue;
} else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
    // blackPieceMap[z].push(parseInt(document.getElementById((grid[i][j])).id));
    whitePieceMap[z].moveList.push(   parseInt(document.getElementById((grid[i][j])).id));
    break;
} else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
    break;
}

}

// all moves in the up positive diagonal
for(var j = getCol -1, i = getRow+1; j>-1 && i<8 ; j--, i++){

if(document.getElementById((grid[i][j])).firstChild.id === ""){
    whitePieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
    continue;
} else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
    whitePieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
    break;
} else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
    break;
}
}


// all moves in the up negative diagonal
for(var j = getCol -1, i = getRow-1; j>-1 && i>-1 ; j--, i--){

if(document.getElementById((grid[i][j])).firstChild.id === ""){
    whitePieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
    continue;
} else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
    whitePieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
    break;
} else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
    break;
}
}

// all moves in the down negative diagonal
for(var j = getCol +1, i = getRow-1; j<8 && i>-1 ; j++, i--){

if(document.getElementById((grid[i][j])).firstChild.id === ""){
    whitePieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
    continue;
} else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
    whitePieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
    break;
} else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
    break;
}
}  

// all possible moves up
for(var n = parseInt(CurrentTileInWhitePieceMap) - 8;n > 0 ;n=n-8){
console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);


if(document.getElementById(n).firstChild.id === ""){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
continue;
} else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
break;
} else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
break;
}
}


// all possible moves down
for(var n = parseInt(CurrentTileInWhitePieceMap) + 8;n < 65 ;n=n+8){
console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

if(document.getElementById(n).firstChild.id === ""){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
continue;
} else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
break;
} else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
break;
}
}

// all possible moves right
for(var n = parseInt(CurrentTileInWhitePieceMap) + 1;n <= grid[getRow][7] ;n=n+1){
console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);


if(document.getElementById(n).firstChild.id === ""){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
continue;

} else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
break;
} else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
break;
} 

}




// all possible moves left
for(var n = parseInt(CurrentTileInWhitePieceMap) - 1;n >= grid[getRow][0] ;n=n-1){
console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);



if(document.getElementById(n).firstChild.id === ""){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
continue;

} else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
break;
} else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
break;
} 


}                               


}

// Rook movement
if (["wRook1","wRook2","wRook3","wRook4","wRook5","wRook6","wRook7","wRook8","wRook9","wRook10"].includes(CurrentPieceInWhitePieceMap)){

// getting row and column position
for(var i = 0; i < grid_row_length; i++){
for(var j = 0; j < grid_col_length; j++){
if(grid[i][j].includes(parseInt(CurrentTileInWhitePieceMap))){
getRow = i;
console.log(getRow);
getCol = j;
console.log(getCol);
}
}                          
}

// all possible moves up
for(var n = parseInt(CurrentTileInWhitePieceMap) - 8;n > 0 ;n=n-8){
console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

if(document.getElementById(n).firstChild.id === ""){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
continue;
} else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
break;
} else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
break;
}
}


// all possible moves down
for(var n = parseInt(CurrentTileInWhitePieceMap) + 8;n < 65 ;n=n+8){
console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);

if(document.getElementById(n).firstChild.id === ""){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
continue;
} else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
break;
} else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
break;
}
}

// all possible moves right
for(var n = parseInt(CurrentTileInWhitePieceMap) + 1;n <= grid[getRow][7] ;n=n+1){
console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);


if(document.getElementById(n).firstChild.id === ""){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
continue;

} else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
break;
} else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
break;
} 

}




// all possible moves left
for(var n = parseInt(CurrentTileInWhitePieceMap) - 1;n >= grid[getRow][0] ;n=n-1){
console.log(document.getElementById(n).firstChild, document.getElementById(n).firstChild.id);



if(document.getElementById(n).firstChild.id === ""){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
continue;

} else if (BlackPieces.includes(document.getElementById(n).firstChild.id)){
whitePieceMap[z].moveList.push(parseInt(    document.getElementById(n).id    ));
break;
} else if (WhitePieces.includes(document.getElementById(n).firstChild.id)){
break;
} 


}  
    }

// Knight movement

if(["wKnight1","wKnight2","wKnight3","wKnight4","wKnight5","wKnight6","wKnight7","wKnight8","wKnight9","wKnight10"].includes(CurrentPieceInWhitePieceMap)){
// getting row and column position
for(var i = 0; i < grid_row_length; i++){
for(var j = 0; j < grid_col_length; j++){
if(grid[i][j].includes(parseInt(CurrentTileInWhitePieceMap))){
getRow = i;
console.log("row:",getRow);
getCol = j;
console.log("col:",getCol);
}
}                          
}




offset = [-17,17,-15, 15,-6,6,-10,10];

// Removing out-of-border tiles
if(([8,16,24,32,40,48,56,64]).includes(parseInt(CurrentTileInWhitePieceMap))){
offset.splice(offset.indexOf(17),1);
offset.splice(offset.indexOf(-15),1);
offset.splice(offset.indexOf(-6),1);
offset.splice(offset.indexOf(10),1);
}

if(([7,15,23,31,39,47,55,63]).includes(parseInt(CurrentTileInWhitePieceMap))){
offset.splice(offset.indexOf(-6),1);
offset.splice(offset.indexOf(10),1);
}


if(([1,9,17,25,33,41,49,57]).includes(parseInt(CurrentTileInWhitePieceMap))){
offset.splice(offset.indexOf(-17),1);
offset.splice(offset.indexOf(15),1);
offset.splice(offset.indexOf(6),1);
offset.splice(offset.indexOf(-10),1);
}

if(([2,10,18,26,34,42,50,58]).includes(parseInt(CurrentTileInWhitePieceMap))){
offset.splice(offset.indexOf(6),1);
offset.splice(offset.indexOf(-10),1);
}                            

for(var i in offset){
console.log("i",i);
console.log("j",i);
console.log("offset pos",offset[i]);

if(((parseInt(CurrentTileInWhitePieceMap) + offset[i]) > 64) || ((parseInt(CurrentTileInWhitePieceMap) + offset[i]) < 1)){
continue;
}

if((document.getElementById(parseInt(CurrentTileInWhitePieceMap) + offset[i]).firstChild.id === "") || (BlackPieces.includes(document.getElementById(parseInt(CurrentTileInWhitePieceMap) + offset[i]).firstChild.id))){
whitePieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInWhitePieceMap) + offset[i]).id));
continue;
} else if (WhitePieces.includes(document.getElementById(parseInt(CurrentTileInWhitePieceMap) + offset[i]).firstChild.id)){
continue;
}
}

offset = [];
}

// Bishop movement
if(["wBishop1","wBishop2","wBishop3","wBishop4","wBishop5","wBishop6","wBishop7","wBishop8","wBishop9","wBishop10"].includes(CurrentPieceInWhitePieceMap)){

// getting row and column position
for(var i = 0; i < grid_row_length; i++){
for(var j = 0; j < grid_col_length; j++){
if(grid[i][j].includes( parseInt(CurrentTileInWhitePieceMap)     )){
getRow = i;
console.log(getRow);
getCol = j;
console.log(getCol);
}
}                          
}

// all moves in the down positive diagonal

for(var j = getCol +1, i = getRow+1; j<8 && i<8 ; j++, i++){
if(document.getElementById((grid[i][j])).firstChild.id === ""){
    whitePieceMap[z].moveList.push( parseInt(document.getElementById((grid[i][j])).id) );
    continue;
} else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
    // blackPieceMap[z].push(parseInt(document.getElementById((grid[i][j])).id));
    whitePieceMap[z].moveList.push(   parseInt(document.getElementById((grid[i][j])).id));
    break;
} else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
    break;
}

}

// all moves in the up positive diagonal
for(var j = getCol -1, i = getRow+1; j>-1 && i<8 ; j--, i++){

if(document.getElementById((grid[i][j])).firstChild.id === ""){
    whitePieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
    continue;
} else if (BlackPieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
    whitePieceMap[z].moveList.push(parseInt(document.getElementById((grid[i][j])).id));
    break;
} else if (WhitePieces.includes(document.getElementById((grid[i][j])).firstChild.id)){
    break;
}
}

}

// Pawn movement
if (["wPawn1","wPawn2","wPawn3","wPawn4","wPawn5","wPawn6","wPawn7","wPawn8"].includes(CurrentPieceInWhitePieceMap) === true){

// getting row and column position
for(var i = 0; i < grid_row_length; i++){
   for(var j = 0; j < grid_col_length; j++){
       if(grid[i][j].includes(parseInt(CurrentTileInWhitePieceMap))){
           getRow = i;
           console.log(getRow);
           getCol = j;
           console.log(getCol);
       }
   }                          
}

if((parseInt(CurrentTileInWhitePieceMap) - 8) < 65){
if(document.getElementById(parseInt(CurrentTileInWhitePieceMap) - 8).firstChild.id === ""){
   whitePieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInWhitePieceMap) - 8).id));
}
}

if((parseInt(CurrentTileInWhitePieceMap) - 16) < 65){
   if((document.getElementById(parseInt(CurrentTileInWhitePieceMap) - 16).firstChild.id === "") && ([9,10,11,12,13,14,15,16].includes(parseInt(CurrentTileInWhitePieceMap)))){
       whitePieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInWhitePieceMap) - 16).id));
   }
}

if((parseInt(CurrentTileInWhitePieceMap) - 9) < 65){
if((BlackPieces.includes(document.getElementById(parseInt(CurrentTileInWhitePieceMap) - 9).firstChild.id) && ([8,16,24,32,40,48,56,64].includes(parseInt(CurrentTileInWhitePieceMap)) === false) )){
   whitePieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInWhitePieceMap) - 9).id)); 
}

// En passent
if(([8,16,24,32,40,48,56,64].includes(parseInt(CurrentTileInWhitePieceMap)) === false) && ((curBlackPawnPosition - prevBlackPawnPosition) === 16) && (["bPawn1","bPawn2","bPawn3","bPawn4","bPawn5","bPawn6","bPawn7","bPawn8"].includes(document.getElementById(parseInt(CurrentTileInWhitePieceMap)+1).firstChild.id) ) && ([8,16,24,32,40,48,56,64].includes(parseInt(CurrentTileInWhitePieceMap)) === false)){
   whitePieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInWhitePieceMap) - 9).id)); 
}
}

if((parseInt(CurrentTileInBlackPieceMap) - 7) < 65){
if((BlackPieces.includes(document.getElementById(parseInt(CurrentTileInWhitePieceMap) - 7).firstChild.id) && ([1,9,17,25,33,41,49,57].includes(parseInt(CurrentTileInWhitePieceMap)) === false) )){
   whitePieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInWhitePieceMap) - 7).id)); 
}

// En passent
if(([1,9,17,25,33,41,49,57].includes(parseInt(CurrentTileInWhitePieceMap)) === false) && ((curBlackPawnPosition - prevBlackPawnPosition) === 16) && (["bPawn1","bPawn2","bPawn3","bPawn4","bPawn5","bPawn6","bPawn7","bPawn8"].includes(document.getElementById(parseInt(CurrentTileInWhitePieceMap)-1).firstChild.id) ) && ([1,9,17,25,33,41,49,57].includes(parseInt(CurrentTileInWhitePieceMap)) === false)){
   whitePieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInWhitePieceMap) - 7).id)); 
}
}
}

// King movement
if((["wKing"]).includes(CurrentPieceInWhitePieceMap)){

// getting row and column position
for(var i = 0; i < grid_row_length; i++){
for(var j = 0; j < grid_col_length; j++){
if(grid[i][j].includes(parseInt(CurrentTileInWhitePieceMap))){
getRow = i;
console.log("row:",getRow);
getCol = j;
console.log("col:",getCol);
console.log(parseInt(grid[getRow][getCol]), typeof(parseInt(grid[getRow][getCol])))
}
}                              
}


    

offset = [-1,1,-8, 8, -9,9,-7,7];

console.log(offset);

// Removing out-of-border tiles
if(([8,16,24,32,40,48,56,64]).includes(parseInt(CurrentTileInWhitePieceMap))){
offset.splice(offset.indexOf(1),1);
offset.splice(offset.indexOf(9),1);
offset.splice(offset.indexOf(-7),1);
}
            
if(([1,9,17,25,33,41,49,57]).includes(parseInt(CurrentTileInWhitePieceMap))){
offset.splice(offset.indexOf(-1),1);
offset.splice(offset.indexOf(-9),1);
offset.splice(offset.indexOf(7),1);
}

for(var i in offset){
console.log("i",i);
console.log("j",i);
console.log("offset pos",offset[i]);
console.log(parseInt(CurrentTileInWhitePieceMap) + offset[i]);  
console.log(offset[i],typeof(offset[i]));
console.log(CurrentTileInWhitePieceMap + offset[i], typeof(CurrentTileInWhitePieceMap + offset[i]));
console.log(document.getElementById(CurrentTileInWhitePieceMap + offset[i]), typeof(document.getElementById(CurrentTileInWhitePieceMap + offset[i])));

if( ((parseInt(CurrentTileInWhitePieceMap) + offset[i]) > 64) || ((parseInt(CurrentTileInWhitePieceMap) + offset[i]) < 1)){
continue;
}

if(( document.getElementById( parseInt(CurrentTileInWhitePieceMap) + offset[i] ).firstChild.id === "") ){
whitePieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInWhitePieceMap) + offset[i]).id));
continue;
} else if ((BlackPieces.includes(document.getElementById(parseInt(CurrentTileInWhitePieceMap) + offset[i]).firstChild.id))){
whitePieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInWhitePieceMap) + offset[i]).id));
continue;
} else if (WhitePieces.includes(document.getElementById(parseInt(CurrentTileInWhitePieceMap) + offset[i]).firstChild.id)){
continue;
}

}


offset=[];


// Castling - king side
if((wKingHasMoved === false) && (wRook2HasMoved === false) && 
( document.getElementById(parseInt( document.getElementById(CurrentPieceInWhitePieceMap).parentElement.id)+1).firstChild.id === "") && 
( document.getElementById(parseInt( document.getElementById(CurrentPieceInWhitePieceMap).parentElement.id)+2).firstChild.id === "")){
whitePieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInWhitePieceMap)+2).id));
} 

// Castling - queen side
if((wKingHasMoved === false) && (wRook1HasMoved === false) && 
(document.getElementById(parseInt( document.getElementById(CurrentPieceInWhitePieceMap).parentElement.id)-1).firstChild.id === "") && 
(document.getElementById(parseInt( document.getElementById(CurrentPieceInWhitePieceMap).parentElement.id)-2).firstChild.id === "") && 
(document.getElementById(parseInt( document.getElementById(CurrentPieceInWhitePieceMap).parentElement.id)-3).firstChild.id === "")){
whitePieceMap[z].moveList.push(parseInt(document.getElementById(parseInt(CurrentTileInWhitePieceMap)-2).id));
} 
}






  
}

console.log( " Black King position:",parseInt(document.getElementById("bKing").parentElement.id) );
console.log("White piece map length", whitePieceMap.length);

    // Check - for black - by white
    for(let n = 0; n<whitePieceMap.length; n++){
        // Removing moveable tiles for king!
        for(let x = 0; x<blackPieceMap.length; x++){

            if (blackPieceMap[x].name === "bKing"){

                for(let y = 0;y<blackPieceMap[x].moveList.length;y++){

                    if (whitePieceMap[n].moveList.includes(     blackPieceMap[x].moveList[y]    )){
                        blackPieceMap[x].moveList.splice(y, 1);
                    }

                }
            }

        }

        if (whitePieceMap[n].moveList.includes(     parseInt(document.getElementById("bKing").parentElement.id)     )){
            console.log("Check for black king!"); // Check triggered
        }
    }            

    // Check - for white - by black


console.log("Black Piece Map:",blackPieceMap); 
console.log("White Piece Map:",whitePieceMap); 
}  

    
    
    
        ,)}
}
// Notify that movement works
function movePiece(){

    return (console.log());
}

export default DrawGrid(); // Draw the grid