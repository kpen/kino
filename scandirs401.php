<?php 
function parseDir($dir, &$files=array(), $extension=false){
if(!is_dir($dir)){
    $info =  pathinfo($dir);
    // add all files if extension is set to false
    if((isset($info['extension']) && $info['extension'] === $extension)){
$files[] = $dir;
    }
}else{
//$fp = file_put_contents('request.log', "$dir/$what0", FILE_APPEND);
    if ( ( substr($dir, -5) != "above") && 
 (substr($dir, -1) !== '.') && 
$dh =  opendir($dir)){
        while($file = readdir($dh)){
            parseDir("$dir/$file", $files, $extension);
        }
    }
}
 }
$files = array();
parseDir("kino", $files, 'svg');
sort($files);
echo('{"files":'.json_encode($files).'}');
?>
