initFormulaire();

function detecterErreurs(type) {

    initialiserTexteAlerte();


    //A ne pas mettre directement dans la condition du if
    let verificationCalcul = verifierErreurCalcul();
    let verificationFrequence = verifierErreurFrequence();
    let verificationBouee = verifierErreurBouee();
    let verificationIntervalle = verifierErreurIntervalle();

    if (verificationCalcul && verificationFrequence && verificationBouee && verificationIntervalle) {
        $("#texteAlerte").text("");
        $("#divAlerte").hide();
            //apres la detection d erreurs
            var annee = $('#annee').val();
            var mois = $('#mois').val();
            var jour = $('#jour').val();
            var heure = $('#heure').val();
            var minute = $('#minute').val();
            var seconde = $('#seconde').val();
            var calcul = $('input[name=calcul]:checked').val();
            var bouee = $('#bouee').val();
            var dateDep = $('#dateDep').val();
            var heureDep = $('#heureDep').val();
            var dateFin = $('#dateFin').val();
            var heureFin = $('#heureFin').val();
            var lien = "resultats.php?";
            lien += 'annee='+annee;
            lien += '&mois='+mois;
            lien += '&jour='+jour;
            lien += '&heure='+heure;
            lien += '&minute='+minute;
            lien += '&seconde='+seconde;
            lien += '&calcul='+calcul;
            lien += '&bouee='+bouee;
            lien += '&dateDep='+dateDep;
            lien += '&heureDep='+heureDep;
            lien += '&dateFin='+dateFin;
            lien += '&heureFin='+heureFin;
            lien += '&type='+type;
            console.log(lien);
            window.location.href = lien;
    }

}

function fermer(){
    $('#message').remove();
}

function retourFormulaire(){
    var url = document.location.href;
    window.location.href = "formulaireRecherche.php"+ url.substr(url.indexOf('?'));
}


//remplit les champs du formulaire avec les données de l'url si il y en a
function initFormulaire(){
    donnees = window.location.href.substr(window.location.href.indexOf('?')+1);
    var tabDonnees = donnees.split('&');
    console.log(tabDonnees);
    var nom;
    var valeur;
    for(i=0; i<tabDonnees.length-1;i++){
        var nom = tabDonnees[i].substr(0,tabDonnees[i].indexOf("="));
        var valeur = tabDonnees[i].substr(tabDonnees[i].indexOf("=")+1);
        if(nom == 'calcul'){
            $("#"+valeur).attr('checked', true);
        }else{
            console.log(nom+ ' ==> '+valeur);
            $('#'+nom).val(valeur);
        }
    }
}

function initialiserTexteAlerte() {

    $("#texteAlerte").text("");
    $("#texteAlerte").append("<h4>Verifier votre saisie : </h4>");
    $("#texteAlerte").append("<ul>");

}


function verifierErreurCalcul() {

    let mediane = $("#mediane").is(':checked');
    let moyenne = $("#moyenne").is(':checked');
    let ecartType = $("#ecartType").is(':checked');

    if (!mediane && !moyenne && !ecartType) {
        $("#calculErreur").css("color","red");
        $("#texteAlerte").append("<li> Calcul : veuillez choisir un calcul </li>");
        $("#divAlerte").show();

        return false;
    }
    else {
        $("#calculErreur").css("color","black");
        
        return true;
    }

}


function verifierErreurBouee() {

    let valeurBouee = $("#bouee").val();

    if (valeurBouee > 75 || valeurBouee < 1 || isNaN(valeurBouee)) {
        $("#boueeErreur").css("color","red");
        $("#texteAlerte").append("<li> Bouee : La valeur ne peux pas contenir de lettres et doit être comprise entre 1 et 75</li>");
        $("#divAlerte").show();

        return false;
    }
    else {
        $("#boueeErreur").css("color","black");
        return true;
    }

}


function verifierErreurFrequence() {

    let valeurAnnee = $("#annee").val();
    let valeurMois = $("#mois").val();
    let valeurJour = $("#jour").val();
    let valeurHeure = $("#heure").val();
    let valeurMinute = $("#minute").val();
    let valeurSeconde = $("#seconde").val();

    $("#anneeErreur").css("color", "black");
    $("#moisErreur").css("color", "black");
    $("#jourErreur").css("color", "black");
    $("#heureErreur").css("color", "black");
    $("#minuteErreur").css("color", "black");
    $("#secondeErreur").css("color", "black");

    let conditionToutesNonVides = !valeurAnnee && !valeurMois && !valeurJour && !valeurHeure && !valeurSeconde && !valeurMinute && !valeurSeconde;
    let conditionToutesNonNulles = valeurAnnee == 0 && valeurMois == 0 && valeurJour == 0 && valeurHeure == 0 && valeurSeconde == 0 && valeurMinute == 0 && valeurSeconde == 0;
    let conditionToutesNumeriques = isNaN(valeurAnnee) || isNaN(valeurMois) || isNaN(valeurJour) || isNaN(valeurHeure) || isNaN(valeurMinute) || isNaN(valeurSeconde);

    if (conditionToutesNonVides || conditionToutesNonNulles || conditionToutesNumeriques) {
        $("#frequenceErreur").css("color","red");
        $("#texteAlerte").append("<li> Frequence : Les champs doivent tous être rempli par des nombres entiers positifs et au moins un doit être différent de 0.</li>");
        $("#divAlerte").show();
        
        return false;

    }
    else {

        //A ne pas mettre directement dans la condition du if
        let verificationAnnee = verifierAnnee(valeurAnnee);
        let verificationMois = verifierMois(valeurMois);
        let verificationJour = verifierJour(valeurJour);
        let verificationHeure = verifierHeure(valeurHeure);
        let verificationMinute = verifierMinute(valeurMinute);
        let verificationSeconde = verifierSeconde(valeurSeconde);

        if (verificationAnnee && verificationMois && verificationJour && verificationHeure && verificationMinute && verificationSeconde) {

            $("#frequenceErreur").css("color", "black");

            return true;
        }else {
            $("#frequenceErreur").css("color", "red");
            
            return false;
        }        

        
    }

}


function verifierErreurIntervalle() {

    let dateDebut = $("#dateDep").val();
    let dateFin = $("#dateFin").val();
    let heureDebut = $("#heureDep").val();
    let heureFin = $("#heureFin").val();

    if(!(verifierValiditeIntervalle(dateDebut, dateFin, heureDebut, heureFin)) ||
            (!dateFin || !dateDebut || !heureFin || !heureDebut)) {
        $("#intervalleErreur").css("color","red");
        $("#texteAlerte").append("<li> Intervalle : La date de fin doit être supérieur à la date de début et tout les champs doivent être remplis</li>");
        $("#divAlerte").show();

        return false;
    }
    else {
        $("#intervalleErreur").css("color","black");

        return true;
    }

}


function verifierAnnee(valeur) {

    $("#anneeErreur").css("color", "black");

    if (valeur < 0 || valeur > 2 || !valeur.match(/^-?[0-9]+$/)) {
        $("#anneeErreur").css("color", "red");
        $("#texteAlerte").append("<li> Frequence : L'année ne peux pas contenir de lettres et doit être comprise entre 0 et 2</li>");
        $("#divAlerte").show();
        return false;
    }

    return true;

}


function verifierMois(valeur) {

    $("#moisErreur").css("color", "black");

    if (valeur < 0 || valeur > 12 || !valeur.match(/^-?[0-9]+$/)) {
        $("#moisErreur").css("color","red");
        $("#texteAlerte").append("<li> Frequence : Le mois ne peux pas contenir de lettres et doit être comprit entre 0 et 12</li>");
        $("#divAlerte").show();
        return false;
    }
    
    return true;

}


function verifierJour(valeur) {

    $("#jourErreur").css("color", "black");

    if (valeur < 0 || valeur > 31 || !valeur.match(/^-?[0-9]+$/)) {
        $("#jourErreur").css("color","red");
        $("#texteAlerte").append("<li> Frequence : Le jour ne peux pas contenir de lettres et doit être comprit entre 0 et 31</li>");
        $("#divAlerte").show();
        return false;
    }

    return true;

}


function verifierHeure(valeur) {
    
    $("#heureErreur").css("color", "black");

    if (valeur < 0 || valeur > 23 || !valeur.match(/^-?[0-9]+$/)) {
        $("#heureErreur").css("color","red");
        $("#texteAlerte").append("<li> Frequence : L'heure ne peux pas contenir de lettres et doit être comprise entre 0 et 23</li>");
        $("#divAlerte").show();
        return false;
    }

    return true;

}


function verifierMinute(valeur) {

    $("#minuteErreur").css("color", "black");

    if (valeur < 0 || valeur > 59 || !valeur.match(/^-?[0-9]+$/)) {
        $("#minuteErreur").css("color","red");
        $("#texteAlerte").append("<li> Frequence : Les minutes ne peuvent pas contenir de lettres et doivent être comprises entre 0 et 59</li>");
        $("#divAlerte").show();
        return false;
    }

    return true;

}


function verifierSeconde(valeur) {

    $("#secondeErreur").css("color", "black");

    if (valeur < 0 || valeur > 59 || !valeur.match(/^-?[0-9]+$/)) {
        $("#secondeErreur").css("color","red");
        $("#texteAlerte").append("<li> Frequence : Les secondes ne peuvent pas contenir de lettres et doivent être comprises entre 0 et 59</li>");
        $("#divAlerte").show();
        return false;
    }


    return true;

}


function verifierValiditeIntervalle(dateDebut, dateFin, heureDebut, heureFin) {

    var debut = new Date(dateDebut);
    var fin = new Date(dateFin);

    if (debut.getFullYear() > fin.getFullYear()) {
        return false;
    }

    if (debut.getMonth() > fin.getMonth()) {
        return false;
    }

    if (debut.getDay() > fin.getDay() && debut.getMonth() == fin.getMonth()) {
        return false
    }

    if ((debut.getTime() == fin.getTime()) && heureDebut > heureFin) {
        return false;
    }

    return true;

}




