var html_text="";
function generateHTML(jsonObj){
	
	if(typeof(jsonObj) === 'undefined') {
		window.alert("No Information to display!");
		throw "No data error";
	}
	else
		
		if(typeof(jsonObj.Mainline) === 'undefined') {
			window.alert("No Information to display!");
			throw "No data error";
		}
		
		else if(typeof(jsonObj.Mainline.Table) === 'undefined') {
			window.alert("No Information to display!");
			throw "No data error";
		}
		
		
		
		else	 if(typeof( jsonObj.Mainline.Table.Row)==='undefined'){
			window.alert("No Information to display!");
			throw "No data error";
			
		}
		else{
			
			html_text="<html><head><title>JSON Parse Result</title></head><body>";
			html_text+="<table border='2'>";
			
			companyHeader=jsonObj.Mainline.Table.Header.Data; 
			
			html_text+="<tbody>";
			html_text+="<tr>";
			
			
			var header_keys = Object.keys(companyHeader);
			for(i=0;i<header_keys.length;i++) {
				header=companyHeader[i];
				
				html_text+="<th>"+header+"</th>";
			}
			html_text+="</tr>";
			
		}
		var companyData = jsonObj.Mainline.Table.Row;
		for(i=0;i<companyData.length;i++) 
		{
			var printData=companyData[i]; 
			html_text+="<tr>"; 
			var data_keys = Object.keys(printData);
			for(j=0;j<data_keys.length;j++)
			{
				prop = data_keys[j];
				if(prop == "Logo"){
					html_text+= "<td><img src='"+ printData[prop]+"'height='150' width='300'></td>";
				}else if(prop == "Hubs"){
					var hubs = printData[prop];
					var hubsKeys = Object.keys(hubs);
					html_text+="<td><ul>";
					for(var m in hubsKeys){
						for(var hub in hubs[hubsKeys[m]]) {
							if (m == "0" && hub == "0") {
								html_text+= "<li><b>"+ hubs[hubsKeys[m]][hub] +"</b></li>";
							} else {
								html_text+= "<li>"+ hubs[hubsKeys[m]][hub] +"</li>";
							}
						}
					}
					html_text+="</ul></td>";
					
				}  
				else if(prop == "HomePage"){
					html_text+= "<td><a href='"+ printData[prop]+"'/>"+ printData[prop]+"</td>";
				}					
				
				else{
					html_text+= "<td>"+printData[prop]+"</td>";
				}
			}
			html_text+="</tr>";
		}
		html_text+="</tbody>";
		html_text+="</table>";
		html_text+="</body></html>"; 
		
		
	}
	
	
	function viewJSON(what){
		
		var URL = what.URL.value;
		if(URL=="" | URL== null) {
			window.alert("input text cannot be empty");
			throw "empty text";
		}
		function loadJSON(url){
			if(window.XMLHttpRequest){
				xmlhttp = new XMLHttpRequest();
			}else{
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.open("GET",url,false);
			
			try
			{
				xmlhttp.send();
			}
			catch(e)
			{
				alert('JSON File does not exist');
				throw "json file does not exist";
				return;
			}       
			
			
			
			if (xmlhttp.status==0 || xmlhttp.status==200){
				try{
					jsonObj = JSON.parse(xmlhttp.responseText);
					
				}
				catch(err){
					window.alert("Not a valid File");
					throw "not valid";
				}
				return jsonObj; 
				
				
				
				
			}else{
				window.alert("JSON File not found.");
				throw("not found");
				return;
			} 
			
		}
		jsonObj = loadJSON(URL);
		if	(window.ActiveXObject)
		{		
			if	(jsonObj.parseError.errorCode !=0)	
			{
				var myErr =	jsonObj.parseError;
				generateError(jsonObj);
				hWin =	window.open("",	"Error", "height=300, width=340");
				hWin.document.write(html_text);
			}	
			
			else
			{		
				
				generateHTML(jsonObj);
				
				hWin =	window.open("",	"Assignment4",'_blank');
				hWin.document.write(html_text);	
			}	
		}else
		{		
			jsonObj.onload=generateHTML(jsonObj);
			
			hWin =	window.open("",	"Assignment4","height=700,width=1000");
			hWin.document.write(html_text);	
		}
		hWin.document.close();		
	}