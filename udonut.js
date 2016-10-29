/**
 * The MIT License (MIT) Copyright (c)
 * 
 * <2016><Gintaras Koncevicius>(@author Ubaby)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

//var canvasVerticalSettings = {w: 2 * 800, h: 2 * 1200, t: 0.8};
//var canvasHorizontalSettings = {w: 2 * 1024, h: 2 * 512, t: 1};
//
//var chartProperties = {
//            chartWidth: verticalSettings.w,
//            chartHeight: verticalSettings.h,
//            colors: chartColors,
//            textColor: "",
//            canvas:el.get("canvas"),
//            vertical:true
//        };
// var testExampleFrequencyDataJSON = "[" +
//        "{'attribute':'" + ran.str(feelings_no_50_names_array) + "','value':4},{'attribute':'" + ran.str(feelings_no_50_names_array) + "','value':2},{'attribute':'" + ran.str(feelings_no_50_names_array) + "','value':3},{'attribute':'" + ran.str(feelings_no_50_names_array) + "','value':2},{'attribute':'" + ran.str(feelings_no_50_names_array) + "','value':5}" +
//        ",{'attribute':'" + ran.str(feelings_no_50_names_array) + "','value':3},{'attribute':'" + ran.str(feelings_no_50_names_array) + "','value':2},{'attribute':'" + ran.str(feelings_no_50_names_array) + "','value':2},{'attribute':'" + ran.str(feelings_no_50_names_array) + "','value':1},{'attribute':'" + ran.str(feelings_no_50_names_array) + "','value':1}]";
       
function udonut(dataIn, s) {
        var cv = s.canvas;
        var ctx = cv.getContext('2d');
    dataIn.sort(function (a, b) {
        return b.value - a.value;
    });
        var PI = Math.PI;
        var quarterRadius = PI / 2;
        var fullRadius = PI * 2;
        var fontSize,vertical, mini, x, y, r, legendTopIncrement, legendLeft, legendTop, arcWidth;

        (s.vertical !== undefined) ? vertical = s.vertical : vertical = false;
        (s.mini !== undefined) ? mini = s.mini : mini = false;

        if (vertical) {
            x = cv.width / 2;
            y = cv.height / 2.7;
            r = cv.height / 5;
            fontSize = 70;
            arcWidth = r*0.7;

            legendTopIncrement = 70;
            legendLeft = x - r / 2 + r / 4;
            legendTop = y +fontSize+ 2 * r - (dataIn.length * (fontSize + legendTopIncrement) / 4.5);
        } else {
            x = cv.width / 2.5;
            y = cv.height / 2;
            r = cv.width / 7;
            fontSize = 60;
            arcWidth = r*0.7;

            legendTopIncrement = fontSize;
            legendLeft = x + r + r / 2;
            legendTop = y - (dataIn.length * (fontSize + legendTopIncrement) / 4.5);
        }

        var arcSpace = fullRadius / 120;
        var arcStart = 0 - quarterRadius;

        //calculate max
        var max = 0;
        for (var i = 0; i < dataIn.length; i++) {
            var cur = dataIn[i];
            max += cur.value;
        }

        for (var i = 0; i < dataIn.length; i++) {
            var cur = dataIn[i];
            var howWide = normalize(cur.value, 0, max, 0, fullRadius);
            var startAngle = arcStart + arcSpace / 2;
            var endAngle = arcStart + howWide;
            var color = s.colors[i];
            drawArc(ctx, color, x, y, r, startAngle, endAngle, arcWidth);

//text inside arc
            var midAngle = (endAngle - startAngle) / 2;
            var textObject = {x: x, y: y - r};
            var circleObject = {x: x, y: y};
            rotateAround(circleObject, textObject, arcStart + midAngle + quarterRadius, true);
            drawText(ctx, cur.value, "white", textObject.x, textObject.y, fontSize + "px");
            arcStart += howWide;
//legend
            if (mini) {
                drawText(ctx, cur.attribute, color, legendLeft, legendTop, fontSize + "px");//nice and colourful
            } else {
                drawText(ctx, cur.attribute, "black", legendLeft + fontSize, legendTop, fontSize + "px");
                var rectSize = legendTopIncrement * 0.9;
                drawRoundRect(ctx, legendLeft, legendTop - legendTopIncrement / 1.5, rectSize, rectSize, 10, true, false, color);
            }
            legendTop += legendTopIncrement;
        }

        function rotateAround(source, target, speed, clockWise) {
            (clockWise) ? clockWise = 1 : clockWise = -1;
            var x1 = target.x,
                    y1 = target.y,
                    x2 = source.x,
                    y2 = source.y,
                    sin = Math.sin,
                    cos = Math.cos, phi = 0,
                    phi = clockWise * speed;
            target.x = (cos(phi) * (x1 - x2)) - (sin(phi) * (y1 - y2)) + x2;
            target.y = (sin(phi) * (x1 - x2)) + (cos(phi) * (y1 - y2)) + y2;
        }

        function normalize(number, min, max, newMin, newMax) {
            var normalized = 0;
            normalized = ((((number - min) / (max - min)) * (newMax - newMin)) + newMin);
            return Math.round(normalized * 100000) / 100000;
        }

//it's all thanks to Juan Mendes at http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
        function drawRoundRect(ctx, x, y, width, height, radius, fill, stroke, color) {
            if (typeof stroke === 'undefined') {
                stroke = true;
            }
            if (typeof radius === 'undefined') {
                radius = 5;
            }
            if (typeof radius === 'number') {
                radius = {tl: radius, tr: radius, br: radius, bl: radius};
            } else {
                var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
                for (var side in defaultRadius) {
                    radius[side] = radius[side] || defaultRadius[side];
                }
            }
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + radius.tl, y);
            ctx.lineTo(x + width - radius.tr, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
            ctx.lineTo(x + width, y + height - radius.br);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
            ctx.lineTo(x + radius.bl, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
            ctx.lineTo(x, y + radius.tl);
            ctx.quadraticCurveTo(x, y, x + radius.tl, y);
            ctx.closePath();

            if (fill) {
                ctx.fillStyle = color;
                ctx.fill();
            }
            if (stroke) {
                ctx.strokeStyle = color;
                ctx.stroke();
            }
            ctx.restore();
        }

        function drawText(ctx, txt, color, x, y, s) {
            ctx.save();
            ctx.fillStyle = color;
            ctx.font = s + " Roboto";
            ctx.fillText(txt, x, y);
            ctx.restore();
        }

        function drawArc(ctx, color, x, y, r, start, end, arcWidth) {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = arcWidth;
            ctx.strokeStyle = color;
            ctx.arc(x, y, r, start, end);
            ctx.stroke();
            ctx.restore();
        }
    }