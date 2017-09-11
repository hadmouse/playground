/*global alert, console, localStorage, sessionStorage, FormData, confirm, $, jQuery, Array, Blob*/
/*jslint regexp: true*/
/*jslint es5: true*/

//globales region
var home_url = "";
//globales endregion

//utilitarias region
function tabla_a_csv(tabla) {
	"use strict";
	var a = {},
		t = $(tabla),
		elementos = t.find("tbody tr"),
		headers = t.find("thead tr th"),
		headers_salida = [],
		salida = "",
		separador = ";",
		key,
		key2,
		fila,
		esta_salida;

	elementos.each(function (index, element) {
		var este = {},
			hijos = $(element).find("td");

		hijos.each(function (indice, elemento) {
			var header = headers.eq(indice).text().trim(),
				valor = $(elemento).text().trim();
			este[header] = valor;
			a[index] = este;
		});
	});

	for (key in a) {
		if (a.hasOwnProperty(key)) {
			fila = a[key];
			esta_salida = "";
			for (key2 in fila) {
				if (fila.hasOwnProperty(key2)) {
					esta_salida += fila[key2] + separador;
					if (headers_salida.indexOf(key2) === -1) {
						headers_salida.push(key2);
					}
				}
			}
			salida += esta_salida.substr(0, esta_salida.length - 1) + "\n";
		}
	}

	salida = headers_salida.join(separador) + "\n" + salida;
	return salida;
}

function json_a_csv(objeto) {
	"use strict";
	var key,
		key_inner,
		headers,
		separador = ";",
		este = "",
		output = "";
	if (typeof objeto === "object") {
		for (key in objeto) {
			if (objeto.hasOwnProperty(key)) {
                este = "";
				for (key_inner in objeto[key]) {
					if (objeto[key].hasOwnProperty(key_inner)) {
						if (headers === undefined) {
                            console.log(Object.keys(objeto[key]));
                            headers = Object.keys(objeto[key]).join(separador) + "\n";
                        }
						este += objeto[key][key_inner] + separador;
					}
                }
				este = este.substr(0, este.length - 1) + "\n";
				output += este;
			}
		}
		return headers + output;
	}
}

function get_all_attributes(selector) {
	"use strict";
	var s = selector,
		outer = s[0].outerHTML,
		tag = outer.split(">")[0],
		separador = tag.indexOf('="') !== -1 ? '" ' : "' ",
		separador2 = tag.indexOf('="') !== -1 ? '="' : "='",
		attrs = tag.split(separador),
		objeto_salida = {};

	attrs.splice(0, 1);
	attrs.forEach(function (value, index) {
		if (index === attrs.length - 1 && (value.substr(value.length - 1, 1) === "'" || value.substr(value.length - 1, 1) === '"')) {
			objeto_salida[value.split(separador2)[0]] = value.split(separador2)[1].substr(0, value.split(separador2)[1].length - 1);
		} else {
			objeto_salida[value.split(separador2)[0]] = value.split(separador2)[1];
		}
		
		
	});

	return objeto_salida;
}

function centrar_imagenes_overflow(selector) {
	"use strict";
	var s = selector instanceof jQuery ? selector : $(selector),
		img,
		prop,
		parent;
	
	if (s.length > 1) {
		s.each(function (index, element) {
			centrar_imagenes_overflow($(element));
		});
	} else {
		if (typeof s[0] !== "undefined") {
			prop = s[0].naturalWidth / s[0].naturalHeight;
			parent = {
				height: s.parent().height() > 0 ?  s.parent().height() : s.parent().parent().height(),
				width: s.parent().width() > 0 ? s.parent().width() : s.parent().parent().width()
			};
			img = {
				height: s.height() > 0 ? s.height() : Math.round(parent.width / prop),
				width: s.width() > 0 ? s.width() : parent.width
			};
			
			s.attr("data-parent-height", parent.height)
				.attr("data-parent-width", parent.width)
				.attr("data-height", img.height)
				.attr("data-width", img.width)
				.attr("data-prop", img.prop);
			
			if (img.width > parent.width || img.height > parent.height) {
				s.css({
					"top": (img.height - parent.height) / -2,
					"left": (img.width - parent.width) / -2,
					"position": "relative"
				});
			}
		}
	}
}

function manejarInvoker(arg, invocador) {
	"use strict";
	var clases = invocador.find(".fa").length > 0 ? invocador.find(".fa").attr("class").split(" ") : undefined,
		claseReemplazable;
	if (clases !== undefined) {
		clases.forEach(function (value, index) {
			if (value !== "fa" && value !== "fa-spin") {
				claseReemplazable = value;
			}
		});
	}
	if (arg === "enable") {
		invocador.removeAttr("disabled");
		invocador.attr("style", invocador.attr("style").replace("pointer-events: none;", "").replace("pointer-events:none;", ""));
		invocador.removeClass("disabled");
		if (clases !== undefined) {
			invocador.find(".fa").addClass(invocador.find(".fa").attr("data-clase-original")).removeClass("fa-spin fa-cog");
		}
	} else if (arg === "disable") {
		invocador.css("pointer-events", "none").attr("disabled", "");
		invocador.addClass("disabled");
		if (clases !== undefined) {
			invocador.find(".fa").removeClass(claseReemplazable).addClass("fa-spin fa-cog");
			invocador.find(".fa").attr("data-clase-original", claseReemplazable);
		}
	}
}

function hacer_archivo_texto(texto) {
	"use strict";
    var data = new Blob([texto], {type: 'text/plain'}),
		archivo_texto;

    archivo_texto = window.URL.createObjectURL(data);
    return archivo_texto;
}

function crear_enlace(url, nombre_archivo, nombre_enlace, destino) {
    "use strict";
	var d = destino !== undefined ? destino : "body";
    $(d).append("<a href='" + url + "' download='" + nombre_archivo + "'>" + nombre_enlace + "</a>");
}

function generarMensaje(objetoArgumentos, opciones) {
	/*
	var objetoEjemplo = {
		"titulo": "ejemplo de titulo",
		"cuerpo": "<div>Ejemplo de Cuerpo</div>",
		"footer": "Este es el footer opcional",
		"callback": function () {}
	}
	*/
	"use strict";
	var objArgument = objetoArgumentos !== undefined && typeof objetoArgumentos === "object" && Array.isArray(objetoArgumentos) === false ? objetoArgumentos : false,
		resolverFooter = function (obj) {
			var salida = "";
			if (obj.hasOwnProperty("footer")) {
				salida = '<footer class="mensaje-over_footer">\
							' + objArgument.footer + '\
						</footer>';
			} else {
				salida = '<footer class="mensaje-over_footer">\
							<button class="btn btn-color-1 btn-block btn-lg" onclick=\'$(this).closest(".mensaje-over").fadeOut(function(){$(this).closest(".mensaje-over").remove();})\'>Aceptar</button>\
						 </footer>';
			}
			return salida;
		},
		div;
	if (objArgument !== false) {
		div = '<article id="mensaje-over" class="mensaje-over">\
					<div class="mensaje-over_wrapper">\
						<div class="mensaje-over_inner">\
							<header class="mensaje-over_header">\
								<h4 class="mensaje-over_titulo">' + objArgument.titulo + '</h4>';
		if (opciones !== "no-cerrar") {
			div += '<button class="btn btn-cerrar-mensaje-over" onclick=\'$(this).closest(".mensaje-over").fadeOut(function(){$(this).closest(".mensaje-over").remove();})\'><span class="fa fa-times"></span></button>';
		}
		div +=             '</header>\
							<section class="mensaje-over_main">\
								' + objArgument.cuerpo + '\
							</section>\
							' + resolverFooter(objArgument) + '\
						</div>\
					</div>\
				</article>';
		div = $(div);
		$("body").append(div);
		setTimeout(function () {
			div.addClass("active");
			if (objArgument.callback !== undefined) {
				objArgument.callback();
			}
		}, 100);
	}
}

function recopilar_formulario(formulario) {
	"use strict";
	var f = formulario instanceof jQuery ? formulario : $(formulario),
		salida = {};
	f.find("[name]").each(function (i, e) {
		salida[$(e).attr("name")] = $(e).val();
	});
	return salida;
}
//utilitarias endregion

//ajax region
function errorAjax(cod) {
	"use strict";
	alert("Se ha producido un error, vuelva a intentarlo más tarde");
	console.log("error " + cod);
}
//ajax endregion

//formatear region
var formatear = {
	moneda: function (val) {
		"use strict";
		return "$" + formatear.numero(val);
	},
	numero: function (val) {
		"use strict";
		var admitidos = "0123456789",
			v = typeof val === "number" ? val.toString() : val,
			vc = v.replace(/\./g, ""),
			vo = "",
			i;
		for (i = 0; i < vc.length; i += 1) {
			if (admitidos.indexOf(vc.split("")[i]) !== -1) {
				vo += vc.split("")[i];
			}
		}
		vc = vo;
		vo = "";

		for (i = vc.length - 1; i >= 0; i -= 1) {
			if (vc.length - i === 4 || ((vc.length - i) % 3 === 1 && i !== vc.length - 1)) {
				vo = vc.split("")[i] + "." + vo;
			} else {
				vo = vc.split("")[i] + vo;
			}
		}
		return vo;
	},
	numero_clean: function (val, adicionales) {
		"use strict";
		var admitidos = adicionales !== undefined ? "0123456789" + adicionales : "0123456789",
			vc = val.replace(/\./g, ""),
			vo = "",
			i;
		for (i = 0; i < vc.length; i += 1) {
			if (admitidos.indexOf(vc.split("")[i]) !== -1) {
				vo += vc.split("")[i];
			}
		}
		return adicionales !== undefined ? vo : parseInt(vo, 10);
	},
	leading_zero: function (val, largo) {
		"use strict";
		var leadzero = function (cuanto) {
				var a = "0",
					b = "",
					i = 0;
				for (i; i < cuanto; i += 1) {
					b += a;
				}
				return b;
			},
			inp = typeof val === "number" ? val.toString() : val;

		return inp.length < largo ? (leadzero(largo - inp.length) + inp) : inp;
	},
	uc_first: function (val) {
		"use strict";
		return (val.substr(0, 1).toUpperCase() + val.substr(1, val.length - 1).toLowerCase()).trim();
	},
	uc_words: function (val) {
		"use strict";
		var input = val.split(" "),
			output = "";
		input.forEach(function (value, index) {
			output += value.substr(0, 1).toUpperCase() + value.substr(1, value.length - 1).toLowerCase() + " ";
		});
		return output.trim();
	},
	capitalize: function (val) {
		"use strict";
		return formatear.uc_words(val);
	},
	rut: function (val) {
		"use strict";
		var v = formatear.numero_clean(val, "k");
		
		console.log(v);
		
		v = v.substr(0, v.length - 1) + "-" + v.substr(v.length - 1, 1);
		
		return v.toUpperCase();
	}
};
//formatear endregion

//validar region
var validar = {
	auto_registrar_errores: true,
	errores: {},
	registrar_error: function (key, mensaje) {
		"use strict";
		if (key !== undefined && mensaje !== undefined) {
			validar.errores[key] = mensaje;
		}
	},
	rut: function (campo) {
		"use strict";
		var suma = 0, caracteres = "1234567890kK", contador = 0, i = 0, rut, drut, dvr, mul, u, res, dvi;
		if (campo.length === 0) {
			return false;
		}
		if (campo.length < 8) {
			return false;
		}
		campo = campo.replace('-', '').replace(/\./g, '');
		for (i; i < campo.length; i += 1) {
			u = campo.substring(i, i + 1);
			if (caracteres.indexOf(u) !== -1) {
				contador += 1;
			}
		}
		if (contador === 0) {
			return false;
		}
		rut = campo.substring(0, campo.length - 1);
		drut = campo.substring(campo.length - 1);
		dvr = '0';
		mul = 2;
		for (i = rut.length - 1; i >= 0; i -= 1) {
			suma = suma + rut.charAt(i) * mul;
			if (mul === 7) {
				mul = 2;
			} else {
				mul += 1;
			}
		}
		res = suma % 11;
		if (res === 1) {
			dvr = 'k';
		} else if (res === 0) {
			dvr = '0';
		} else {
			dvi = 11 - res;
			dvr = dvi.toString();
		}
		if (dvr !== drut.toLowerCase()) {
			if (validar.auto_registrar_errores) {
				validar.registrar_error("rut", "Rut ingresado es inválido");
			}
			return false;
		} else {
			return true;
		}
	},
	email: function (stringMail) {
		"use strict";
		var re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(2([0-4]\d|5[0-5])|1?\d{1,2})(\.(2([0-4]\d|5[0-5])|1?\d{1,2})){3} \])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (stringMail.length < 6) {
			if (validar.auto_registrar_errores) {
				validar.registrar_error("email", "Ingrese su correo");
			}
			return false;
		} else if (!re.test(stringMail)) {
			if (validar.auto_registrar_errores) {
				validar.registrar_error("email", "El correo ingresado no es válido");
			}
			return false;
		} else {
			return true;
		}
	},
	nombre: function (stringNombre) {
		"use strict";
		var splitted = stringNombre.toLowerCase().split(""),
			validos = "abcdefghijklmnñopqrstuvwxyzàáäéèëìíïòòöùúü' -",
			checkCaracteres = function () {
				splitted.forEach(function (value, index) {
					if (validos.indexOf(value) === -1) {
						return false;
					}
				});
				return true;
			};
		if (!checkCaracteres()) {
			if (validar.auto_registrar_errores) {
				validar.registrar_error("nombre", "Ha ingresado un nombre no válido");
			}
			return false;
		} else if (stringNombre.length < 3) {
			if (validar.auto_registrar_errores) {
				validar.registrar_error("nombre", "Ha ingresado un nombre no válido");
			}
			return false;
		} else {
			return true;
		}
	},
	apellidos: function (input, bool_ambos_apellidos) {
		"use strict";
		var bool_apellidos = bool_ambos_apellidos === true ? true : false,
			splitted = input.toLowerCase().split(""),
			validos = "abcdefghijklmnñopqrstuvwxyzàáäéèëìíïòòöùúü' -",
			checkCaracteres = function () {
				splitted.forEach(function (value, index) {
					if (validos.indexOf(value) === -1) {
						return false;
					}
				});
				return true;
			};
		if (input.indexOf(" ") === -1 && (input.indexOf(" ") === input.lastIndexOf(" ")) && bool_apellidos) {
			if (validar.auto_registrar_errores) {
				validar.registrar_error("apellidos", "Ingrese ambos apellidos");
			}
			return false;
		} else if (!checkCaracteres()) {
			if (validar.auto_registrar_errores) {
				validar.registrar_error("apellidos", "Ha ingresado caracteres no válidos en apellidos");
			}
			return false;
		} else if (input.length < 2) {
			if (validar.auto_registrar_errores) {
				validar.registrar_error("apellidos", "Ingrese su apellido");
			}
			return false;
		} else {
			return true;
		}
	},
	telefono: function (stringTelefono) {
		"use strict";
		var re = /^[0-9]+$/;
		if (stringTelefono.length < 8) {
			if (validar.auto_registrar_errores) {
				validar.registrar_error("telefono", "Ingrese el número de teléfono celular de 8 dígitos completo. Sin \"+569\"");
			}
			return false;
		} else if (!re.test(stringTelefono)) {
			if (validar.auto_registrar_errores) {
				validar.registrar_error("telefono", "Ingrese sólo números en el campo de teléfono");
			}
			return false;
		} else {
			return true;
		}
	},
	patente: function (stringPatente) {
		"use strict";
		var consonantes = "bcdfghjklmnpqrstvwxyz",
			vocales = "aeiou",
			numeros = "0123456789",
			letras = consonantes + vocales,
			patente = stringPatente.toLowerCase().split(""),
			resolverAntigua = function (arrayPatente) {
				if (letras.indexOf(arrayPatente[0]) === -1 || letras.indexOf(arrayPatente[1]) === -1) {
					return false;
				} else if (numeros.indexOf(arrayPatente[2]) === -1 || numeros.indexOf(arrayPatente[3]) === -1 || numeros.indexOf(arrayPatente[4]) === -1 || numeros.indexOf(arrayPatente[5]) === -1) {
					return false;
				} else {
					return true;
				}
			},
			resolverNueva = function (arrayPatente) {
				if (consonantes.indexOf(arrayPatente[0]) === -1 || consonantes.indexOf(arrayPatente[1]) === -1 || consonantes.indexOf(arrayPatente[2]) === -1 || consonantes.indexOf(arrayPatente[3]) === -1) {
					return false;
				} else if (numeros.indexOf(arrayPatente[4]) === -1 || numeros.indexOf(arrayPatente[5]) === -1) {
					return false;
				} else {
					return true;
				}
			};

		if ((resolverAntigua(patente) === true || resolverNueva(patente) === true) && patente.length === 6) {
			return true;
		} else {
			if (validar.auto_registrar_errores) {
				validar.registrar_error("patente", "Ha ingresado una patente no válida");
			}
			return false;
		}
	},
	numero: function (input, parse_bool) {
		"use strict";
		var p_bool = parse_bool !== undefined ? parse_bool : true;
		if (typeof input !== "number") {
			if (p_bool !== undefined && p_bool === true) {
				if (isNaN(parseInt(input, 10)) !== true) {
					return parseInt(input, 10);
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else if (typeof input === "number" && isNaN(parseInt(input, 10)) === true) {
			if (validar.auto_registrar_errores) {
				validar.registrar_error("numero", "Ha caracteres no válidos en un campo numérico");
			}
			return false;
		} else {
			return true;
		}
	},
	custom: function (input, permitidos, bool_distinguir_mayusculas) {
		"use strict";
		var distinguir_mayusculas_minusculas = typeof bool_distinguir_mayusculas === "boolean" ? bool_distinguir_mayusculas : false, //false por defecto
			array_input = input.split(""),
			i;
		for (i = 0; i < array_input.length; i += 1) {
			if (distinguir_mayusculas_minusculas) {
				if (permitidos.indexOf(array_input[i]) < 0) {
					return false;
				}
			} else {
				if (permitidos.indexOf(array_input[i].toLowerCase()) < 0) {
					return false;
				}
			}
		}
		return true;
	},
	tiene_valor: function (val) {
		"use strict";
		if (val !== "" && val !== undefined && val !== null) {
			return true;
		}
		return false;
	},
	tienen_valor_objeto: function (objeto) {
		"use strict";
		var key;
		if (typeof objeto !== "object" || Array.isArray(objeto)) {
			return null;
		}

		for (key in objeto) {
			if (objeto.hasOwnProperty(key)) {
				if (!validar.tiene_valor(objeto[key])) {
					return false;
				}
			}
		}

		return true;
	}
};

function validacionMasiva(parent_validacion, elementos_a_buscar, bool_selector_jquery, valor_o_texto) {
	"use strict";
	var tiene_error = false,
		a_buscar = elementos_a_buscar !== undefined ? elementos_a_buscar : "[data-validar]",
		usar_selector_jquery = bool_selector_jquery === true ? true : false,
		grupo_a_validar = usar_selector_jquery ? parent_validacion.find(a_buscar) : $(parent_validacion).find(a_buscar),
		errores = [];
	
	grupo_a_validar.each(function (index, element) {
		var validacion = $(element).attr("data-validar").toLowerCase(),
			e = $(element),
			mensaje_error_superior = $(element).attr("data-error"),
			opcional = typeof $(element).attr("data-opcional") !== "undefined" && $(element).attr("data-opcional") === "true" ? true : false,
			val = valor_o_texto === "text" ? $(element).text() : $(element).val(),
			mensaje_error,
			salida;
		
		if (opcional && !validar.tiene_valor(val)) {
			return true;
		}
		
		switch (validacion) {
		case "nombre":
			salida = validar.nombre(val);
			mensaje_error = "Ingrese su nombre";
			break;
		case "ciudad":
			salida = validar.nombre(val);
			mensaje_error = "Ingrese su ciudad";
			break;
		case "number":
		case "numero":
		case "número":
			salida = (typeof validar.numero(val, true) === "number");
			mensaje_error = "Ingrese un número válido";
			if ($(element)[0].hasAttribute("data-limpiar")) {
				salida = validar.numero(formatear.numero_clean(val), true);
			}
			break;
		case "select":
			salida = (val !== undefined && val !== null && val !== "");
			mensaje_error = "Seleccione una opción de la lista desplegable";
			break;
		case "rut":
			salida = validar.rut(val);
			mensaje_error = "Ingrese un rut válido";
			break;
		case "email":
		case "mail":
		case "correo":
			mensaje_error = "Ingrese un correo válido";
			salida = validar.email(val);
			break;
		case "titulo":
			salida = validar.custom(val, "abcdefghijklmnopqrstuvwxyzáéíóúäëïöüàèìòù`´ñ 0123456789-_!?¿¡':\"");
			if (salida && val.length < 4) {
				salida = false;
			}
			mensaje_error = "Ha ingresado un título no válido";
			break;
		case "apellido":
			mensaje_error = "Ingrese al menos un apellido";
			salida = validar.apellidos(val);
			break;
		case "nombre-completo":
		case "full-name":
			mensaje_error = "Ingrese su nombre completo (al menos primer nombre y primer apellido)";
			salida = validar.apellidos(val, true);
			break;
		case "apellidos":
			mensaje_error = "Ingrese ambos apellidos";
			salida = validar.apellidos(val, true);
			break;
		case "telefono":
			salida = validar.telefono(val);
			mensaje_error = "Ingrese su teléfono";
			break;
		case "patente":
			salida = validar.patente(val);
			mensaje_error = "Ingrese una patente válida";
			break;
		case "radio":
		case "checkbox":
			salida = $("input[name=" + e.attr("name") + "]").is(":checked");
			mensaje_error = "Seleccione al menos un elemento del grupo \"" +  formatear.uc_first(e.attr("name").replace(/\-/, " ").replace(/\_/, " ")) + "\"";
			break;
		case "generico":
		case "generica":
		case "comun":
		case "common":
			salida = (val !== undefined && val !== null && val !== "");
			mensaje_error = "Ingrese lo solicitado en el campo";
			break;
		}
		
		if (salida !== true) {
			tiene_error = true;
			if (validar.tiene_valor(mensaje_error_superior)) {
				mensaje_error = mensaje_error_superior;
			}
			
			if (errores.indexOf(mensaje_error) < 0) {
				if (validar.tiene_valor(mensaje_error)) {
					errores.push(mensaje_error);
				} else if (salida !== false) {
					errores.push(salida);
				} else {
					errores.push("Ha rellenado mal un campo");
				}
			}
		}
	});
	
	if (tiene_error) {
		alert("Se han encontrado los siguientes errores:\n- " + errores.join(".\n- ") + ".");
	}
	
	return tiene_error === false;
}
//validar endregion

//reemplazo region
function reemplazo_texto(entrada, objeto_reemplazo) {
	"use strict";
	var input = entrada,
		a_reemplazar,
		key;
	if (input.indexOf("{{") >= 0 && typeof objeto_reemplazo === "object" && !Array.isArray(objeto_reemplazo)) {
		for (key in objeto_reemplazo) {
			if (objeto_reemplazo.hasOwnProperty(key)) {
				input = input.replace("{{" + key + "}}", objeto_reemplazo[key]);
			}
		}

		if (input.indexOf("{{") >= 0) {
			while (input.indexOf("{{") >= 0) {
				a_reemplazar = input.indexOf("}}") >= 0 ? input.slice(input.indexOf("{{"), input.indexOf("}}")) : "{{";
				input = input.replace(a_reemplazar, "");
			}
        }
		return input;
	}
}
//reemplazo endregion

//carro region
var carro = {
	content: localStorage.hasOwnProperty("carro") ? JSON.parse(localStorage.getItem("carro")) : {},
	add: {
		tour: function (id, cupos, callback) {
			"use strict";
			carro.update();
			carro.check.cupos(id, cupos, "tour", function (obj) {
				if (obj.hay_cupos) {
					carro.push(id, cupos, "tour");
				}
				if (callback !== undefined) {
					callback(obj.hay_cupos, carro.content);
				}
			});
		},
		articulo: function (id, cupos, callback) {
			"use strict";
			carro.update();
			carro.check.cupos(id, cupos, "articulo", function (obj) {
				if (obj.hay_cupos) {
					carro.push(id, cupos, "articulo");
				}
				if (callback !== undefined) {
					callback(obj.hay_cupos, carro.content);
				}
			});
		},
	},
	check: {
		cupos: function (id, cupos, tipo, callback) {
			"use strict";
			var url_check = home_url + "chechear_cupos";
			$.ajax({
				type: "POST",
				url: url_check,
				data: {
					id: id,
					cupos: cupos,
					tipo: tipo
				},
				success: function (obj) {
					if (obj.status) {
						if (callback !== undefined) {
							callback(obj);
						}
					} else {
						alert("Se ha producido un error");
					}
				},
				error: function () {
					errorAjax("0065");
				},
			});
		},
		cupos_todos: function (callback) {
			"use strict";
			var url_check = home_url + "/checkear_cupos_todos";
			$.ajax({
				type: "POST",
				url: url_check,
				data: {
					carro: carro.content,
					metodo: "global"
				},
				success: function (obj) {
					if (obj.status) {
						if (callback !== undefined) {
							callback(obj);
						}
					} else {
						alert("Se ha producido un error");
					}
				},
				error: function () {
					errorAjax("0068");
				},
			});
		}
	},
	info: function (callback) {
		"use strict";
		$.ajax({
			type: "POST",
			url: home_url + "info",
			data: carro.content,
			success: function (obj) {
				if (callback !== undefined) {
					callback(obj);
				} else {
					return obj;
				}
			},
			error: function () {
				errorAjax("0067");
			}
		});
	},
	clear: function (callback) {
		"use strict";
		localStorage.removeItem("carro");
		carro.content = {};
		if (callback !== undefined) {
			callback();
		}
	},
	reserve: function (data_usuario, data_carro, data_conserje, callback) {
		"use strict";
		$.ajax({
			type: "POST",
			url: home_url + "reservar",
			data: {
				data_usuario: data_usuario,
				data_carro: data_carro,
				data_conserje: data_conserje
			},
			success: function (obj) {
				console.log(obj);
				if (callback !== undefined) {
					callback(obj);
				}
			},
			error: function () {
				errorAjax("0066");
			}
		});
	},
	push: function (id, cupos, tipo) {
		"use strict";
		if (!carro.content.hasOwnProperty(tipo)) {
			carro.content[tipo] = {};
		}
		carro.content[tipo][id] = cupos;
		carro.save();
	},
	remove: {
		tour: function (id, callback) {
			"use strict";
			carro.update();
			delete carro.content.tour[id];
			carro.save();
			if (callback !== undefined) {
				callback(true, carro.content);
			}
		},
		articulo: function (id, callback) {
			"use strict";
			carro.update();
			delete carro.content.articulo[id];
			carro.save();
			if (callback !== undefined) {
				callback(true, carro.content);
			}
		},
	},
	save: function () {
		"use strict";
		localStorage.setItem("carro", JSON.stringify(carro.content));
	},
	total: function (callback) {
		"use strict";
		carro.info(function (obj) {
			var key,
				totales = 0;
			if (obj.hasOwnProperty("tour")) {
				for (key in obj.tour) {
					if (obj.tour.hasOwnProperty(key)) {
						totales += obj.tour[key].total;
					}
				}
			}
			
			if (obj.hasOwnProperty("articulo")) {
				for (key in obj.articulo) {
					if (obj.tour.hasOwnProperty(key)) {
						totales += obj.articulo[key].total;
					}
				}
			}
			if (callback !== undefined) {
				callback({status: true, total: totales});
			} else {
				return totales;
			}
		});
	},
	update: function () {
		"use strict";
		if (localStorage.hasOwnProperty("carro")) {
			if (JSON.stringify(carro.content) !== localStorage.getItem("carro")) {
				carro.content = localStorage.hasOwnProperty("carro") ? JSON.parse(localStorage.hasOwnProperty("carro")) : {};
			}
		} else {
			if (typeof carro !== "object") {
				carro.content = {};
			}
		}
	}
};
//carro endregion

//llamadas region
$("input.rut, [data-validar='rut']").on("focusout", function () {
	"use strict";
	var v = $(this).val();
	if (v.length > 3 && validar.rut(v)) {
		$(this).val(formatear.rut(v));
	}
});

//llamadas endregion