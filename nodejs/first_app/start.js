//New comment for checking "push git"
//newbranch

//process.argv for take the right word from the user command , example: node start.js txt ori
//Example explain: ndoe filename filetype StringToSearch
var TypeOFileUserAskedFor = process.argv[2]; //The word in index 2 is the type of the file that the user asking.
var StringUserSearch = process.argv[3]; //The word in index 3 is the text that the user searchs.
var extenssionFromUser =TypeOFileUserAskedFor; //Put the type of file the user asked into the var that represent it.
var nametosearchByUser = StringUserSearch; //Put the string that the user want to search into the var that represent it.


//Checking if the command is empty (Wrong input of the user): 
if(extenssionFromUser== undefined){
console.log('node start.js [ext] [text]');
return;
}
if(nametosearchByUser== undefined){
    console.log('node start.js [ext] [text]');
    return;
    }

var CountOfNumberOfFilesThatNotHaveTheTypeTheUserAskedFor =0;// If this number equal to the number of files - it means that we didnt find the word in any file , so its not exsist. 
var CountNumberOfFilesThatWordNotExsist = 0 ;// If this number equal to the number of files - it means that we didnt found the word in any file , so its not exsist. 
var ContesFilesFromSameType = 0; //Represent the number of file that we searched in them.

let CurretDirectory = process.cwd();
var answer = ""; //The string that represent the final answer - the path to the file/s with the string.



//Call the fucntion ot searching.
DeepSearch(TypeOFileUserAskedFor , StringUserSearch , CurretDirectory );
//Start recurse. (if there is a directory inside the directory we need to use the same function on the sub directory by the orders.)
function DeepSearch(TypeOFileUserAskedFor, StringUserSearch , CurretDirectory ) {


const fs  = require("fs"); //Must
//Put all the files in array named "Files"
let directory =CurretDirectory ; //Directory to search in. (this directory.)
let dirBuf = Buffer.from(directory); //Freom where to start searching
let files = fs.readdirSync(directory); //Put the files into array

/*
Loop perpose-
1) if the user entered 'txt' searching in the 'txt' files , the string he asked for.
2)if the user entered 'js' - searching in the 'js' files , the string he asked for.
*/
//For each element in array we want to check if it txt or js and print if we found the string in it.
files.forEach(function(element) {


   //For each element - we need to get the name of it for checking the "after dot" - checking what kind of file is it.
   var path = require('path');
   
   let GetFileName = path.basename(element);

//For each element we need to cut his name until the dot.
let FileType = GetFileName; //FileType gets the all name of the string with his type
let AfterDot = FileType.substring(FileType.indexOf('.') +1);  //Cut the string (to keep only the after dot part and that way to know the type of the file.)

//Checking if the file is a sub directory.
if(fs.lstatSync(CurretDirectory+ '\\'+GetFileName).isDirectory()) //Checking if a file is directory)
{
    DeepSearch(TypeOFileUserAskedFor, StringUserSearch , CurretDirectory+ '\\'+GetFileName ) //If the file is directory we send the file to this function - to check the files in it and search the what the user asked.
}




//Checkig if the type of the file is the type that the user enterd - if it does searching the string in it.
if(JSON.stringify(AfterDot) === JSON.stringify(extenssionFromUser))
{
    ContesFilesFromSameType++; //Checking the size of the array.
    //  Task -Out Put the file if the string is in it.

 

let theinfile =fs.readFileSync(CurretDirectory + '\\' +GetFileName , 'utf8'); //Read file and put it in a var.

 
 
if(theinfile.includes(nametosearchByUser)) //Checking if a word exsist in a file
{ 
    
//console.log("The text you entered found in: "); //Out Put the files that the text that the user entered found in it.
answer = answer +('-file: ' +process.cwd() +"\\" +GetFileName +"\n");   //Out Put the name of the files that the text that the user entered found in it. 
}else{CountNumberOfFilesThatWordNotExsist=CountNumberOfFilesThatWordNotExsist+1;} //We counting the files that the word is not exsist in it , and if this counter will be equal to the number of files that exsist it means that that must be an output to the user - " not found such a file"
}else{CountOfNumberOfFilesThatNotHaveTheTypeTheUserAskedFor=CountOfNumberOfFilesThatNotHaveTheTypeTheUserAskedFor+1;} //Counting the number of files that are not the file that the user asked for.
  });

 
}


 //This part of the code handle with 2 cases , the user asked for a type of file (ext \ js) that not exsist in the directory or the user asked for a string that not found in the directory files.
  // for checking it we counted the number of files that arent have the same type of the user asked , and if the array length (all files are in array so array length represent the number of all the files) is equal to the number of files that not have the type that the user asked , it means that no file have this type , so we need to out put this to the user - same thing with the text that the user input.

if(answer=== "") 
{
    //Separate the reasons that we didnt found the string. (type not exsist / string not exsist)
if(ContesFilesFromSameType==CountNumberOfFilesThatWordNotExsist) 
  console.log('Im sorry , there is no file in the type that you asked- with this string.');

  if(ContesFilesFromSameType ==CountOfNumberOfFilesThatNotHaveTheTypeTheUserAskedFor)
  {
    console.log('Im sorry , there is no file in the type that you asked.');
  }
}else{
    console.log("Text found in: \n " +answer) //Out put the answer.
}
 




  






