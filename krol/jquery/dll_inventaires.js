var numeroOptionItemOuvert = -1;
var typeOptionsItemOuvert = '';
var param0ItemOuvert = -1;
var param1ItemOuvert = -1;
var param2ItemOuvert = -1;
var param3ItemOuvert = -1;
var basculeCouranteItem = '';


function InitialiseInventaire()
{
	jQuery("div.inventaire_contenu_02").css("height","0px");
	numeroOptionItemOuvert = -1;
	typeOptionsItemOuvert = '';
	param0ItemOuvert = -1;
	param1ItemOuvert = -1;
	param2ItemOuvert = -1;
	param3ItemOuvert = -1;
	basculeCouranteItem = '';
}

function ouvreOptionsItem(numero, typeOptions, param0, param1, param2, param3)
{
	if (numeroOptionItemOuvert != -1)
	{
		var valeur1 = numeroOptionItemOuvert;
		var valeur2 = typeOptionsItemOuvert;
		var valeur3 = param0ItemOuvert;
		var valeur4 = param1ItemOuvert;
		var valeur5 = param2ItemOuvert;
		var valeur6 = param3ItemOuvert;
		if (typeOptionsItemOuvert == 'vendre')
		{
			if (typesInventaires[idOngletActif] == 'InventairePersonnage')
			{
				document.getElementById('vente0').style.visibility = 'hidden';
				document.getElementById('vente1').style.visibility = 'hidden';
			}
		}
		else if(typeOptionsItemOuvert == 'transferer')
		{
			if ((typesInventaires[idOngletActif] == 'InventairePersonnage') || (typesInventaires[idOngletActif] == 'InventairePropriete'))
				document.getElementById('transfert0').style.visibility = 'hidden';
			if (typesInventaires[idOngletActif] == 'InventairePersonnage')
			{
				document.getElementById('transfert1').style.visibility = 'hidden';
				document.getElementById('transfert2').style.visibility = 'hidden';
				document.getElementById('transfert3').style.visibility = 'hidden';
			}
		}
		document.getElementById(typeOptionsItemOuvert+idOngletActif+numeroOptionItemOuvert).style.backgroundPosition='top left';
		document.getElementById(typeOptionsItemOuvert+idOngletActif+numeroOptionItemOuvert).onclick = function () { ouvreOptionsItem(valeur1, valeur2, valeur3, valeur4, valeur5, valeur6) };
	}
	var valeurb1 = numero;
	var valeurb2 = typeOptions;
	var valeurb3 = param0;
	var valeurb4 = param1;
	var valeurb5 = param2;
	var valeurb6 = param3;
	document.getElementById(typeOptions+idOngletActif+numero).style.backgroundPosition='top right';
	document.getElementById(typeOptions+idOngletActif+numero).onclick = function () { fermeOptionsItem(valeurb1, valeurb2, valeurb3, valeurb4, valeurb5, valeurb6) };
	if (typeOptions == 'vendre')		// Param�tres : 0 = quantit�,  1 = prix d'achat mairie, 2 = prix vente min, 3 = prix vente max
	{
		basculeCouranteItem = 'vendreMarche';
		var contenu = '<form method="post" action="Action.php?action=10&type='+numero;
		if (typesInventaires[idOngletActif] == 'InventaireMandat')
			contenu += '&mandat=1';
		else if (typesInventaires[idOngletActif] == 'InventaireComte')
			contenu += '&mairie=2&MarcheComte=1';
		else if (typesInventaires[idOngletActif] == 'InventaireMairie')
			contenu += '&mairie=1';
		else if (typesInventaires[idOngletActif] == 'InventaireArmee')
			contenu += '&mairie=4';
		contenu += '"><div class="inventaire_contenu_02_nbre">'+lang_inventaire['QuantiteAVendre'];
		contenu += '<input type="hidden" id="destination" name="destination" value="vendreMarche">';
		contenu += '<select name="quantite">';
		for (var i=1; i<=param0; i++)
			contenu += '<option value="'+i+'">'+i+'</option>';
		contenu += '</select>';
		contenu += '</div><div class="inventaire_contenu_02_option00">';
		contenu += '<div class="inventaire_contenu_02_option01"><a class="inventaire_marche" id="vendreMarche" onclick="return false;" style="background-position:top right;" ></a>&nbsp;'+lang_inventaire['Prix'];
		contenu += '<select name="prix">';
		for (var i=param2; i<=param3; i++)
			contenu += '<option value="'+i+'">'+i+'</option>';
		contenu += '</select>'+lang_inventaire['EcusEt'];
		contenu += '<select name="centimes">';
		for (var i=0; i<100; i+=5)
			contenu += '<option value="'+i+'">'+i+'</option>';
		contenu += '</select></div>';
		if (param1 != -1) 		// -1 = la mairie n'ach�te pas ce type d'objets
			contenu += '<div class="inventaire_contenu_02_option01"><a class="inventaire_mairie"  id="vendreMairie" onclick="basculeOptionItem(\'vendreMairie\'); return false;"></a>&nbsp;'+lang_inventaire['PrixDeVenteMairie']+param1+' '+lang_inventaire['Ecus']+'</div>';
		contenu += '</div><div class="inventaire_contenu_02_ok"><input name="submit" id="inventaire_ok" type="submit" value="OK"></div></form>';
		document.getElementById('optionsItem'+idOngletActif+numero).innerHTML = contenu;
		if (typesInventaires[idOngletActif] == 'InventairePersonnage')
		{
			document.getElementById('vente0').style.visibility = 'visible';
			document.getElementById('vente1').style.visibility = 'visible';
		}
	}
	if (typeOptions == 'transferer')		// Param�tres : bit 0 = propri�t�, bit 1 =
	{
		var premier = true;
		if (typesInventaires[idOngletActif] == 'InventaireMairie')
			var contenu = '<form method="post" action="Action.php?action=104';
		else if (typesInventaires[idOngletActif] == 'InventaireComte')
			var contenu = '<form method="post" action="Action.php?action=129';
		else if (typesInventaires[idOngletActif] == 'InventaireBateau')
			var contenu = '<form method="post" action="Action.php?action=69&departBateau=1';
		else if (typesInventaires[idOngletActif] == 'InventaireMandat')
			var contenu = '<form method="post" action="Action.php?action=69&departMandat=1';
		else
			var contenu = '<form method="post" action="Action.php?action=69';
		if ((typesInventaires[idOngletActif] == 'InventairePropriete') || (typesInventaires[idOngletActif] == 'InventaireVilla') || (typesInventaires[idOngletActif] == 'InventaireBateau') || (typesInventaires[idOngletActif] == 'InventaireAppartement'))
			contenu += '&c=1';
		contenu += '&type='+numero+'"><div class="inventaire_contenu_02_nbre">'+lang_inventaire['QuantiteATransferer'];
		contenu += '<select name="quantite">';
		for (var i=1; i<=param0; i++)
			contenu += '<option value="'+i+'">'+i+'</option>';
		contenu += '</select>';
		contenu += '</div><div class="inventaire_contenu_02_option00">';
		if (param1 != -1)
			contenu += '<div class="inventaire_contenu_02_option01">'+lang_inventaire['TransfererVers']+'</div>';
		contenu += '<div class="inventaire_contenu_02_option01">';
		if ((param1 & 1) == 1)
		{
			if (premier)
			{
				premier = false;
				basculeCouranteItem = "transfererPropriete";
				contenu += '<a class="inventaire_chezmoi"  id="transfererPropriete" onclick="return false;" style="background-position:top right;"></a> ';
			}
			else
				contenu += '<a class="inventaire_chezmoi"  id="transfererPropriete" onclick="basculeOptionItem(\'transfererPropriete\'); return false;"></a> ';
		}
		if ((param1 & 2) == 2)
		{
			if (premier)
			{
				premier = false;
				basculeCouranteItem = "transfererAppartement";
				contenu += '<a class="inventaire_appart"  id="transfererAppartement" onclick="return false;" style="background-position:top right;"></a> ';
			}
			else
				contenu += '<a class="inventaire_appart"  id="transfererAppartement" onclick="basculeOptionItem(\'transfererAppartement\'); return false;"></a> ';
		}
		if ((param1 & 4) == 4)
		{
			if (premier)
			{
				premier = false;
				basculeCouranteItem = "transfererTaverne";
				contenu += '<a class="inventaire_taverne"  id="transfererTaverne" onclick="return false;" style="background-position:top right;"></a> ';
			}
			else
				contenu += '<a class="inventaire_taverne"  id="transfererTaverne" onclick="basculeOptionItem(\'transfererTaverne\'); return false;"></a> ';
		}
		if ((param1 & 8) == 8)
		{
			if (premier)
			{
				premier = false;
				basculeCouranteItem = "transfererArmee";
				contenu += '<a class="inventaire_armee"  id="transfererArmee" onclick="return false;" style="background-position:top right;"></a> ';
			}
			else
				contenu += '<a class="inventaire_armee"  id="transfererArmee" onclick="basculeOptionItem(\'transfererArmee\'); return false;"></a> ';
		}
		if ((param1 & 16) == 16)
		{
			if (premier)
			{
				premier = false;
				basculeCouranteItem = "transfererMandat";
				contenu += '<a class="inventaire_mandat"  id="transfererMandat" onclick="return false;" style="background-position:top right;"></a> ';
			}
			else
				contenu += '<a class="inventaire_mandat"  id="transfererMandat" onclick="basculeOptionItem(\'transfererMandat\'); return false;"></a> ';
		}
		if ((param1 & 32) == 32)
		{
			if (premier)
			{
				premier = false;
				basculeCouranteItem = "transfererVilla";
				contenu += '<a class="inventaire_villa"  id="transfererVilla" onclick="return false;" style="background-position:top right;"></a> ';
			}
			else
				contenu += '<a class="inventaire_villa"  id="transfererVilla" onclick="basculeOptionItem(\'transfererVilla\'); return false;"></a> ';
		}
		if ((param1 & 64) == 64)
		{
			if (premier)
			{
				premier = false;
				basculeCouranteItem = "transfererBateau";
				contenu += '<a class="inventaire_bateau"  id="transfererBateau" onclick="return false;" style="background-position:top right;"></a> ';
			}
			else
				contenu += '<a class="inventaire_bateau"  id="transfererBateau" onclick="basculeOptionItem(\'transfererBateau\'); return false;"></a> ';
		}
		contenu += '</div>';
		contenu += '<input type="hidden" id="destination" name="destination" value="'+basculeCouranteItem+'">';
		contenu += '</div><div class="inventaire_contenu_02_ok"><input name="submit" id="inventaire_ok" type="submit" value="OK"></div></form>';
		document.getElementById('optionsItem'+idOngletActif+numero).innerHTML = contenu;
		if ((typesInventaires[idOngletActif] == 'InventairePersonnage') || (typesInventaires[idOngletActif] == 'InventairePropriete'))
			document.getElementById('transfert0').style.visibility = 'visible';
		if (typesInventaires[idOngletActif] == 'InventairePersonnage')
		{
			document.getElementById('transfert1').style.visibility = 'visible';
			document.getElementById('transfert2').style.visibility = 'visible';
			document.getElementById('transfert3').style.visibility = 'visible';
		}
	}
	else if (typeOptions == 'jeter')
	{
		var contenu = '<form method="POST" action="Action.php?action=70&type='+numero+'">';
		contenu += '<div class="inventaire_contenu_02_option00">'+lang_inventaire['VousAllezJeterObjet']+'</div><div class="inventaire_contenu_02_ok"><a class="inventaire_ok" href="Action.php?action=70&type='+numero
		if (typesInventaires[idOngletActif] == 'InventairePropriete')
			contenu += '&e=1';
		if (typesInventaires[idOngletActif] == 'InventaireVilla')
			contenu += '&v=1';
		contenu += '">OK</a></div></form>';
		document.getElementById('optionsItem'+idOngletActif+numero).innerHTML = contenu;
	}
	else if (typeOptions == 'utiliser')
	{
		if (in_array(numero, itemsUtilisablesVetements))
			document.getElementById('optionsItem'+idOngletActif+numero).innerHTML = '<form><div class="inventaire_contenu_02_option00">'+lang_inventaire['VousAllezDeposerObjetDansGardeRobe']+'</div><div class="inventaire_contenu_02_ok"><a class="inventaire_ok" href="EcranPrincipal.php?l=2&a=1&gr='+numero+'">ok</a></div></form>';
		else if (in_array(numero, itemsUtilisablesArmes))
			document.getElementById('optionsItem'+idOngletActif+numero).innerHTML = '<form><div class="inventaire_contenu_02_option00">'+lang_inventaire['VousAllezUtiliserObjetCommeArme']+'</div><div class="inventaire_contenu_02_ok"><a class="inventaire_ok" href="Action.php?action=154&o='+numero+'">ok</a></div></form>';
		else
			document.getElementById('optionsItem'+idOngletActif+numero).innerHTML = '<form><div class="inventaire_contenu_02_option00">'+lang_inventaire['VousAllezUtiliserUnObjet']+'</div><div class="inventaire_contenu_02_ok"><a class="inventaire_ok" href="Action.php?action=6&type='+numero+'">ok</a></div></form>';

		/*if (((numero >= 84) && (numero <= 95)) || (numero >= 108 && numero <= 119))
			document.getElementById('optionsItem'+idOngletActif+numero).innerHTML = '<form><div class="inventaire_contenu_02_option00">'+lang_inventaire['VousAllezDeposerObjetDansGardeRobe']+'</div><div class="inventaire_contenu_02_ok"><a class="inventaire_ok" href="EcranPrincipal.php?l=2&a=1&gr='+numero+'">ok</a></div></form>';
		else if (
					(numero == 70)
				|| (numero == 73)
				|| (
					((typeJeu == 'Tribalistan') && ((numero == 128) || (numero == 131) || (numero == 136)))
					||
					((typeJeu == 'Tribalistan') && (numero == 105))
				   )
				)
			document.getElementById('optionsItem'+idOngletActif+numero).innerHTML = '<form><div class="inventaire_contenu_02_option00">'+lang_inventaire['VousAllezUtiliserObjetCommeArme']+'</div><div class="inventaire_contenu_02_ok"><a class="inventaire_ok" href="Action.php?action=154&o='+numero+'">ok</a></div></form>';
		else if (numero == 106)
			document.getElementById('optionsItem'+idOngletActif+numero).innerHTML = '<form><div class="inventaire_contenu_02_option00">'+lang_inventaire['VousAllezUtiliserObjetCommeDefense']+'</div><div class="inventaire_contenu_02_ok"><a class="inventaire_ok" href="Action.php?action=154&o='+numero+'">ok</a></div></form>';
		else if (numero == 180)
			document.getElementById('optionsItem'+idOngletActif+numero).innerHTML = '<form><div class="inventaire_contenu_02_option00">'+lang_inventaire['VousAllezVousVerserVerres']+'</div><div class="inventaire_contenu_02_ok"><a class="inventaire_ok" href="Action.php?action=209&o='+numero+'">ok</a></div></form>';
		else
			document.getElementById('optionsItem'+idOngletActif+numero).innerHTML = '<form><div class="inventaire_contenu_02_option00">'+lang_inventaire['VousAllezUtiliserUnObjet']+'</div><div class="inventaire_contenu_02_ok"><a class="inventaire_ok" href="Action.php?action=6&type='+numero+'">ok</a></div></form>';*/

	}
	if(((numeroOptionItemOuvert != -1) && (numeroOptionItemOuvert != numero)))
		jQuery("#optionsItem"+idOngletActif+numeroOptionItemOuvert).stop().animate({height:"0px"},"normal",function(){
			jQuery(this).empty();
		});
	if(numeroOptionItemOuvert != numero)
        {
		jQuery("#optionsItem"+idOngletActif+numero).stop().animate({height: "95px"},"normal");
        }

	numeroOptionItemOuvert = numero;
	typeOptionsItemOuvert = typeOptions;
	param0ItemOuvert = param0;
	param1ItemOuvert = param1;
	param2ItemOuvert = param2;
	param3ItemOuvert = param3;
}

function basculeOptionItem(destinationBascule)
{
	if (basculeCouranteItem != '')
		if (document.getElementById(basculeCouranteItem))
		{
			var valeur = basculeCouranteItem;
			document.getElementById(basculeCouranteItem).style.backgroundPosition='top left';
			document.getElementById(basculeCouranteItem).onclick = function () { basculeOptionItem(valeur); return false;}
		}
	document.getElementById(destinationBascule).style.backgroundPosition='top right';
	document.getElementById(destinationBascule).onclick = function () { return false;}
	document.getElementById("destination").value = destinationBascule;
	basculeCouranteItem = destinationBascule;
}

function fermeOptionsItem(numero, typeOptions, param0, param1, param2, param3)
{
	jQuery("#optionsItem"+idOngletActif+numero).stop().animate({height:"0px"},"normal",function(){
			jQuery(this).empty();
		});
	var valeurb1 = numero;
	var valeurb2 = typeOptions;
	var valeurb3 = param0;
	var valeurb4 = param1;
	var valeurb5 = param2;
	var valeurb6 = param3;
	if (typeOptionsItemOuvert == 'vendre')
	{
		if (typesInventaires[idOngletActif] == 'InventairePersonnage')
		{
			document.getElementById('vente0').style.visibility = 'hidden';
			document.getElementById('vente1').style.visibility = 'hidden';
		}
	}
	else if(typeOptionsItemOuvert == 'transferer')
	{
		if ((typesInventaires[idOngletActif] == 'InventairePersonnage') || (typesInventaires[idOngletActif] == 'InventairePropriete'))
			document.getElementById('transfert0').style.visibility = 'hidden';
		if (typesInventaires[idOngletActif] == 'InventairePersonnage')
		{
			document.getElementById('transfert1').style.visibility = 'hidden';
			document.getElementById('transfert2').style.visibility = 'hidden';
			document.getElementById('transfert3').style.visibility = 'hidden';
		}
	}
	document.getElementById(typeOptions+idOngletActif+numero).style.backgroundPosition='top left';
	document.getElementById(typeOptions+idOngletActif+numero).onclick = function () { ouvreOptionsItem(valeurb1, valeurb2, valeurb3, valeurb4, valeurb5, valeurb6) };
	if ((numeroOptionItemOuvert != numero) && (numeroOptionItemOuvert != -1))
	{
		jQuery("#optionsItem"+idOngletActif+numeroOptionItemOuvert).stop().animate({height:"0px"},"normal",function(){
			jQuery(this).empty();
		});
		var valeur1 = numeroOptionItemOuvert;
		var valeur2 = typeOptionsItemOuvert;
		var valeur3 = param0ItemOuvert;
		var valeur4 = param1ItemOuvert;
		var valeur5 = param2ItemOuvert;
		var valeur6 = param3ItemOuvert;
		document.getElementById(typeOptionsItemOuvert+idOngletActif+numeroOptionItemOuvert).onclick = function () { ouvreOptionsItem(valeur1, valeur2, valeur3, valeur4, valeur5, valeur6) };
	}
	numeroOptionItemOuvert = -1;
}

function modifBoutonInventaire(typeModifBouton, numero, type)
{
	if ((numeroOptionItemOuvert != numero) || (typeOptionsItemOuvert != type))
	{
		if (typeModifBouton == 'over')
			document.getElementById(type+idOngletActif+numero).style.backgroundPosition='bottom left';
		else if(typeModifBouton == 'out')
			document.getElementById(type+idOngletActif+numero).style.backgroundPosition='top left';
	}
	return true;
}