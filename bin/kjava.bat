args = WScript.Arguments;

if(args.length >0){
	var file = args(0);
	
	var argument = "";
	if(args.length >1){
		var params = new Array();
		for(var i=1;i<args.length;i++)
			params.push(args(i));
		argument=" "+ params.join(" ");
	}


	if(file.substring(file.length-5) !=".java"){
		WScript.Echo("只能执行java");
		WScript.Quit(1);;
	}

	file = file.substring(0,file.length-5);

	var path = null;

		// 自动寻找跟路径...
	var i=-1;
	if(-1!=(i=file.lastIndexOf("\\com\\")))
		;
	else if(-1!=(i=file.lastIndexOf("\\org\\")))
		;
	else if(-1!=(i=file.lastIndexOf("src\\")))
		i+=3;
	if(i!=-1)
		path=file.substring(0,i);
	else
		path=file.substring(0,file.lastIndexOf("\\"));


	var className=file.substring(path.length+1).replace(/\\/ig,".");

	var WshShell = new ActiveXObject("WScript.Shell");

	var oExec  = WshShell.Run('"k:\\bin\\kcmd.bat" java '+className+argument,1,false);
}