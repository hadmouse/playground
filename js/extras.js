/*global alert, console, localStorage, sessionStorage, FormData, confirm, $, jQuery, Array, Blob*/
/*jslint regexp: true*/
/*jslint es5: true*/

//image maps region
function responsive_mapping(element) {
	"use strict";
	var e = element instanceof jQuery ? element : $(element),
		mapa,
		difW,
		difH;
	
	if (e[0].clientWidth !== e[0].naturalWidth && e.attr("usemap") !== undefined) {
		difW = (100 * e[0].clientWidth) / e[0].naturalWidth;
		difH = (100 * e[0].clientWidth) / e[0].naturalWidth;
		
		mapa = $("map[name='" + e.attr("usemap").replace("#", "") + "']");
		mapa.find("area").each(function (i, e) {
			var coords = $(e).attr("coords").split(","),
				shape = $(e).attr("shape"),
				salida = [];
			coords.forEach(function (value, ind) {
				salida.push(ind % 2 === 0 ? Math.round(value * difW / 100) : Math.round(value * difH / 100));
			});
			$(e).attr("coords", salida.join(","));
			$(e).attr("data-old-coords", coords.join(","));
		});
	}
}

function min_max_area(element) {
	"use strict";
	var e = element instanceof jQuery ? element : $(element),
		coords,
		minX,
		maxX,
		minY,
		maxY;
	if (e.attr("coords") !== undefined) {
		coords = e.attr("coords").split(",");
		coords.forEach(function (valor, i) {
			//x
			var v = parseInt(valor, 10);
			if (i % 2 === 0) {
				if (minX === undefined) {
					minX = v;
				} else if (v < minX) {
					minX = v;
				}

				if (maxX === undefined) {
					maxX = v;
				} else if (v > maxX) {
					maxX = v;
				}
			//y
			} else {
				if (minY === undefined) {
					minY = v;
				} else if (v < minY) {
					minY = v;
				}

				if (maxY === undefined) {
					maxY = v;
				} else if (v > maxY) {
					maxY = v;
				}
			}
        });
		return {
			x: [minX, maxX],
			y: [minY, maxY],
			average: [Math.round((minX + maxX) / 2), Math.round((minY + maxY) / 2)]
        };
	}
	return false;
}
//image maps endregion