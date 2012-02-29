
function changePub(force)
{
	if (force)
	{
		if (Noblesse == 0)
		{
			if (document.getElementById("rectangleBas")) document.getElementById("rectangleBas").src = "FonctionsPublicite.php?o=rectangleBas";
			if (document.getElementById("carreDroit")) document.getElementById("carreDroit").src = "FonctionsPublicite.php?o=carreDroit";
			if (document.getElementById("skyCrapperDroit")) document.getElementById("skyCrapperDroit").src = "FonctionsPublicite.php?o=skyCrapperDroit";
		}
	}
}



function navigationEnProfondeur(idMenu, forcePublicite)
{
	changePub(forcePublicite);
	if (idOngletActif != ongletANePasRafraichir)
	{
		if (idMenu == 0)
		{
			document.getElementById("zoneTexte"+idOngletActif).innerHTML=textePage[idOngletActif]['Texte'];
			if (ongletInventaire == idOngletActif)
			{
				InitialiseInventaire();
			}
		}
		else
			document.getElementById("zoneTexte"+idOngletActif).innerHTML=textePage[idOngletActif][idMenu]['Texte'];
	}
	var chaine = "";
	chaine = elementsTextuelsNavigation[idOngletActif]['Nom'];
	if (idMenu != 0)
	{
		chaine = '<a class="lien_default" href="#" onclick="javascript:return navigationEnProfondeur(0);">'+chaine+'</a>';
		chaine += ' > '+elementsTextuelsNavigation[idOngletActif][idMenu]['Nom'];
	}
	if(idOngletActif == 0 && EcranCarte)
		document.getElementById("chaineNavigation").innerHTML = "";
	else
		document.getElementById("chaineNavigation").innerHTML = chaine;
	return false;
}

function navigationEnProfondeurAvecVariable0(idMenuVariable)
{
	changePub();
	positionnementVariableNavigation0 = idMenuVariable;
	if (typeVariableNavigation0 == 'PageUnique')
		document.getElementById("zoneTexte"+idOngletActif).innerHTML=texteVariable0.replace(RegExp("(%Var0%)", "g"), "Truc");
	else
		document.getElementById("zoneTexte"+idOngletActif).innerHTML=texteVariable0[idMenuVariable].replace(RegExp("(%Var0%)", "g"), "Truc");
	var chaine = "";
	chaine = elementsTextuelsNavigation[idOngletActif]['Nom'];
	chaine = '<a class="lien_default" href="#" onclick="javascript:return navigationEnProfondeur(0);">'+chaine+'</a>';
	chaine += ' > '+variableNavigation0[idMenuVariable]['Affichage'];
	document.getElementById("chaineNavigation").innerHTML = chaine;
	return false;
}

function navigationEnProfondeurAvecVariable0Et1(idSousMenuVariable)
{
	changePub();
	positionnementVariableNavigation1 = idSousMenuVariable;
	document.getElementById("zoneTexte"+idOngletActif).innerHTML=texteVariable1[idSousMenuVariable].replace(RegExp("(%Var1%)", "g"), variableNavigation0[positionnementVariableNavigation0]['ValeurVariable']);
	var chaine = "";
	chaine = elementsTextuelsNavigation[idOngletActif]['Nom'];
	chaine = '<a class="lien_default" href="#" onclick="javascript:return navigationEnProfondeur(0);">'+chaine+'</a>';
	chaine += ' > <a class="lien_default" href="#" onclick="javascript:return navigationEnProfondeurAvecVariable0('+positionnementVariableNavigation0+');">'+variableNavigation0[positionnementVariableNavigation0]['Affichage']+'</a>';
	chaine += ' > '+variableNavigation1[idSousMenuVariable]['Affichage'];
	document.getElementById("chaineNavigation").innerHTML = chaine;
	return false;
}

function navigationEnProfondeurAvecVariables0Et1(idMenuVariable, idSousMenuVariable)
{
	changePub();
	positionnementVariableNavigation0 = idMenuVariable;
	positionnementVariableNavigation1 = idSousMenuVariable;
	document.getElementById("zoneTexte"+idOngletActif).innerHTML=texteVariable1[idSousMenuVariable].replace(RegExp("(%Var1%)", "g"), variableNavigation0[positionnementVariableNavigation0]['ValeurVariable']);
	var chaine = "";
	chaine = elementsTextuelsNavigation[idOngletActif]['Nom'];
	chaine = '<a class="lien_default" href="#" onclick="javascript:return navigationEnProfondeur(0);">'+chaine+'</a>';
	chaine += ' > '+variableNavigation0[positionnementVariableNavigation0]['Affichage'];
	document.getElementById("chaineNavigation").innerHTML = chaine;
	return false;
}

function navigationEnProfondeur2(idMenu, idSousMenu)
{
	changePub();
	if (idSousMenu == 0)
		document.getElementById("zoneTexte"+idOngletActif).innerHTML=textePage[idOngletActif][idMenu]['Texte'];
	else
		document.getElementById("zoneTexte"+idOngletActif).innerHTML=textePage[idOngletActif][idMenu][idSousMenu]['Texte'];
	var chaine = "";
	chaine = elementsTextuelsNavigation[idOngletActif]['Nom'];
	if (idMenu != 0)
	{
		chaine = '<a class="lien_default" href="#" onclick="javascript:return navigationEnProfondeur(0);">'+chaine+'</a>';
		chaine += ' > <a class="lien_default" href="#" onclick="javascript:return navigationEnProfondeur('+idMenu+');">'+elementsTextuelsNavigation[idOngletActif][idMenu]['Nom']+'</a>';
		chaine += ' > '+elementsTextuelsNavigation[idOngletActif][idMenu][idSousMenu]['Nom'];
	}
	document.getElementById("chaineNavigation").innerHTML = chaine;
	return false;
}

function navigationEnProfondeur3(idMenu, idSousMenu, idSousSousMenu)
{
	changePub();
	document.getElementById("zoneTexte"+idOngletActif).innerHTML=textePage[idOngletActif][idMenu][idSousMenu][idSousSousMenu]['Texte'];
	var chaine = "";
	chaine = elementsTextuelsNavigation[idOngletActif]['Nom'];
	if (idMenu != 0)
	{
		chaine = '<a class="lien_default" href="#" onclick="javascript:return navigationEnProfondeur(0);">'+chaine+'</a>';
		chaine += ' > <a class="lien_default" href="#" onclick="javascript:return navigationEnProfondeur('+idMenu+');">'+elementsTextuelsNavigation[idOngletActif][idMenu]['Nom']+'</a>';
		chaine += ' > <a class="lien_default" href="#" onclick="javascript:return navigationEnProfondeur2('+idMenu+', '+idSousMenu+');">'+elementsTextuelsNavigation[idOngletActif][idMenu][idSousMenu]['Nom']+'</a> > '+elementsTextuelsNavigation[idOngletActif][idMenu][idSousMenu][idSousSousMenu]['Nom'];
	}
	document.getElementById("chaineNavigation").innerHTML = chaine;
	return false;
}


function change_classe(id,classe)
{
	document.getElementById(id).className = classe;
}


function switchTab(tab)
{

	var idOngletSelectionne;
	for(i=0; i<id_onglets.length; i++)
	{
		if (i == idOngletActif)
			change_classe(id_onglets[i], 'onglets_inactifs');
		if(id_onglets[i] == tab)
		{
			idOngletSelectionne = i;
			change_classe(id_onglets[i], 'onglets_actifs');
		}
	}

	if (tab!=lastTab)
	{
		//anim panel

		var theLeft = 655*(parseInt(tab.substr(6)));

		jQuery("#slidingPanel > div").stop().animate({
			left:"-"+theLeft+"px"
		},"slow", "easeOutCubic", function(){
		});

		lastTab=tab;
	}
	if(!EcranCarte || tab != "onglet0")
		document.getElementById("chaineNavigation").innerHTML=nomsOnglets[idOngletSelectionne];
	else
		document.getElementById("chaineNavigation").innerHTML= "";

	idOngletActif = idOngletSelectionne;
	if(!EcranCarte || tab != "onglet0" || PremierChargement)
		navigationEnProfondeur(0, PremierChargement);

	if(EcranCarte && tab == "onglet0"&&!PremierChargement)
	{
		jQueryReady();
	}
	PremierChargement = false;
	if(navigationEnProfondeurAvecVariable0Cartes)
		navigationEnProfondeurAvecVariable0(26);
}

function ongletsReady(){
	if($("#onglet0").length>0)
	{
		var liste_id = "";
		for(i=0; i<id_onglets.length; i++)
		{
			if(liste_id == "")
				liste_id = "#" + id_onglets[i];
			else
				liste_id = liste_id + ", #" + id_onglets[i];
		}

		jQuery(liste_id).click(function(){
			switchTab(jQuery(this).attr("id"));
		});
		jQuery("#slidingPanel > div").css("width", 655*id_onglets.length);
		//anim slide

		switchTab(onglet_def);
		if(SousOngletActif != 0)
			navigationEnProfondeur(SousOngletActif);
	}
}