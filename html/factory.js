function addCanvas(parent, id, tabindex)
{
    var element = document.createElement("canvas");
	element.width = 2500;//window.innerWidth;
	element.height = 2500;//window.innerHeight;
	element.id = id;
	element.tabindex = tabindex;
	parent.appendChild(element);
}

function addButton(parent, id, value, onclick)
{
    var element = document.createElement("input");
	element.class = "button";
	element.type = "button";
	element.id = id;
	element.value = value;
	element.onclick = onclick;
	element.innerHTML = "<img src=\"image.jpg\">";
	parent.appendChild(element);
}

function addIconButton(width, height, parent, id, value, onclick, image)
{
    var element = document.createElement("button");
	element.class = "button";
	element.type = "button";
	element.id = id;
	element.title = value;
	element.onclick = onclick;
	//element.innerHTML = "<img width=20 height=20 src=\"" + image + "\">";
	var imgElement = document.createElement('img');
	imgElement.width = width;
	imgElement.height = height;
	//imgElement.src = image;
	element.appendChild(imgElement);
	
    var backCanvas = document.createElement('canvas');
    var newImage = new Image();
    newImage.src = image;
    newImage.addEventListener("load", function() {
	    var context = backCanvas.getContext('2d');
		context.drawImage(newImage, 0, 0, backCanvas.width, backCanvas.height);
		try {
		var imageData = context.getImageData(0, 0, backCanvas.width, backCanvas.height);
		} catch(e) {
		alert(image);
		}
		var data = imageData.data;
		for (var i = 0; i < data.length; i = i + 4)
		{
		    if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200)
			    data[i + 3] = 0;
		}
		context.clearRect(0, 0, backCanvas.width, backCanvas.height);
		context.putImageData(imageData, 0, 0);
		
		imgElement.src = backCanvas.toDataURL();
   
    });
	parent.appendChild(element);
}

function addTextbox(parent, id)
{
    var element = document.createElement("input");
	element.id = id;
	element.type = "text";
	parent.appendChild(element);
}

function addLabel(parent, id)
{
    var element = document.createElement("label");
	element.id = id;
	parent.appendChild(element);
}

function addTextarea(parent, id, rows, cols)
{
    var element = document.createElement("textarea");
	element.id = id;
	element.rows = rows;
	element.cols = cols;
	parent.appendChild(element);
}

function addBreak(parent)
{
	parent.appendChild(document.createElement("br"));
}

function addChooser(parent, id, choices, selectedChoice, listener)
{
    var element = document.createElement("select");
	element.id = id;
	for (var i = 0; i < choices.length; i = i + 1)
	{
	    var choice = document.createElement("option");
		if (selectedChoice == choices[i])
		{
		    choice.selected = "\"selected\"";
		}
		choice.innerHTML = choices[i];
		element.appendChild(choice);
	}
	parent.appendChild(element);
    element.addEventListener("change", function(e) {
	    listener();
    });
}
