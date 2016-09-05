function addCanvas(parent, width, height, id, tabindex)
{
    var element = document.createElement("canvas");
	element.width = width;
	element.height = height;
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

function addIconButton(parent, id, value, onclick, image)
{
    var element = document.createElement("button");
	element.class = "button";
	element.type = "button";
	element.id = id;
	element.title = value;
	element.onclick = onclick;
	//element.innerHTML = "<img width=20 height=20 src=\"" + image + "\">";
	var imgElement = document.createElement('img');
	imgElement.height = 20;
	imgElement.width = 20;
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

function addChooser(parent, id, choices, defaultIndex, listener)
{
    var element = document.createElement("select");
	element.id = id;
	for (var i = 0; i < choices.length; i = i + 1)
	{
	    var choice = document.createElement("option");
		if (i == defaultIndex)
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

function addFontchooser(parent, id)
{
    var element = document.createElement("select");
	element.id = id;
	element.innerHTML = "<option>Arial</option>\
	<option>Calibri</option>\
  <option>Comic Sans Ms</option>\
  <option>Courier</option>\
  <option>Cursive</option>\
  <option>Fantasy</option>\
  <option>Geneva</option>\
  <option selected=\"selected\">Georgia</option>\
  <option>Helvetica</option>\
  <option>Impact</option>\
  <option>Lucida Console</option>\
  <option>Monaco</option>\
  <option>Times New Roman</option>\
  <option>Verdana</option>"
  parent.appendChild(element);
    element.addEventListener("change", function(e) {
   });
}

function addFonttype(parent, id)
{
    var element = document.createElement("select");
	element.id = id;
	element.innerHTML = "<option selected=\"selected\">Normal</option>\
  <option>Bold</option>\
  <option>Italic</option>"
  parent.appendChild(element);
}

function addFontSizeChooser(parent, id)
{
    var element = document.createElement("select");
	element.id = id;
	element.innerHTML = "<option selected=\"selected\">14</option>\
  <option>16</option>\
  <option>18</option>\
  <option>20</option>\
  <option>22</option>\
  <option>24</option>\
  <option>26</option>\
  <option>28</option>\
  <option>30</option>\
  <option>32</option>\
  <option>34</option>"
  parent.appendChild(element);
}
