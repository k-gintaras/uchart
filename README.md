# uchart
starts as super simple pure js canvas doughnut available as horizontal and vertical in social media share dimensions

### simple canvas doughnut: 
![alt text](https://github.com/k-gintaras/uchart/blob/master/screenshot.JPG "simple canvas doughnut")
***

### howto: 
```html
        <canvas id="canvas1" width="2048" height="1024" style="width:800px;height:auto;"></canvas>
        <script src='udonut.js' type='text/javascript'></script>
```

```js
var canvasRecommendedHorizontalSettings = {width: 2 * 1024, height: 2 * 512};
var canvasRecommendedVerticalSettings = {width: 2 * 800, height: 2 * 1200};

var chartColors = ["RGB(68, 34, 153)", "RGB(51, 17, 187)", "RGB(17, 170, 187)", "RGB(34, 204, 170)", "RGB(170, 204, 34)", "RGB(204, 187, 51)", "RGB(255, 153, 51)", "RGB(255, 68, 34)", "RGB(238, 17, 0)", "RGB(248, 12, 18)"];
var JSONarr = [{'attribute': 'great', 'value': 4}, {'attribute': 'pleasure', 'value': 1}, {'attribute': 'positive', 'value': 4}, {'attribute': 'bright', 'value': 2}, {'attribute': 'surprised', 'value': 4}, {'attribute': 'disrespected', 'value': 3}, {'attribute': 'envy', 'value': 1}, {'attribute': 'furious', 'value': 3}, {'attribute': 'provocative', 'value': 4}, {'attribute': 'good', 'value': 5}];

var chartProperties = {
	colors: chartColors,
	canvas: document.getElementById("canvas1"),
	vertical: false
	//vertical needs canvas recommended dimensions
};
new udonut(JSONarr, chartProperties);
	chartProperties.canvas=document.getElementById("canvas2");
	chartProperties.vertical=true;
new udonut(JSONarr, chartProperties);
```

