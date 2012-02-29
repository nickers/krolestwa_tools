function jQueryReady(){
	/*Clipline*/
	$("#clipliner").liScroll({travelocity: 0.09}).click(function(){
		window.location.href = "./EcranPrincipal.php?l=10&a=2";
	});
	/*AAP*/
	var DepechesID = new Array();
	var compteurAAP = 0;
	$.ajax({
		dataType:"json",
		type:"GET",
		url:"AffichageTitresDepeches.php",
		success:function(data, textStatus, XMLHttpRequest){
			var htmlAap = '<div id="aap_scroller">';
			/*$(data).find("depeche").each(function(){
				DepechesID.push($(this).find("id").text());
				htmlAap += '<div id="depeche_'+$(this).find("id").text()+'"><a class="lien_default" href="http://www.degloriaregni.com/KAP/index.php?id_depeche='+$(this).find("id").text()+'">'+$(this).find("titre").text()+'</a></div>';
			});*/
			for(var i = 0;i<5;i++)
			{
				DepechesID.push(data.IDs[i]);
				htmlAap += '<div id="depeche_'+data.IDs[i]+'"><a class="lien_default" href="http://www.degloriaregni.com/KAP/index.php?id_depeche='+data.IDs[i]+'">'+data.Titres[i]+'</a></div>';
			}
			htmlAap += '</div>';
			$("#zone_aap").html(htmlAap);
			scrollDepeche();
		}
	});
	function scrollDepeche(){
		compteurAAP++;
		if(compteurAAP==5)
		{
			var theTop = "+=480";
			compteurAAP=0;
		}
		else
		{
			var theTop = "-=120px";
		}
		$("#aap_scroller").delay(5000).animate({
			top:theTop
		},"slow",function(){
			scrollDepeche();
		});
	}

	if(!$.support.opacity)
	{
		$("#product_box").css({
			visibility:"visible",
			top:"-447px",
			position:"relative"
		}).animate({
			top:"0px"
		},"normal",function(){
			$(this).delay(5000).animate({
				top:"1160px"
			},"normal",function(){
				$(this).css("display","none");
			});
		}).click(function(){
			$(this).stop().css("display","none");
		});
	}
	else
	{

		$("#product_box").css({
			opacity:0,
			visibility:"visible",
			top:"-47px",
			position:"relative"
		}).animate({
			opacity:1,
			top:"0px"
		},"normal",function(){
			$(this).delay(5000).animate({
				opacity:0,
				top:"160px"
			},"normal",function(){
				$(this).css("display","none");
			});
		}).click(function(){
			$(this).stop().css("display","none");
		});
	}
//	if(optTooltips)
//	{
//		$(".c_lieu_village").hover(function(){
//			$(this).find("div").eq(1).stop().animate({
//				height:"60px"
//			}, "normal", function(){
//			});
//		}, function(){
//			$(this).find("div").eq(1).stop().animate({
//				height:"0px"
//			}, "normal", function(){
//
//			});
//		});
//	}
//
    //tooltips
    if(optTooltips)
	{
        $(".lieu_village").hover(function(){
			$(this).find("div").eq(0).stop().animate({
				height:"40px"
			}, "normal", function(){
			});
		}, function(){
			$(this).find("div").eq(0).stop().animate({
				height:"0px"
			}, "normal", function(){

			});
		});
    }

	$("div.zone_carte div:first").scrollMap({
		widthConteneur:630,
		heightConteneur:402,
		widthContenu:640,
		heightContenu:parseInt($("#ImgCarte").attr("height"))
	});

	$("#utiliser1184").live("click",function(){
		$("#conteneurInfosNoel").css("display","block");
	});
		//panoplies
	if($("div.popupPanoplieJS").length>0)
	{
		$("a.panoplieBtnzoom").live("click",function(){

			var num = $(this).data("num");
			$("div.popupPanoplieJS").eq(num).show();
		});

		$("a.panoFemme").live("click",function(){
			var obj = $(this).parents(".popupPanoplieJS").find("div.illustration img:first");
			$(obj).attr("src",$(obj).data("imageFemme"));
			$(this).addClass("femmeActif").removeClass("femme");
			$(this).next().addClass("homme").removeClass("hommeActif");
		});

		$("a.panoHomme").live("click",function(){
			var obj = $(this).parents(".popupPanoplieJS").find("div.illustration img:first");
			$(obj).attr("src",$(obj).data("imageHomme"));
			$(this).addClass("hommeActif").removeClass("homme");
			$(this).prev().addClass("femme").removeClass("femmeActif");
		});

		$("div.packContentHabits").live("mouseenter",function(){
			$(this).find(".cachePanoplie").show();
		});
		$("div.packContentHabits").live("mouseleave",function(){
			$(this).find(".cachePanoplie").hide();
		});
	}
		//page microachattoken
	if($("#ecranMicroAchatjQuery").length>0)
	{
		$("select.cout").live("change",function(){
			$(this).parent().find("div.boutonMicropaiement .prix:first").text($(this).val());
		});

		packActif = -1;
		$("a.packsTokens").live("click",function(){
			if(true)
			{
				packActif = $(this).index();
				$("a.packsTokensActif").removeClass("packsTokensActif");
				$("a.packsMoyenPaiement").removeClass("packsMoyenPaiementInactif");
				$(this).addClass("packsTokensActif");

				if($(this).hasClass("packsTokensInactif"))
				{
					$(this).removeClass("packsTokensInactif");
					$("a.packsMoyenPaiementActif").removeClass("packsMoyenPaiementActif");
					paiementActif = -1;
				}
				if(paiementActif != -1 && packActif != -1)
					$("#tokenContinuer").removeAttr("disabled");
				else
					$("#tokenContinuer").attr("disabled","disabled");

				$.each(lotsTokens,function(i,e){
					if(!e.offres[packActif].hasOwnProperty("tokens"))
					{
						$("#Paiement"+i).addClass("packsMoyenPaiementInactif");
					}
				});

				$("#phraseRecap").html(generePhraseRecap());
				gereNumeros();
			}

		});

		paiementActif = -1;
		$("a.packsMoyenPaiement").live("click",function(){
			if(true)
			{
				paiementActif = $(this).index();
				$("a.packsMoyenPaiement").removeClass("packsMoyenPaiementActif");
				$("a.packsTokens").removeClass("packsTokensInactif");
				$(this).addClass("packsMoyenPaiementActif");

				if($(this).hasClass("packsMoyenPaiementInactif"))
				{
					$(this).removeClass("packsMoyenPaiementInactif");
					$("a.packsTokensActif").removeClass("packsTokensActif");
					packActif = -1;
				}
				if(paiementActif != -1 && packActif != -1)
					$("#tokenContinuer").removeAttr("disabled");
				else
					$("#tokenContinuer").attr("disabled","disabled");
				$.each(lotsTokens[paiementActif].offres,function(i,e){
					if(!e.hasOwnProperty("tokens"))
						$("#Token"+i).addClass("packsTokensInactif");
					else
					{
						$("#Token"+i).find(".packsTokensValeur").html(Math.floor(e.tokens*(1+parseFloat((lotsTokens[paiementActif].pourcentageTokensBonus/100))))+ '<span class="iconeToken"></span>')
							.end().find(".packsTokensTotal").html(numberFormat(e.prix*(1+taxe)/100));

						if(e.prix!=e.prixNormal)
						{
							$("#Token"+i).find(".packsTokensRemise").html(numberFormat((e.prixNormal-e.prix)*(1+taxe)/100));
							$("#Token"+i).find(".packsTokensBonus").html(Math.abs(((e.prix-e.prixNormal) / e.prixNormal)*100)+"%");
						}
					}
				});

				$("#phraseRecap").html(generePhraseRecap());
				gereNumeros();
			}

		});



		$("#tokenContinuer").live("click",function(e){
			e.preventDefault();

			if(paiementActif != -1 && packActif != -1)
			{
				switch(lotsTokens[paiementActif]['nom'])
				{
					case "Paypal":paypal();
						break;
					default:$("#valPack").val(packActif);
							$("#valMP").val(paiementActif);
							$(this).parent().submit();
				}

			}
		});

		$("span.infoBullePaiement").css({
			opacity:0
		});

		$("span.caseAbonnement").live("click",function(e){
			if($(this).parents(".blocPack").hasClass("desactive"))
				return false;
			e.preventDefault();

			var IDPack = $(this).data("idpack");
			$.ajax("Ajax.php",{data:{"action":"renouvellerPack","IDPack":IDPack}});
			$(this).toggleClass("abonnementActif abonnementInactif");
		});

		$("a.tooltipMicropaiement").hover(function(){
			$(this).next().stop().css("display","block").animate({opacity:1});
		},function(){
			$(this).next().stop().animate({opacity:0},function(){
				$(this).css("display","none");
			});
		});

		$("#choixPays").live("change",function(){
			$("#formChoixPays").submit();
		});

		$("div.boutonRenouveler").live("click",function(){
			var action = $(this).attr("data-action");
			if(action=="submit")
			{
				$(this).parents("form.achatService").submit();
			}else if(action=="nav")
			{
				navigationEnProfondeur($(this).attr("data-valeur"));
			}
		});

		function generePhraseRecap(){
			if(packActif==-1)
			{
				$("#tokenContinuer").css("opacity",0.6);
				return langToken.PhraseRecap2;
			}
			if(paiementActif==-1)
			{
				$("#tokenContinuer").css("opacity",0.6);
				return langToken.PhraseRecap3;
			}
			var tmp = langToken.PhraseRecap;
			var ID = packActif+1;
			tmp = tmp.replace("%NombreToken%",'<span class="elementsImportants">'+Math.floor(lotsTokens[paiementActif].offres[packActif].tokens*(1+parseFloat((lotsTokens[paiementActif].pourcentageTokensBonus/100)))) +'</span><span class="iconeToken"></span>');
			tmp = tmp.replace("%PrixToken%",'<span class="elementsImportants">'+numberFormat(lotsTokens[paiementActif].offres[packActif].prix*(1+taxe)/100)+' </span>');
			tmp = tmp.replace("%Nom%",'<span class="elementsImportants">'+lotsTokens[paiementActif].nomComplet+'</span>');
			if(lotsTokens[paiementActif].offres[packActif].zongPlus=="oui")
				tmp = tmp + " "+langToken.PhraseRecapZong;
			else if(lotsTokens[paiementActif].offres[packActif].zongPlus=="facture")
				tmp = tmp + " "+langToken.PhraseRecapZong2;
			$("#tokenContinuer").css("opacity",1);
			return tmp;
		}

		function numberFormat(number){
			number =  parseFloat(number).toFixed(2);
			number = number.toString();
			number = number.replace(".",",");
			if(lotsTokens[paiementActif].devise != undefined)
				return number + lotsTokens[paiementActif].devise;
			else
				return number+" &euro;";
		}

		function paypal(){
			//$("#btnPaypal").trigger('click');
			var idProduit = 0;
			idProduit += packActif;
			if($("#login_offrir").val()!=""&&$("#pourOffrir").is(":checked"))
			{
				var loginAcheteur = Login;
				var loginDestinataire = $("#login_offrir").val();
			}
			else
			{
				var loginAcheteur = Login;
				var loginDestinataire = Login;
			}
			$('<form name="form_paypal2" action="https://www.paypal.com/cgi-bin/webscr" method="post"> <input name="cmd" value="_xclick" type="hidden"> <input name="business" value="levansard@yahoo.fr" type="hidden"> <input type="hidden" value="1" name="undefined_quantity"> <input name="item_name" value="Tokens" type="hidden"> <input name="item_number" value="'+idProduit+'" type="hidden"> <input name="on0" value="login" type="hidden"> <input name="os0" value="'+loginDestinataire+'" type="hidden"> <input name="on2" value="acheteur" type="hidden"> <input name="os2" value="'+loginAcheteur+'" type="hidden"> <input name="amount" value="'+Math.round((lotsTokens[paiementActif].offres[packActif].prix / (1+taxePP)))/100+'" type="hidden"> <input name="tax" value="'+Math.round(lotsTokens[paiementActif].offres[packActif].prix-(lotsTokens[paiementActif].offres[packActif].prix / (1+taxePP)))/100+'" type="hidden"> <input name="shipping" value="0" type="hidden"> <input name="no_shipping" value="1" type="hidden"> <input name="return" value="http://'+window.location.hostname+'/EcranPrincipal.php?l=10&a=0&b=2" type="hidden"> <input name="currency_code" value="EUR" type="hidden"> <input name="lc" value="" type="hidden"> </form>').appendTo("body").submit();
			/*$.ajax("Ajax.php",{
				data:{"action":"paypal","valMP":paiementActif,"valPack":packActif},
				success:function(data){
					console.log(data);
					$("#PPDGFrame iframe").attr("src","https://www.paypal.com/incontext?token="+data.token);
				}
			});*/
		}

		function gereNumeros(){

			if(paiementActif != -1 && packActif != -1)
				$("div.micropaiementPacksTokens").removeClass("micropaiementPacksTokensInactif");
			else if(paiementActif != -1)
				$("div.micropaiementPacksTokens").addClass("micropaiementPacksTokensInactif").eq(1).removeClass("micropaiementPacksTokensInactif");
			else if(packActif != -1)
				$("div.micropaiementPacksTokens").addClass("micropaiementPacksTokensInactif").eq(0).removeClass("micropaiementPacksTokensInactif");
			else
				$("div.micropaiementPacksTokens").addClass("micropaiementPacksTokensInactif");
		}

		if($("#btnPaypal").length>0)
		{
			var dg = new PAYPAL.apps.DGFlow({
				// the HTML ID of the form submit button which calls setEC
				trigger: "btnPaypal"
			});
		}

		$("#pourOffrir").live("click",function(){
			if($(this).is(":checked"))
			{
				jPrompt("Entrez le login du destinataire : ","","Destinataire du cadeau",function(login){
					$("#login_offrir").val($.trim(login));
					$.ajax("Ajax.php",{
						data:{"action":"offrir","login":login},
						success:function(data){
							if(data.existe!="oui")
							{
								jAlert("Ce personnage n'existe pas.","Erreur");
								$("#pourOffrir").removeAttr("checked");
								$("#login_offrir").val("");
							}
						}
					});
				});
			}
			else
			{
				$("#login_offrir").val("");
			}
		});
	}

/* Fin jQueryReady */
}
window.name="EP";

function popupPerso(page)
{
	fenetre = window.open(page,'perso', 'top=0px, left=0px, width=600px, height=660px, resizable=no, toolbar=no, scrollbars=no, status=no, menubar=no, titlebar=no, dependent=yes');
	fenetre.window.focus();
}
function popupMail(page)
{
	fenetre = window.open(page,'mail', 'top=0px, left=0px, width=600px, height=600px, resizable=no, toolbar=no, scrollbars=no, status=no, menubar=no, titlebar=no, dependent=yes');
	return true;
}
function popupNoel(page)
{
	fenetre = window.open(page,'noel', 'top=0px, left=0px, width=600px, height=660px, resizable=no, toolbar=no, scrollbars=no, status=no, menubar=no, titlebar=no, dependent=yes');
	return true;
}
function popupChat2(page)
{
  fenetre = window.open(page,'chat', 'top=0, left=0, width=800, height=500, resizable=no, toolbar=no, scrollbars=no, status=no, menubar=no, titlebar=no, dependent=yes');
}
function popupChat3(page)
{
  fenetre = window.open(page,'chat3', 'top=0, left=0, width=1000, height=700, resizable=no, toolbar=no, scrollbars=no, status=no, menubar=no, titlebar=no, dependent=yes');
}
function popupTarentelle(page)
{
  fenetre = window.open(page,'tarentelle', 'top=0, left=0, width=1000, height=760, resizable=no, toolbar=no, scrollbars=no, status=no, menubar=no, titlebar=no, dependent=yes');
}
function pseudoPopupConnectes()
{
	if (document.getElementById('conteneurPersonnesEnLigne').style.visibility == 'visible')
		document.getElementById('conteneurPersonnesEnLigne').style.visibility = 'hidden';
	else
		document.getElementById('conteneurPersonnesEnLigne').style.visibility = 'visible';
}
function modifiePub(emplacement)
{
	var httpRequest = false;
	if(window.XMLHttpRequest)
	{
		// Mozilla, Safari,...
		httpRequest = new XMLHttpRequest();
		if (httpRequest.overrideMimeType)
			httpRequest.overrideMimeType('text/xml');
	}
	else if(window.ActiveXObject)
	{
		// IE
		try
		{
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				httpRequest = new AciveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{;}
		}
	}
	//
	if(!httpRequest)
	{
		//alert('Abandon :( Impossible de créer une instance XMLHTTP');
		return false;
	}
	//
	httpRequest.onreadystatechange = function() { retourModifiePub(httpRequest, emplacement); };
	httpRequest.open('GET', 'FonctionsPublicite.php?o='+emplacement, true);
	httpRequest.send(null);
}
function retourModifiePub(httpRequest, emplacement)
{
	 if (httpRequest.readyState == 4)
	 {
		if (httpRequest.status == 200)
		{
			var retour = httpRequest.responseText;
			alert (retour);
			document.getElementById(emplacement).innerHTML = retour;
		}
	}
}
function in_array(valeur, tableau)
{
    for(var i = 0, l = tableau.length; i < l; i++)
    {
        if(tableau[i] == valeur)
            return true;
    }
    return false;
}
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 * Copyright 2008 George McGinley Smith
 * All rights reserved.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});
/*!
 * liScroll 1.0
 * http://www.gcmingati.net/wordpress/wp-content/lab/jquery/newsticker/jq-liscroll/scrollanimate.html
 * 2007-2010 Gian Carlo Mingati
 *
 */
jQuery.fn.liScroll = function(settings) {
		settings = jQuery.extend({
		travelocity: 0.07
		}, settings);
		return this.each(function(){
				var $strip = jQuery(this);
				$strip.addClass("newsticker")
				var stripWidth = 0;
				var $mask = $strip.wrap("<div class='mask'></div>");
				var $tickercontainer = $strip.parent().wrap("<div class='tickercontainer'></div>");
				var containerWidth = $strip.parent().parent().width();	//a.k.a. 'mask' width
				$strip.find("li").each(function(i){
				stripWidth += jQuery(this, i).outerWidth(true);
				stripWidth += 100; // thanks to Michael Haszprunar
				});
				$strip.width(stripWidth);
				var totalTravel = stripWidth+containerWidth;
				var defTiming = totalTravel/settings.travelocity;	// thanks to Scott Waye
				function scrollnews(spazio, tempo){
				var beforeAnim = jQuery.fx.off;
				jQuery.fx.off = false;
				$strip.animate({left: '-='+ spazio}, tempo, "linear", function(){$strip.css("left", containerWidth); scrollnews(totalTravel, defTiming);});
				jQuery.fx.off = beforeAnim;
				}
				scrollnews(totalTravel, defTiming);
				$strip.hover(function(){
				jQuery(this).stop();
				},
				function(){

				var offset = jQuery(this).offset();
				var residualSpace = offset.left + stripWidth;
				var residualTime = residualSpace/settings.travelocity;
				scrollnews(residualSpace, residualTime);

				});
		});
};

(function(g){g.fn.scrollMap=function(l){var a=g.extend({},g.fn.scrollMap.defaultOptions,l),c=this,f=this.parent(),d=false,e=false,j={left:a.zoneInteractiveX/100*a.widthConteneur,right:a.widthConteneur-a.zoneInteractiveX/100*a.widthConteneur,top:a.zoneInteractiveY/100*a.heightConteneur,bottom:a.heightConteneur-a.zoneInteractiveY/100*a.heightConteneur};c.css({width:a.widthContenu+"px",height:a.heightContenu+"px",left:a.startX+"px",top:a.startY+"px",position:"relative"});f.css({width:a.widthConteneur+
"px",height:a.heightConteneur+"px",overflow:"hidden",unselectable:"on","-moz-user-select":"none","-webkit-user-select":"none"});f.mousemove(function(h){var b=g(this).offset(),k=h.pageX-b.left;h=h.pageY-b.top;b=c.css("left");b=parseFloat(b.substr(0,b.length-2));b=-b;var i=c.css("top");i=parseFloat(i.substr(0,i.length-2));if(k<=j.left){if(!d){c.animate({left:"0px"},{duration:2*(b+1),easing:a.easing,queue:false});d=true;f.css("cursor","move")}}else if(k>=j.right){if(!d){c.animate({left:"-"+(a.widthContenu-
a.widthConteneur)+"px"},{duration:2*(a.widthContenu-a.widthConteneur-b+1),easing:a.easing,queue:false});d=true;f.css("cursor","move")}}else if(d)d=false;if(h<=j.top){if(!e){c.animate({top:"0px"},{duration:5*(-i+1),easing:a.easing,queue:false});e=true;f.css("cursor","move")}}else if(h>=j.bottom){if(!e){c.animate({top:"-"+(a.heightContenu-a.heightConteneur)+"px"},{duration:5*(a.heightContenu-a.heightConteneur+i+1),easing:a.easing,queue:false});e=true;f.css("cursor","move")}}else if(e)e=false;if(!d&&
!e){c.stop();f.css("cursor","auto")}}).mouseleave(function(){c.stop();e=d=false});return this};g.fn.scrollMap.defaultOptions={widthConteneur:900,heightConteneur:560,widthContenu:2400,heightContenu:700,startX:0,startY:0,zoneInteractiveX:12,zoneInteractiveY:12,easing:"easeInSine"}})(jQuery);

(function(a){a.alerts={verticalOffset:-75,horizontalOffset:0,repositionOnResize:!0,overlayOpacity:0.01,overlayColor:"#FFF",draggable:!0,okButton:"&nbsp;OK&nbsp;",cancelButton:"&nbsp;Cancel&nbsp;",dialogClass:null,alert:function(b,c,d){null==c&&(c="Alert");a.alerts._show(c,b,null,"alert",function(a){d&&d(a)})},confirm:function(b,c,d){null==c&&(c="Confirm");a.alerts._show(c,b,null,"confirm",function(a){d&&d(a)})},prompt:function(b,c,d,f){null==d&&(d="Prompt");a.alerts._show(d,b,c,"prompt",function(a){f&& f(a)})},_show:function(b,c,d,f,e){a.alerts._hide();a.alerts._overlay("show");a("BODY").append('<div id="popup_container"><h1 id="popup_title"></h1><div id="popup_content"><div id="popup_message"></div></div></div>');a.alerts.dialogClass&&a("#popup_container").addClass(a.alerts.dialogClass);var g=a.browser.msie&&6>=parseInt(a.browser.version)?"absolute":"fixed";a("#popup_container").css({position:g,zIndex:99999,padding:0,margin:0});a("#popup_title").text(b);a("#popup_content").addClass(f);a("#popup_message").text(c); a("#popup_message").html(a("#popup_message").text().replace(/\n/g,"<br />"));a("#popup_container").css({minWidth:a("#popup_container").outerWidth(),maxWidth:a("#popup_container").outerWidth()});a.alerts._reposition();a.alerts._maintainPosition(!0);switch(f){case "alert":a("#popup_message").after('<div id="popup_panel"><input type="button" value="'+a.alerts.okButton+'" id="popup_ok" /></div>');a("#popup_ok").click(function(){a.alerts._hide();e(!0)});a("#popup_ok").focus().keypress(function(b){(13== b.keyCode||27==b.keyCode)&&a("#popup_ok").trigger("click")});break;case "confirm":a("#popup_message").after('<div id="popup_panel"><input type="button" value="'+a.alerts.okButton+'" id="popup_ok" /> <input type="button" value="'+a.alerts.cancelButton+'" id="popup_cancel" /></div>');a("#popup_ok").click(function(){a.alerts._hide();e&&e(!0)});a("#popup_cancel").click(function(){a.alerts._hide();e&&e(!1)});a("#popup_ok").focus();a("#popup_ok, #popup_cancel").keypress(function(b){13==b.keyCode&&a("#popup_ok").trigger("click"); 27==b.keyCode&&a("#popup_cancel").trigger("click")});break;case "prompt":a("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="'+a.alerts.okButton+'" id="popup_ok" /> <input type="button" value="'+a.alerts.cancelButton+'" id="popup_cancel" /></div>'),a("#popup_prompt").width(a("#popup_message").width()),a("#popup_ok").click(function(){var b=a("#popup_prompt").val();a.alerts._hide();e&&e(b)}),a("#popup_cancel").click(function(){a.alerts._hide(); e&&e(null)}),a("#popup_prompt, #popup_ok, #popup_cancel").keypress(function(b){13==b.keyCode&&a("#popup_ok").trigger("click");27==b.keyCode&&a("#popup_cancel").trigger("click")}),d&&a("#popup_prompt").val(d),a("#popup_prompt").focus().select()}if(a.alerts.draggable)try{a("#popup_container").draggable({handle:a("#popup_title")}),a("#popup_title").css({cursor:"move"})}catch(h){}},_hide:function(){a("#popup_container").remove();a.alerts._overlay("hide");a.alerts._maintainPosition(!1)},_overlay:function(b){switch(b){case "show":a.alerts._overlay("hide"); a("BODY").append('<div id="popup_overlay"></div>');a("#popup_overlay").css({position:"absolute",zIndex:99998,top:"0px",left:"0px",width:"100%",height:a(document).height(),background:a.alerts.overlayColor,opacity:a.alerts.overlayOpacity});break;case "hide":a("#popup_overlay").remove()}},_reposition:function(){var b=a(window).height()/2-a("#popup_container").outerHeight()/2+a.alerts.verticalOffset,c=a(window).width()/2-a("#popup_container").outerWidth()/2+a.alerts.horizontalOffset;0>b&&(b=0);0>c&&(c= 0);a.browser.msie&&6>=parseInt(a.browser.version)&&(b+=a(window).scrollTop());a("#popup_container").css({top:b+"px",left:c+"px"});a("#popup_overlay").height(a(document).height())},_maintainPosition:function(b){if(a.alerts.repositionOnResize)switch(b){case !0:a(window).bind("resize",a.alerts._reposition);break;case !1:a(window).unbind("resize",a.alerts._reposition)}}};jAlert=function(b,c,d){a.alerts.alert(b,c,d)};jConfirm=function(b,c,d){a.alerts.confirm(b,c,d)};jPrompt=function(b,c,d,f){a.alerts.prompt(b, c,d,f)}})(jQuery);