$(document).ready(function () {
    var layer;

    $("#cvfini").hide()
    $('#entretienfini').hide()
    $('#EntretienFini1').hide()
    $('#buttonfinito').hide()
    $('#suivantboutonPays').hide()
    $('#suivantboutonMissions').hide()
    $('#suivantboutonBudget').hide()
    $('#suivantboutonCV').hide()
    $(".lienmission").hide()


    $(".reset").hide()
    $(".download").hide()
    $(".back").hide()

    // sessionStorage.setItem("choixCv", true)
    // sessionStorage.setItem("choixBudget", true)
    // sessionStorage.setItem("choixMission", true)
    // sessionStorage.setItem("choixPays", true)

    if (lang == "uk") {
        $("#tampon").attr("src", "./assets/tamponE.png")
        $("#postit0").attr("src", "assets/Return.png")
    } else {
        $("#tampon").attr("src", "./assets/tampon.png")
    }

    $("#uk").click(function () {
        console.log("yopp")
        $("#postit0").attr("src", "assets/Return.png")
        $("#postit1").attr("src", "assets/food.png")
        $("#postit2").attr("src", "assets/expenses.png")
        $("#postit3").attr("src", "assets/phone.png")
        $("#postit4").attr("src", "assets/transportation.png")
        $("#postit5").attr("src", "assets/accomodation.png")
    })
    $("#fr").click(function () {
        console.log("yopp")
        $("#postit0").attr("src", "assets/postittraj.png")
        $("#postit1").attr("src", "assets/postitmanger.png")
        $("#postit2").attr("src", "assets/postitdepenses.png")
        $("#postit3").attr("src", "assets/postittel.png")
        $("#postit4").attr("src", "assets/postittransports.png")
        $("#postit5").attr("src", "assets/postitlogement.png")
    })

    $("#buttonfinito").click(function () {
        // video.stop()
        $(".finalPage").removeClass("hidden")
        fin()
        setTimeout(function () {
            $('.reset').fadeIn("slow")
            $('.download').fadeIn("slow")
            $('.back').fadeIn("slow")
        }, 4000)
    })
    $(".back").click(function () {
        // video.stop()
        $(".finalPage").addClass("hidden")
        // fin()
        setTimeout(function () {
            $("#tampon").fadeOut("slow")
            $(".indy").fadeIn("slow")
            $('.reset').fadeOut("slow")
            $('.download').fadeOut("slow")
            $('.back').fadeOut("slow")
        }, 500)
    })




    if (sessionStorage.getItem("choixMission")) {
        $("#missionsLink").toggleClass("linethrough")
    }
    if (sessionStorage.getItem("choixPays")) {
        $("#paysLink").toggleClass("linethrough")
    }
    if (sessionStorage.getItem("choixBudget")) {
        $("#budgetLink").toggleClass("linethrough")
    }
    if (sessionStorage.getItem("choixCv")) {
        $("#cvlmLink").toggleClass("linethrough")
    }
    if (sessionStorage.getItem("choixEntretien")) {
        $("#entretienLink").toggleClass("linethrough")
    }


    $("#start").click(function () {
        $(".container-carnet").attr('class', "container-carnet carnetmiddle")
        hideBulle()
    })


    // $(".finalPage").hide()
    $("#tampon").hide()

    /* fin jeu */
    $("#fusee").hide();

    $(".reset").click(function () {
        $(".finalPage").hide()
        sessionStorage.clear();
        location.reload(true)
    })

    function fin(e) {
        // e.stopPropagation()
        $(".indy").fadeOut("fast");
        $("#smallbubble").fadeOut("fast")
        var fusee = $("#fusee")
        fusee.fadeIn(200)
        setTimeout(function () {
            fusee.css("top", "-100vh")
        }, 2000)
        setTimeout(function () {
            $("#tampon").fadeIn()
        }, 3500)

        // $("#fusee").removeClass("fuseeDown")
        // $("#fusee").addClass("fuseeUp")
        console.log("fin")
    }




    // if (sessionStorage.getItem("choixCv") && sessionStorage.getItem("choixBudget") && sessionStorage.getItem("choixMission") && sessionStorage.getItem("choixPays"))

    // if (true) {
    //     $(".indy").fadeOut("fast");
    //     $("#fusee").fadeIn("fast").css("top", "-100vh")
    //     // $("#fusee").removeClass("fuseeDown")
    //     // $("#fusee").addClass("fuseeUp")
    //     console.log("fin")
    // }


    $("#uk").click(function (e) {
        $("#smallbubble").attr("src", "./assets/smallbubbleUk.png")
        e.stopPropagation()
    })
    $("#fr").click(function (e) {
        $("#smallbubble").attr("src", "./assets/smallbubble.png")
        e.stopPropagation()
    })


    $(".bulle").fadeOut();
    $("#paysbonchoix").hide();
    $("#missionbonchoix").hide();


    function chargement() {
        setTimeout(function () {
            $("#loadingPage").fadeOut("slow");
        }, 1000);
    }
    chargement();
    // console.log(sessionStorage.getItem("test"))
    if (sessionStorage.getItem("test") == "entretien") {
        cam()
    }

    /* control of F5 reload to ctrl+F5 instead */
    document.onkeydown = fkey;
    document.onkeypress = fkey
    document.onkeyup = fkey;

    var wasPressed = false;

    function fkey(e) {
        e = e || window.event;
        if (wasPressed) return;

        if (e.keyCode == 116) {
            e.preventDefault()
            location.reload(true)
            // wasPressed = true;
        }
    }
    /* ----- */
    $("#budgetverif").hide()

    $("#buttonbulle").hide();

    $("#container-general").click(function () {
        if ($(".bulle").attr("class") == "cache") {
            return
        } else {
            hideBulle()
        }
    })

    $("#smallbubble").hide()

    function hideBulle() {
        $(".bulle").fadeOut("slow")
        $("#smallbubble").fadeIn("slow")
    }

    function pasHideBulle() {
        $("#smallbubble").fadeOut("slow")
        $(".bulle").fadeIn("slow")
    }

    $(".bulle").click(function (e) {
        e.stopPropagation()
    });

    $("#closeBubble").click(function () {
        hideBulle()
        $(".bulle").addClass('cache')
    })



    $("#smallbubble").click(function (e) {
        e.stopPropagation();
        pasHideBulle()
        $("#smallbubble").removeClass("cache")
    })

    setTimeout(function () {
        $(".bulle").fadeIn('slow')
    }, 2000);

    $("#cvEnabled").hide();
    $("#entretienEnabled").hide();
    $("#budgetEnabled").hide()
    checkMission()

    if (sessionStorage.getItem("test") == 'pays') {
        $("#pays").attr('class', 'quest queston')
    }
    if (sessionStorage.getItem("test") == 'cv') {
        $("#cv").attr('class', 'quest queston')
    }
    if (sessionStorage.getItem("test") == 'budget') {
        $("#budget").attr('class', 'quest queston')
    }
    if (sessionStorage.getItem("test") == 'missions') {
        $("#missions").attr('class', 'quest queston')
    }
    if (sessionStorage.getItem("test") == 'entretien') {
        $("#entretien").attr('class', 'quest queston')
    }

    // initialize the map
    var map = L.map('mapdiv').setView([50.1191545, 9.2496883], 4);
    // load a tile layer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // load GeoJSON from an external file
    $.getJSON("./countries.geojson", function (data) {
        // add GeoJSON layer to the map once the file is loaded
        L.geoJson(data).addTo(map);

        function style(feature) {
            return {
                fillColor: "#003399",
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.4
            };
        }
        L.geoJson(data, { style: style }).addTo(map);

        function onEachFeature(feature, layer) {
            layer.bindPopup("<strong>" + feature.properties.name + "<strong>");
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: clickable
            });
        }
        geojson = L.geoJson(data, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);

    });

    function highlightFeature(e) {
        layer = e.target;
        layer.setStyle({
            weight: 5,
            color: 'blue',
            dashArray: '',
            fillOpacity: 0.7
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function clickable(feature, layer) {
        if (this._popupContent) {
            var splitted = this._popupContent.split(">")[1];
            var splitted = splitted.split("<")[0];
            sessionStorage.setItem("choixPays", splitted)
            checkMission();
        } else {
            var splitted2 = this._popup._content.split(">")[1];
            var splitted2 = splitted2.split("<")[0];
            sessionStorage.setItem("choixPays", splitted2)
            checkMission();
        }

        $(".bulle").fadeIn();

        $("#suivantboutonPays").click(function () {
            $(".container-carnet").attr('class', "container-carnet carnetmiddle")
        })



        if (splitted) {
            $("#paysintro").hide();
            $("#paysbonchoix").show();
            $("#suivantboutonPays").show()

            console.log(sessionStorage.getItem("choixPays"));
            $("#payschoisi").html(sessionStorage.getItem("choixPays"))
        }

        if (splitted2) {
            $("#paysintro").hide();
            $("#paysbonchoix").show();
            $("#payschoisi").html(sessionStorage.getItem("choixPays") + "")

        }
    }

    // if (splitted) {
    //     console.log(this)


    // }
    // if (splitted2) {
    //     console.log(this)
    //     $(".bulle").fadeIn();
    // }

    function checkMission() {
        if (sessionStorage.getItem("choixPays") && sessionStorage.getItem("choixMission")) {
            $("#cvEnabled").show();
            $("#budgetEnabled").show()
            $("#cvDisabled").hide();
            $("#budgetDisabled").hide()
            console.log('pret');
        }
        if (sessionStorage.getItem("choixCv")) {
            $("#entretienEnabled").show()
            $("#entretienDisabled").hide()
        }
    }

    /* ----- carnet ----- */

    $("#closeBook").fadeOut()

    $("#closeBook").click(function () {
        if ($(".container-carnet").attr('class') == "container-carnet carnetmiddle") {
            waitReturnCarnet();
            $("#closeBook").fadeOut();
            // $("#closeBook").show()
        } else {

        }
    })

    if ($(".container-carnet").attr('class') == "container-carnet carnetmiddle") {
        alert("yo")
    }

    // if ($(".container-carnet").attr('class') == "container-carnet carnetmiddle") {
    //     $("#closeBook").show()
    // }





    var $mybook = $('#mybook');
    var $bttn_next = $('#next_page_button');
    var $bttn_prev = $('#prev_page_button');
    var $loading = $('#loading');
    var $mybook_images = $mybook.find('img');
    var cnt_images = $mybook_images.length;
    var loaded = 0;

    $mybook_images.each(function () {
        var $img = $(this);
        var source = $img.attr('src');
        $('<img/>').load(function () {
            ++loaded;
            if (loaded == cnt_images) {
                $loading.hide();
                $bttn_next.hide();
                $bttn_prev.show();
                $mybook.show().booklet({
                    name: null,
                    width: 800,
                    height: 500,
                    speed: 600,
                    direction: 'LTR',
                    startingPage: 0,
                    easing: 'easeInOutQuad',
                    easeIn: 'easeInQuad',
                    easeOut: 'easeOutQuad',

                    closed: true,
                    closedFrontTitle: null,
                    closedFrontChapter: null,
                    closedBackTitle: null,

                    closedBackChapter: null,
                    covers: false,

                    pagePadding: 10,
                    pageNumbers: true,

                    hovers: false,
                    overlays: false,
                    tabs: false,
                    tabWidth: 60,
                    tabHeight: 20,
                    arrows: false,
                    cursor: 'pointer',

                    hash: false,
                    keyboard: true,
                    next: $bttn_next,
                    prev: $bttn_prev,

                    menu: null,
                    pageSelector: false,
                    chapterSelector: false,

                    shadows: true,
                    shadowTopFwdWidth: 166,
                    shadowTopBackWidth: 166,
                    shadowBtmWidth: 50,

                    before: function () { },
                    after: function () { }
                });
            }
        }).attr('src', source);
    });

    function transitionPage(e) {
        e.stopPropagation();
        chargement();
        location.reload()
        setTimeout(waitReturnCarnet, 300);
        e.preventDefault();
        $(".container-game").hide()
    }

    $(".container-game").show()

    $("#paysLink").click(function (e) {
        transitionPage(e)
        callQuest("pays")
    })

    $("#missionsLink").click(function (e) {
        transitionPage(e)
        callQuest("missions")
    })

    $("#budgetLink").click(function (e) {
        transitionPage(e)
        callQuest("budget")
    })

    $("#cvlmLink").click(function (e) {
        transitionPage(e)
        callQuest("cv")
    })

    $("#entretienLink").click(function (e) {
        transitionPage(e)
        callQuest("entretien")
    })

    var video = document.getElementById('video');

    function cam() {
        console.log("yo")

        // Get access to the camera!
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                video.src = window.URL.createObjectURL(stream);
                video.play();
            });
        }

        // Legacy code below: getUserMedia
        else if (navigator.getUserMedia) { // Standard
            navigator.getUserMedia({ video: true }, function (stream) {
                video.src = stream;
                video.play();
            }, errBack);
        } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia({ video: true }, function (stream) {
                video.src = window.webkitURL.createObjectURL(stream);
                video.play();
            }, errBack);
        } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
            navigator.mozGetUserMedia({ video: true }, function (stream) {
                video.src = window.URL.createObjectURL(stream);
                video.play();
            }, errBack);
        }
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');



    }

    $('.disabledquest').click(function (e) {
        e.stopPropagation();
    })

    $(".b-load").click(function () {
        if ($(".container-carnet").attr('class') == "container-carnet carnetleft") {
            $("#closeBook").show("slow")
            $(".container-carnet").removeClass("carnetleft")
            $(".container-carnet").addClass("carnetmiddle")
            $("#next_page_button").fadeIn()
        } else {
            $("#closeBook").fadeOut("slow")
            waitReturnCarnet();
        }
    })

    function waitReturnCarnet() {
        $(".container-carnet").addClass("carnetleft")
        $(".container-carnet").removeClass("carnetmiddle")
        $("#next_page_button").fadeOut()
    }


    function callQuest(quest) {
        $('.quest').each(function () {
            if ($(this).attr('id') == quest && !($(this).attr('class') == "quest queston")) {
                sessionStorage.setItem("test", quest);
                $(this).toggleClass('queston');
                location.reload();

            }
            if ($(this).attr('id') != quest && $(this).attr('class') == "quest queston") {
                $(this).toggleClass('queston');
            }
        })
    }


    function randbet(min, max) {
        return Math.floor((Math.random() * (max - min)) + min);
    }

    // FIN GÉNÉRAL

    // debut BUDGET !!!!!!!!!!!!!!!!!!!!!!!!!!!!

    $("#budgetverif").hide()

    function Postits(name, prix, prisencharge, posx, posy) {
        this.name = name;
        this.prix = prix;
        this.prisencharge = prisencharge;
        this.posx = posx;
        this.posy = posy;
    }

    var postitstabl = [
        new Postits('Billet allé+retour', 20, true, 65, 10),
        new Postits('Manger', 10, true, 39, 10),
        new Postits('Dépenses quotidiennes', 5, false, 9, 10),
        new Postits('Téléphone', 10, true, 65, 35),
        new Postits('Transport sur place', 15, true, 39, 35),
        new Postits('Logement', 20, true, 9, 35)
    ];
    var prisencharge = [];
    var nonpris = ["Billet allé+retour", "Manger", "Dépenses quotidiennes", "Téléphone", "Transport sur place", "Logement"];

    function melangepostits(e, celuila) {
        posx = postitstabl[e].posx;
        posy = postitstabl[e].posy;
        rot = randbet(-10, 10) + "deg";
        $(celuila)
            .css('top', (randbet(posx, posx + $(window).width() / 200)) + "%")
            .css('left', (randbet(posy, posy + $(window).width() / 150)) + "%")
            .css('transform', "rotate(" + rot + ")");
        // console.log('coucoupotit')
    }
    $('.postit').each(function (e) {
        melangepostits(e, this);
    })

    $('.postit').click(function (e) {
        $(this).toggleClass('postitcheck');
        id = ($(this).attr('id')).slice(6);
        console.log($("#progressbudget").attr('style'))
        if (!prisencharge.includes(postitstabl[id].name)) {
            prisencharge.push(postitstabl[id].name);
            $('#progressdepense').val($('#progressdepense').val() + postitstabl[id].prix);
        } else {
            prisencharge.splice(prisencharge.indexOf(postitstabl[id].name), 1);
            $('#progressdepense').val($('#progressdepense').val() - postitstabl[id].prix);
        }
        if (!nonpris.includes(postitstabl[id].name)) {
            nonpris.push(postitstabl[id].name);
        } else {
            nonpris.splice(nonpris.indexOf(postitstabl[id].name), 1);
            // $('#progressbudget').css("width",$('#progressbudget').attr('width')-postitstabl[id].prix);
        }
        $('#prisencharge').html('<h3>Non pris en charge</h3>');
        for (var i = 0; i < prisencharge.length; i++) {
            $('#prisencharge')
                .append($('<li/>')
                    .text(prisencharge[i]));
        }
        $('#nonpris').html('<h3>Pris en charge</h3>');
        for (var i = 0; i < nonpris.length; i++) {
            $('#nonpris')
                .append($('<li/>')
                    .text(nonpris[i]));
        }
        $('#progressbudget').css("height", nonpris.length * 8 + .2 + "vh");
        $('#progressdepenses').css("height", prisencharge.length * 8 + .2 + "vh");
        if (nonpris.length < 2) {
            $('#progressbudget').css("background-color", "red");
            $('#progressdepenses').css("background-color", "red");
        } else if (nonpris.length < 4) {
            $('#progressbudget').css("background-color", "orange");
            $('#progressdepenses').css("background-color", "orange");
        } else if (nonpris.length < 6) {
            $('#progressbudget').css("background-color", "green");
            $('#progressdepenses').css("background-color", "green");
        }
    })

    setTimeout(function () {
        $('#verif').click(function (e) {
            e.stopPropagation()
            $(".bulle").fadeIn();
            $("#budgetintro").hide();
            $("#budgetverif").show()
            $("#suivantboutonBudget").show()
            $('.postit').unbind('click');
            $('#progressbudget').css("height", 40 + .2 + "vh");
            $('#progressdepenses').css("height", 8 + .2 + "vh");
            $('#progressbudget').css("background-color", "green");
            $('#progressdepenses').css("background-color", "green");
            sessionStorage.setItem("choixBudget", true)
            checkMission()
            var rightres = 0,
                wrongres = 0;
            $('.postit').each(function (e) {
                correc = postitstabl[e].prisencharge;
                if ($(this).attr("class") == 'postit') {
                    res = true;
                } else {
                    res = false;
                }
                if (res == correc) {
                    // console.log('ok '+ postitstabl[e].name);
                    rightres++;
                } else {
                    // console.log('nope '+ postitstabl[e].name);
                    wrongres++;
                }
            })
        })

    }, 5000);

    $("#suivantboutonBudget").click(function () {
        $(".container-carnet").attr('class', "container-carnet carnetmiddle")
    })


    if (lang == "uk") {
        console.log("youu")
        $("#postit0").attr("src", "assets/Return.png")
    } else {
        $("#postit0").attr("src", "assets/postittraj.png")
    }

    // fin BUDGET !!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // debut MISSIONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //callQuest('missions');
    $('.missionchoose')
        .toggle('display')
        .click(function (e) {
            e.stopPropagation();
            var missionchoisie = $(this).parent().attr('id')
            console.log(missionchoisie)
            $("#suivantboutonMissions").show()
            $('#missionintro').hide();
            $(".bulle").show()
            $("#missionbonchoix").show()
            $(".lienmission").show()
            // $("#missionchoisie").hide();

            // bulletext($(this).parent().attr('id') + '!? très bon choix');
            // console.log(missionchoisie)
            sessionStorage.setItem("choixMission", missionchoisie)

            checkMission();

        });
    $('.missiondescription').toggle();
    $('.mission')
        .click(function () {
            var timeout1;
            var timeout2;
            var id = $(this).attr('id');
            $('.mission').each(function () {
                if ($(this).attr('id') == id) {
                    $(this).toggleClass('choosedmission')
                    $(this).children('.missionchoose')
                        .toggle();
                    $(this).children('.missiondescription')
                        .toggle();
                    $(this).children('.missionpreview')
                        .toggle();
                } else if ($(this).attr('class') == 'mission choosedmission') {
                    $(this).toggleClass('choosedmission')
                    $(this).children('.missionchoose')
                        .toggle();
                    $(this).children('.missiondescription')
                        .toggle();
                    $(this).children('.missionpreview')
                        .toggle();
                }
            })
        })

    $("#suivantboutonMissions").click(function () {
        // console.log("suivant")
        $(".container-carnet").attr('class', "container-carnet carnetmiddle")
    })
    // fin MISSIONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // debut BULLES !!!!!!!!!!!!!!!!!!!!!!!!!!!!


    // fin BULLES !!!!!!!!!!!!!!!!!!!!!!!!!!!!

    /* ----- puzzle ----- */

    jqJigsawPuzzle.createPuzzleFromURL("#my_frame", "assets/cv30.png", {
        piecesSize: 'big',
        borderWidth: 0,
        shuffle: {
            rightLimit: 250,
            leftLimit: 200,
            topLimit: -30,
            bottomLimit: 40
        }
    });

    /*
     * «Copyright 2012 JFMDev»
     *
     *  This file is part of jqJigsawPuzzle.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
     */

    /**
     * Declare the namespace for the library.
     */
    jqJigsawPuzzle = new Object();

    /**
     * The array 'pieceSizes' defines the logical and the real sizes of the three sizes of pieces (small, normal and big).
     */
    jqJigsawPuzzle.pieceSizes = {
        small: {
            logical: 25,
            real: 43
        },
        normal: {
            logical: 50,
            real: 86
        },
        big: {
            logical: 100,
            real: 170
        }
    };

    /**
     * Creates an array which defines the type of each piece of the puzzle
     * (the type of a piece defines which shape is going to have).
     *
     * The type of the pieces are defined by binary numbers of four digits: 'dcba'
     * where 'a' defines the left side, 'b' the bottom side, 'c' the right side and
     * 'd' the upped side.
     *
     * @param {int} rows The number of rows of the puzzle.
     * @param {int} columns The number of columns of the puzzle.
     * @return {Array} An array with the type of each piece.
     */

    jqJigsawPuzzle.randomPieceTypes = function (rows, columns) {
        var res = new Array();

        // Format used for represent a piece type as a binary number of four digits (dcba)
        // ----- d -----
        // c --------- a
        // ----- b -----

        // Define diagonal pieces.
        for (var i = 0; i < rows; i++) {
            res[i] = new Array();
            for (var j = 0; j < columns; j++) {
                if ((i + j) % 2 == 0) {
                    // Generate a random number between 0 and 15 (0000 and 1111).
                    var rand = Math.floor(Math.random() * 16);

                    // Verify if the piece is in a border.
                    if (i == 0) { rand = rand | 8; } // Is in the first row, set 'd' to 1.
                    if (i == rows - 1) { rand = rand | 2; } // Is in the last row, set 'b' to 1.
                    if (j == 0) { rand = rand | 4; } // Is in the first column, set 'c' to 1.
                    if (j == columns - 1) { rand = rand | 1; } // Is in the last column, set 'a' to 1.

                    // Save value.
                    res[i][j] = rand;
                }
            }
        }

        // Define the other pieces.
        for (i = 0; i < rows; i++)
            for (j = 0; j < columns; j++) {
                if ((i + j) % 2 == 1) {
                    var det = 0;

                    if (i != 0) { det = det | (res[i - 1][j] & 2) << 2; } // d = !b from the piece up.
                    if (i != rows - 1) { det = det | (res[i + 1][j] & 8) >> 2; } // b = !d from the piece down.
                    if (j != 0) { det = det | (res[i][j - 1] & 1) << 2; } // c = !a from the piece left.
                    if (j != columns - 1) { det = det | (res[i][j + 1] & 4) >> 2; } // a = !c from the piece right.

                    res[i][j] = 15 - det;
                }
            }

        // Convert binary number into strings.
        for (i = 0; i < rows; i++)
            for (j = 0; j < columns; j++) {
                var value = '';
                value += ((res[i][j] & 8) != 0) ? '1' : '0';
                value += ((res[i][j] & 4) != 0) ? '1' : '0';
                value += ((res[i][j] & 2) != 0) ? '1' : '0';
                value += ((res[i][j] & 1) != 0) ? '1' : '0';
                res[i][j] = value;
            }

        return res;
    }

    /**
     * Shuffle the pieces of a puzzle.
     *
     * The parameter 'options' allows to extend the area, beyong the area of the
     * puzzle container, in which the pieces can be put when shuffling.
     *
     * @param {string} containerSelector The jQuery selector of the puzzle's container.
     * @param {object} options An associative array with the values 'rightLimit', 'leftLimit', 'topLimit' and 'bottomLimit'.
     */

    jqJigsawPuzzle.shufflePieces = function (containerSelector, options) {
        // Process parameters.
        var divPuzzle = jQuery(containerSelector).find('div.puzzle');
        var rightLimit = (options != null && !isNaN(options.rightLimit)) ? options.rightLimit : 0;
        var leftLimit = (options != null && !isNaN(options.leftLimit)) ? options.leftLimit : 0;
        var topLimit = (options != null && !isNaN(options.topLimit)) ? options.topLimit : 0;
        var bottomLimit = (options != null && !isNaN(options.bottomLimit)) ? options.bottomLimit : 0;
        var puzzleWidth = divPuzzle.width() + leftLimit + rightLimit;
        var puzzleHeight = divPuzzle.height() + topLimit + bottomLimit;

        // Move the pieces.

        jQuery(containerSelector).find('div.piece').each(function (index, piece) {
            var pieceWidth = jQuery(this).width();
            var pieceHeight = jQuery(this).height();

            jQuery(this).css('left', Math.floor(Math.random() * ((0) - pieceWidth)) - leftLimit - 15);
            jQuery(this).css('top', Math.floor(Math.random() * (puzzleHeight - pieceHeight)) - topLimit);
        });
    }

    /**
     * Loads an image and creates a puzzle with it.
     *
     * @param {string} containerSelector The jQuery selector of the element in which to put the image.
     * @param {string} imageUrl The image's URL.
     * @param {object} options An associative array with the values 'piecesSize', 'borderWidth' and 'shuffle' (which is an associative arrary with the values 'rightLimit', 'leftLimit', 'topLimit' and 'bottomLimit').
     */

    jqJigsawPuzzle.createPuzzleFromURL = function (containerSelector, imageUrl, options) {
        // Add image to the container.
        var imgId = 'img_' + new Date().getTime();
        jQuery(containerSelector).append('<img src="' + imageUrl + '" id="' + imgId + '" alt=""/>');

        // Create puzzle from the image.
        jqJigsawPuzzle.createPuzzleFromImage("#" + imgId, options);
    };

    /**
     * Creates a puzzle from an image already defined in the page.
     *
     * @param {string} imageSelector The jQuery selector of the image used for the puzzle.
     * @param {object} options An associative array with the values 'piecesSize', 'borderWidth' and 'shuffle' (which is an associative arrary with the values 'rightLimit', 'leftLimit', 'topLimit' and 'bottomLimit').
     */

    jqJigsawPuzzle.createPuzzleFromImage = function (imageSelector, options) {
        // Verify if the image exists.
        if (jQuery(imageSelector).size() > 0) {
            // Verify if the image has been fully loaded.
            if (jQuery(imageSelector).width() > 0 && jQuery(imageSelector).height() > 0) {
                // Transform image to puzzle.
                jqJigsawPuzzle.imageToPuzzle(imageSelector, options);
            } else {
                // Declare variable for check if the puzzle has been created.
                var puzzleCreated = false;

                // Add event for when the puzzle is created.

                jQuery(imageSelector).load(function () {
                    if (!puzzleCreated) {
                        puzzleCreated = true;
                        jqJigsawPuzzle.imageToPuzzle(imageSelector, options);
                    }
                });

                // Check, just in case, if the image has been loaded.
                if (jQuery(imageSelector).width() > 0 && jQuery(imageSelector).height() > 0) {
                    puzzleCreated = true;
                    jqJigsawPuzzle.imageToPuzzle(imageSelector, options);
                }
            }
        }
    }

    /**
     * Creates a puzzle from an image already loaded (fully rendered) in the page.
     *
     * @param {string} imageSelector The jQuery selector of the image used for the puzzle.
     * @param {object} options An associative array with the values 'piecesSize', 'borderWidth' and 'shuffle' (which is an associative arrary with the values 'rightLimit', 'leftLimit', 'topLimit' and 'bottomLimit').
     */

    jqJigsawPuzzle.imageToPuzzle = function (imageSelector, options) {
        // Process parameters.
        var img = jQuery(imageSelector);
        if (img.size() > 1) img = img.find(':first');
        var piecesSize = (options != null && options.piecesSize != null) ? options.piecesSize : 'normal';
        if (piecesSize != 'normal' && piecesSize != 'small' && piecesSize != 'big') piecesSize = 'normal';
        var borderWidth = (options != null && !isNaN(options.borderWidth)) ? parseInt(options.borderWidth, 10) : 5;
        var puzzleId = 'puzzle_' + new Date().getTime();

        // Draw the puzzle frame over the image.
        var imgWidth = img.width();
        var imgHeight = img.height();
        var imgPosX = img.position().left;
        var imgPosY = img.position().top;
        var imgSrc = img.attr("src");

        var html = '<div class="jigsaw" id="' + puzzleId + '" style="left:' + (imgPosX - borderWidth) + 'px; top:' + (imgPosY - borderWidth) + 'px; width:' + (imgWidth) + 'px; min-height:' + (imgHeight) + 'px; border-width:' + borderWidth + 'px;">' +
            '<div class="puzzle" style="width:' + imgWidth + 'px; height:' + imgHeight + 'px; background-image:url(\'' + imgSrc + '\');"></div>' +
            '<div class="menu" style="width:' + (imgWidth) + 'px;">' +
            '<table class="menu"><tr>' +
            '<td><a href="#" class="button" id="' + puzzleId + '_shuffle" title="Shuffle">Shuffle</a></td>' +
            '<td>Movements: <span class="movement_compter" id="' + puzzleId + '_movements"></span></td>' +
            '<td>Time: <span class="time_compter" id="' + puzzleId + '_time"></span></td>' +
            '</tr></table>' +
            '</div>' +
            '</div>';
        jQuery('#cv').append(html);
        var piecesContainer = jQuery("#" + puzzleId);

        if (sessionStorage.getItem("choixCv")) {
            $(".jigsaw").hide()
        }

        // Get the size of the pieces.
        var logicalSize = jqJigsawPuzzle.pieceSizes[piecesSize].logical;
        var realSize = jqJigsawPuzzle.pieceSizes[piecesSize].real;
        var offset = (realSize - logicalSize) / 2;

        // Calculate the number of pieces.
        var columns = parseInt(imgWidth / logicalSize);
        if (imgWidth % logicalSize != 0) columns++;
        var rows = parseInt(imgHeight / logicalSize);
        if (imgHeight % logicalSize != 0) rows++;

        // Save the number of pieces and set the counter which checks how many pieces has been put in the right location.
        piecesContainer.data('pieces-number', columns * rows);
        piecesContainer.data('pieces-located', 0);

        // Calculate piece types.
        var pieceTypes = jqJigsawPuzzle.randomPieceTypes(rows, columns);

        // Bind z-index value to container and set the z-index of the menu.
        piecesContainer.data('last-z-index', rows * columns);
        piecesContainer.find('div.menu').css("z-index", rows * columns);


        // Create pieces.
        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < columns; c++) {
                // Calculate parameter.
                var posX = -offset + c * logicalSize;
                var posY = -offset + r * logicalSize;
                var backgroundPosX = offset - c * logicalSize;
                var backgroundPosY = offset - r * logicalSize;
                var id = puzzleId + '_piece_' + r + 'x' + c;
                var clase = 'piece_' + pieceTypes[r][c];

                // Add html element.
                html = '<div id="' + id + '" ' +
                    'class="piece ' + piecesSize + ' ' + clase + '" ' +
                    'data-posX="' + posX + '" ' +
                    'data-posY="' + posY + '" ' +
                    'style="background-image: url(\'' + imgSrc + '\');' +
                    'background-position: ' + backgroundPosX + 'px ' + backgroundPosY + 'px;' +
                    'left: ' + posX + 'px; ' +
                    'top: ' + posY + 'px; ' +
                    'width: ' + realSize + 'px; ' +
                    'height: ' + realSize + 'px;">' +
                    '</div>';
                piecesContainer.append(html);

                // Set initial z-index.
                jQuery("#" + id).css("z-index", rows * columns - 1);

                // Add draggable behavior.
                jQuery("#" + id).draggable({

                    start: function (event, ui) {
                        // Verify if the piece is not already positioned.
                        var posX = parseInt(jQuery(this).attr('data-posX'), 10);
                        var posY = parseInt(jQuery(this).attr('data-posY'), 10);
                        if (posX == ui.position.left && posY == ui.position.top) { return false; }

                        // Start timer counter.
                        jqJigsawPuzzle.startTimerCounter(piecesContainer);

                        // Verify if the cursor is inside the 'logical' area, besides being insided the 'real' area.
                        //var relativeCursorPosX = event.pageX - ui.position.left - piecesContainer.position().left;
                        //var relativeCursorPosY = event.pageY - ui.position.top - piecesContainer.position().top;
                        //if( relativeCursorPosY>(logicalSize+offset) || relativeCursorPosY<offset ||
                        //    relativeCursorPosX>(logicalSize+offset) || relativeCursorPosX<offset)
                        //    { return false; }

                        // Change z-index in order to put it on top of all the other pieces.
                        var zIndex = parseInt(piecesContainer.data('last-z-index'), 10);
                        jQuery(this).css("z-index", zIndex);
                        piecesContainer.data('last-z-index', zIndex + 1);

                        return true;
                    },
                    stop: function (event, ui) {
                        // Verify if the piece has been droped close to his correct position.
                        var posX = parseInt(jQuery(this).attr('data-posX'), 10);
                        var posY = parseInt(jQuery(this).attr('data-posY'), 10);
                        var difX = ui.position.left - posX;
                        var difY = ui.position.top - posY;
                        if (difX > -offset && difX < offset && difY > -offset && difY < offset) {
                            //Put it in this position and remove the draggable behavior
                            jQuery(this).css('left', posX);
                            jQuery(this).css('top', posY);
                            jQuery(this).css("z-index", rows * columns - 2);

                            // Reproduce sound.
                            if (jqJigsawPuzzle.pieceSound != null) jqJigsawPuzzle.pieceSound.play();

                            // Change the color of the border for a quarter of a second.
                            piecesContainer.addClass('highlight');
                            setTimeout(function () { piecesContainer.removeClass('highlight'); }, 250);

                            // Increase the number of pieces located.
                            var piecesLocated = parseInt(piecesContainer.data('pieces-located'), 10);
                            piecesContainer.data('pieces-located', piecesLocated + 1);

                            // Verify if the puzzle has been solved.
                            if (piecesLocated + 1 >= parseInt(piecesContainer.data('pieces-number'), 10)) {
                                piecesContainer.addClass('resolved');
                                jqJigsawPuzzle.stopTimerCounter(piecesContainer);
                                sessionStorage.setItem("choixCv", true)
                                checkMission()
                                $(".bulle").fadeIn();
                                $('#cvintro').hide();
                                $("#cvfini").show();
                                $('#suivantboutonCV').show()


                                console.log('endgame')
                                // console.log('youpi !');
                            }
                        }

                        // Increase compter.
                        jqJigsawPuzzle.increaseMovementCounter(piecesContainer);
                    }
                });
            }
        }

        $('#suivantboutonCV').click(function () {
            $(".container-carnet").attr('class', "container-carnet carnetmiddle")

        })


        // Shuffle pieces and initialize time and movement compters.
        jqJigsawPuzzle.shufflePieces(piecesContainer, options != null ? options.shuffle : null);
        jqJigsawPuzzle.resetCounters(piecesContainer);

        // Assign behavior to shuffle button.

        jQuery("#" + puzzleId + "_shuffle").click(function () {
            piecesContainer.data('pieces-located', 0);
            piecesContainer.removeClass('highlight');
            piecesContainer.removeClass('resolved');
            jqJigsawPuzzle.shufflePieces(piecesContainer, options != null ? options.shuffle : null);
            jqJigsawPuzzle.resetCounters(piecesContainer);
        });
    };

    /**
     * Resets the movement compter and the timer.
     *
     * @param {object} piecesContainer A jQuery selector, which can be an string or a jQuery object, of the element which contains the puzzle.
     */

    jqJigsawPuzzle.resetCounters = function (piecesContainer) {
        // Resets timer counter.
        jqJigsawPuzzle.stopTimerCounter(piecesContainer);
        jqJigsawPuzzle.setTimerCounter(piecesContainer, 0);

        // Resets movement counter.
        jQuery(piecesContainer).find(".movement_compter").html('0');
    };

    /**
     * Increase in one the movement compter.
     *
     * @param {object} piecesContainer A jQuery selector, which can be an string or a jQuery object, of the element which contains the puzzle.
     */

    jqJigsawPuzzle.increaseMovementCounter = function (piecesContainer) {
        var count = parseInt(jQuery(piecesContainer).find(".movement_compter").html(), 10);
        jQuery(piecesContainer).find(".movement_compter").html((count + 1) + '');
    };

    /**
     * Starts the timer counter.
     *
     * @param {object} piecesContainer A jQuery selector, which can be an string or a jQuery object, of the element which contains the puzzle.
     */

    jqJigsawPuzzle.startTimerCounter = function (piecesContainer) {
        // Verify if the timer has not already been started.
        if (jQuery(piecesContainer).data('timer-status') != 'running') {
            // Change status and set initial time.
            jQuery(piecesContainer).data('timer-status', 'running');
            jQuery(piecesContainer).data('timer-value', new Date().getTime());

            // Refresh timer each second.

            var interval = setInterval(function () {
                jqJigsawPuzzle.refreshTimerCounter(piecesContainer);
            }, 1000);
            jQuery(piecesContainer).data('timer-interval', interval);
        }
    };

    /**
     * Stops the timer counter.
     *
     * @param {object} piecesContainer A jQuery selector, which can be an string or a jQuery object, of the element which contains the puzzle.
     */

    jqJigsawPuzzle.stopTimerCounter = function (piecesContainer) {
        // Verify if the timer has not already been stoped.
        if (jQuery(piecesContainer).data('timer-status') != 'stopped') {
            jQuery(piecesContainer).data('timer-status', 'stopped');
            clearInterval(jQuery(piecesContainer).data('timer-interval'));
        }
    };

    /**
     * Refresh the timer counter.
     *
     * @param {object} piecesContainer A jQuery selector, which can be an string or a jQuery object, of the element which contains the puzzle.
     */

    jqJigsawPuzzle.refreshTimerCounter = function (piecesContainer) {
        var currentTime = new Date().getTime();
        jqJigsawPuzzle.setTimerCounter(piecesContainer, currentTime - jQuery(piecesContainer).data('timer-value'));
    };

    /**
     * Sets the visible value of the timer counter.
     *
     * @param {object} piecesContainer A jQuery selector, which can be an string or a jQuery object, of the element which contains the puzzle.
     * @param {int} time The time passed in milliseconds
     */

    jqJigsawPuzzle.setTimerCounter = function (piecesContainer, time) {
        time = (time > 0) ? time / 1000 : 0;
        var seconds = parseInt(time % 60, 10);
        var minutes = parseInt((time / 60) % 60, 10);
        var hours = parseInt(time / 3600, 10);
        if (seconds < 10) seconds = '0' + seconds;
        if (minutes < 10) minutes = '0' + minutes;
        if (hours < 10) hours = '0' + hours;
        jQuery(piecesContainer).find(".time_compter").html(hours + ':' + minutes + ':' + seconds);
    };

    /**
     * Define the sound object, created by SoundManager, used for reproduce a sound when a piece is put.
     */
    jqJigsawPuzzle.pieceSound = null;

    /**
     * Define the sound object, created by SoundManager, used for reproduce a sound when the puzzle is solve.
     */
    jqJigsawPuzzle.finishSound = null;

    /**
     * Configure SoundManager.
     */

    $("#missionBulle").hide();
    $("#budgetBulle").hide();
    $("#cvBulle").hide();
    $("#entretienBulle").hide();
    $("#paysBulle").hide();
    $("#presentationBulle").hide();


    if ($('#pays').attr("class") == "quest" && $('#missions').attr("class") == "quest" && $('#budget').attr("class") == "quest" && $('#cv').attr("class") == "quest" && $('#entretien').attr("class") == "quest") {
        $("#presentationBulle").show();
    }

    if ($('#pays').attr("class") == "quest queston") {
        $("#paysBulle").show();
        $("#presentationBulle").hide();
    }
    if ($('#missions').attr("class") == "quest queston") {
        $("#missionBulle").show();
        $("#paysBulle").hide();
    }
    if ($('#budget').attr("class") == "quest queston") {
        $("#budgetBulle").show();
        $("#missionBulle").hide();
    }
    if ($('#cv').attr("class") == "quest queston") {
        $("#cvBulle").show();
        $("#budgetBulle").hide();
    }
    if ($('#entretien').attr("class") == "quest queston") {
        $("#entretienBulle").show();
        $("#cvBulle").hide();
    }


    const Question = function (ques, res1, res2, res3, res4) {
        this.ques = ques;
        this.res1 = res1;
        this.res2 = res2;
        this.res3 = res3;
        this.res4 = res4;
    }

    var questions = ["", "",
        new Question("Dans quel domaine souhaites tu exercer votre mission ?",
            "Culture et loisirs", "Le sport et la jeunesse", "Sauvetage des licornes", "Solidarité"),
        new Question("A votre avis que peux tu apporter le SVE, à travers cette mission ?",
            " Acquérir de nouvelles compétences et apprendre de nouvelles langues.", " Me faire de nouveaux amis pour mon facebook.", "Une expérience personnelle et professionnelle de terrain .", "Des rencontres nouvelles et échanger par l’entraide ."),
        new Question("Tes amis disent de toi que tu es plutôt :", "Généreux et altruiste .", "Aventurier et courageux .", "Casanier et indépendant .", "La réponse D."),
        new Question("Pendant une soirée, un étudiant Erasmus, que tu ne connais pas veut engager la conversation avec toi. Problème, tu ne comprends pas un mot d’espagnol. Quelle est votre attitude ?", "Tu ne cherches pas a faire d’efforts et l’abandonnes au bout de quelques minutes .", "Tu essayes de comprendre quelques mots et d’en apprendre un peu plus sur lui, malgré la barrière de la langue .", "Tu tentes de continuer la conversation en anglais , ou bien demandes a une personne de faire l’interprète .", "Joker"),
        new Question("Tu as l’occasion de partir faire un voyage dans un pays étranger :", "Tu fais quelques visites culturelles .", "Tu restes a l’hôtel pour profiter de la piscine .", "Tu essayes de t'immerger totalement dans la culture du pays et respectes les traditions locales .", "La réponse D"),
        new Question("Seul, au beau milieu d’une île déserte :", "Tu cherches un abri pour la nuit .", "Tu essayes de construire un radeau pour rejoindre le continent le           plus proche .", "Tu panniques et attendes les secours .", "50/50"),
    ];

    var questionsEn = ["", "",
        new Question("What is your mission thematic ?",
            "Culture and hobbies", "Youth and sport", "Unicorns rescue", "Solidarity"),
        new Question("In your opinion, which benefits will you gain from the EVS?",
            "gain new skills and learn new languages", "to make new friends for my Facebook", "Personnal development and a professional experience", "Meeting other people and opening my mind through mutual aid"),
        new Question("Your friends would tell that you are rather :", "Generous and altruistic", "Adventurous and couragous", "Homebody and independant", "Answer D."),
        new Question("During a party, an unknown Erasmus student want to talk to you. Problem, you don't understand a word. How do you react ?", "You don't make any effort and go away after a few minuts", "You try to learn a few things about him with the words you've managed to understand.", "You keep speaking english or you ask a person to translate", "Joker"),
        new Question("You travel in a foreign country, what are your activities ?", "You make some cultural visits", "You stay at the hotel to enjoy the pool", "You immers yourself in the culture of the country and you respect the local traditions", "Answer D"),
        new Question("You are alone on a desertic island :", "You look for a shelter for the night", "You try to build a raft to join the nearest continent", " You panic and wait for the rescuers", "50/50"),

    ];
    var i = 2;

    console.log(i);

    var lang = "fr";
    console.log("langue en global :", lang)
    $('.lang').click(function (e) {
        e.stopPropagation()
        lang = $(this).attr('id'); // obtain language id
        console.log("langue drapeau :", lang)
        console.log(lang)
        // translate all translatable elements
        $('.tr').each(function (i) {
            $(this).text(aLangKeys[lang][$(this).attr('key')]);
        });
    });

    $('#dev').click(function (e, ques) {
        e.stopPropagation();
        // if (i = question.length) {
        //     alert("fini")
        // }
        // console.log(i)
        if (questions.length == i) {
            console.log("ok");
            $(".bulle").fadeIn();
            $("#entretienintro").hide()
            $("#entretienfini").show()
            $("#EntretienFini1").show()
            $("#buttonfinito").show()
        }
        console.log(questions.length)
        // if (i = 8) {
        //     alert("8")
        // }
        // var i;
        console.log("langue voulue :", lang)
        if (lang === "fr") {
            var q = questions[i];

            $('#question').html(q.ques).attr('key', "Q" + i);
            $('#receverR1').html('<input type="radio"><label id="R1" class="tr" key="Q' + i + 'R1"> ' + q.res1 + '</label>');
            $('#receverR2').html('<input type="radio"><label id="R2" class="tr" key="Q' + i + 'R2"> ' + q.res2 + '</label>');
            $('#receverR3').html('<input type="radio"><label id="R3" class="tr" key="Q' + i + 'R3"> ' + q.res3 + '</label>');
            $('#receverR4').html('<input type="radio"><label id="R4" class="tr" key="Q' + i + 'R4"> ' + q.res4 + '</label>');
        } else if (lang === "uk") {
            var q = questionsEn[i];

            $('#question').html(q.ques).attr('key', "Q" + i);
            $('#receverR1').html('<input type="radio"><label id="R1" class="tr" key="Q' + i + 'R1"> ' + q.res1 + '</label>');
            $('#receverR2').html('<input type="radio"><label id="R2" class="tr" key="Q' + i + 'R2"> ' + q.res2 + '</label>');
            $('#receverR3').html('<input type="radio"><label id="R3" class="tr" key="Q' + i + 'R3"> ' + q.res3 + '</label>');
            $('#receverR4').html('<input type="radio"><label id="R4" class="tr" key="Q' + i + 'R4"> ' + q.res4 + '</label>');
        }
        i++;

    });




    var aLangKeys = new Array();
    aLangKeys['fr'] = new Array();
    aLangKeys['uk'] = new Array();
    // Page de début
    aLangKeys['fr']['presentation'] = "Salut, moi c'est Indy. Je vais te guider a la découverte du service volontaire européen(SVE).";
    aLangKeys['uk']['presentation'] = "Hi ! My name is Indy. I will guide you through the discovery of the European Voluntary Service (EVS).";
    aLangKeys['fr']['staart'] = "Démarrer";
    aLangKeys['uk']['staart'] = "Start";
    // Définition du SVE
    aLangKeys['fr']['definition'] = "Le Service Volontaire Européen (SVE) permet de partir dans un pays étranger pour travailler dans une organisation à but non lucratif en tant que volontaire. Ce séjour permet de découvrir une autre culture et d'acquérir de nouvelles compétences. C’est un moyen de se sentir citoyen de l'Europe et se mettre au service d'un projet d'intérêt général.";
    aLangKeys['uk']['definition'] = "The european Voluntary Service allows you to travel to a foreign country to work for a non-profit organisation as a volunteer. During this journey, you will discover other cultures and learn new skills. It's a way to feel as an european citizen and work for a project of general interest."
    // Démarrage du jeu
    aLangKeys['fr']['intro'] = "Ton carnet de bord, situé sur la gauche de l'écran, récapitule toutes les étapes de ton aventure. Tu peux y retourner à tout moment pour suivre ton évolution. Pour commencer, je te propose de choisir entre une mission ou un pays. Clique sur le bouton 'Démarrer' pour commencer ton aventure.";
    aLangKeys['uk']['intro'] = "Take a look at your log book located on the left side of your screen. It sums up each step of you're adventure. You can go back to it at any time to follow your progression. Now that you're ready, just choose between a mission or a country. Click on the 'start' button to begin your adventure.";
    // choix pays
    aLangKeys['fr']['paystitle'] = "Pays";
    aLangKeys['uk']['paystitle'] = "Country";
    aLangKeys['fr']['pays'] = "Voici la carte d’Europe sur laquelle tu peux choisir le pays dans lequel tu veux faire ton service européen. clique sur le pays de ton choix.";
    aLangKeys['uk']['pays'] = "Think about which country you would like to do your EVS in. Then select it on the map";
    aLangKeys['fr']['paysbonchoix'] = "Très bon choix ! La mission SVE se déroule dans un pays membre ou partenaire de l'Union européenne (pays de l'Espace économique européen (EEE), pays candidat à l'adhésion à l'Union européenne, pays ou régions partenaires de l'Union européenne.";
    aLangKeys['uk']['paysbonchoix'] = "Good choice";
    // choix mission
    aLangKeys['fr']['missions'] = "Voici une sélection de missions dans divers pays. Regarde bien les thèmatiques et clique sur la mission de ton choix";
    aLangKeys['uk']['missions'] = "Here's a selection of missions in various countries. Explore the different thematics and click on one to choose it.";
    aLangKeys['fr']['missionbonchoix'] = "Mission choisie !";
    aLangKeys['uk']['missionbonchoix'] = "Mission chosen!";
    // Après choix de la mission ou du Pays
    aLangKeys['fr']['start'] = "Très bon choix ! C’est parti !";
    aLangKeys['uk']['start'] = "Very good choice ! Let's start !";
    // Budget
    aLangKeys['fr']['budget'] = "Comment vas-tu financer ce projet ? Je te propose de faire une sélection de toutes les dépenses que tu penses être amené à devoir payer. Vérifie ensuite si tu as juste.";
    aLangKeys['uk']['budget'] = "How are you going to finance this project ? Let's make a selection of all the costs you'll will certainly face during your trip and check if you are right.";
    aLangKeys['fr']['budgetverif'] = "La subvention de l’Union européenne est versée directement à la structure qui coordonne le projet. Elle doit aider à couvrir les frais de transport, d’hébergement, de nourriture et d’activités du projet SVE. Les jeunes volontaires reçoivent de l’argent de poche et leur protection sociale est assurée. Ils bénéficient également d’un soutien linguistique et d’un tutorat tout au long de leur projet SVE.";
    aLangKeys['uk']['budgetverif'] = "The european grant is payed directly to the organisation that coordinates the project. It must help to cover the transportation, accomodation, food and activity fees of the EVS project. The youths who are volunteers receive a monthly allowance. Their health care is ensured. They also have acess to linguitic courses and tutoring during their contract.";
    // Lettre de motivation
    aLangKeys['fr']['motiv'] = "Un bon CV et une lettre de motivation sont des clés essentielles pour réaliser ton Service Volontaire Européen. Tu va devoir reconstituer ce puzzle pour obtenir ton CV et ta lettre de motivation. Conseil: Un CV et une lettre de motivation rédigés en anglais auront plus d’impact pour la sélection de ta candidature.";
    aLangKeys['uk']['motiv'] = "A good CV and a cover letter are essentials to obtain a mission within the EVS. If you want to see how to structure those documents, try to reconstruct the jigsaw. Tip: A CV and a cover letter written in english will have a greater impact on your candidacy."; //aplication???
    // Entretien Skype
    aLangKeys['fr']['skypetitle'] = "Entretien de motivation";
    aLangKeys['uk']['skypetitle'] = "Motivation interview";
    aLangKeys['fr']['skype'] = "Nous allons maintenant simuler un entretien. Cet entretien sera sous forme de QCM, il te suffit donc de cocher la bonne réponse. Bonne chance !";
    aLangKeys['uk']['skype'] = "We are now going to simulate an interview. Our referent abroad will ask you a few questions under a MCQ form, tick the answer which suits you best. Good luck!";
    // Page de fin
    aLangKeys['fr']['end'] = "L'entretien n'est pas un piège, mais un moyen supplémentaire de jauger ton intérêt pour la mission et l'associatif. Aucune raison, donc, d'appréhender cette étape si tu es sûr(e) de tes motivations. Si tu obtiens un entretien, prépare-toi à présenter tes motivations. Félicitations ! Toutes les conditions sont maintenant remplies pour effectuer ta mission de Service Volontaire Européen. Lance-toi et monte un projet concret ! Clique sur le bouton pour terminer le jeu.";
    aLangKeys['uk']['end'] = "The interview is not a trap but a way to know your interest in the mission and in the voluntary sector. No need to be afraid of this necessary step if you are certain of what drives you. If you get an interview, be prepared to present your motivations. Congratulations! All the requirements to prepare your European Voluntary Service are met. Now that you know everything, why don't you make a try and plan a concrete project? Click on the button below to end the game.";
    aLangKeys['fr']['buttonfinito'] = "Suivant";
    aLangKeys['uk']['buttonfinito'] = "Next";
    aLangKeys['fr']['buttonRestart'] = "Recommencer la partie";
    aLangKeys['uk']['buttonRestart'] = "Restart the game";
    aLangKeys['fr']['buttonDownload'] = "Télécharger Documentation";
    aLangKeys['uk']['buttonDownload'] = "Download Resources";
    aLangKeys['fr']['backButton'] = "Revoir les niveaux";
    aLangKeys['uk']['backButton'] = "Back to game";
    //Missions
    aLangKeys['fr']['Mission1h3'] = "Protection animale";
    aLangKeys['uk']['Mission1h3'] = "Animal protection";
    aLangKeys['fr']['Mission1p'] = "Participe au sauvetage des tortues marines. <br>Il faut avoir au moins 18 ans, être capable de communiquer en anglais. Il faut apporter son propre matériel de camping."
    aLangKeys['uk']['Mission1p'] = "Take part in the rescue of the marine turtles. <br> You must be at least 18 yeras old, have ability to speak english. You must bring your own camping equipment";
    aLangKeys['fr']['Mission2h3'] = "Aide aux populations";
    aLangKeys['uk']['Mission2h3'] = "Population aid";
    aLangKeys['fr']['Mission2p'] = "Aide aux populations en difficulté dans un contexte de solidarité européenne: aide administrative, réalisation reportage photo/vidéo, animations d'ateliers en faveur des jeunes.";
    aLangKeys['uk']['Mission2p'] = "Help to disadvantaged populations in a context of european solidarity: administrativ help, production of photo/video documentaries, animation of youth workshops";
    aLangKeys['fr']['Mission3h3'] = "Education";
    aLangKeys['uk']['Mission3h3'] = "Education";
    aLangKeys['fr']['Mission3p'] = "Appui au programme voyageurs du code. Formation et aide à l\'animation autour de l\'éducation numérique à partir de la plateforme Codecademy, en vue de favoriser l\'apprentissage du code.";
    aLangKeys['uk']['Mission3p'] = "Support to the program code travelers. Training and animation on the digital education based on the codecademy website, in order to promote the learning of code development ";
    aLangKeys['fr']['Mission4h3'] = "Environnement";
    aLangKeys['uk']['Mission4h3'] = "Environment";
    aLangKeys['fr']['Mission4p'] = "Permaculture et jardinage bio durable.Mission de promotion et de préservation de l'environnement. Personne aimant la nature, le jardinage et la fabrication de produits faits maison.";
    aLangKeys['uk']['Mission4p'] = "Permaculture and sustainable organic gardening. Promotion and organization of an active work in order to preserve and improve the environment. We nedd someone who loves nature, gardening and the making of home-made products.";
    aLangKeys['fr']['Mission5h3'] = "Jeunesse";
    aLangKeys['uk']['Mission5h3'] = "Youth";
    aLangKeys['fr']['Mission5p'] = "Dans une équipe internationale de 11 personnes participer a l\'organisation des rencontres internationales et des actions de communication entres associations locales.";
    aLangKeys['uk']['Mission5p'] = "As a member of an international team of 11 persons, involvment in the organisation of international meetings and in communication actions between local associations";
    aLangKeys['fr']['Mission6h3'] = "Education";
    aLangKeys['uk']['Mission6h3'] = "Education";
    aLangKeys['fr']['Mission6p'] = "Association pour la jeunesse. Mise en place de projets d\'animations, de formations et d\'orientation des jeunes. Elaboration de supports de communication.";
    aLangKeys['uk']['Mission6p'] = "Youth association. Implementation of animation, training and orientation projects for the youths. Creation of communication mediums";
    aLangKeys['fr']['Mission7h3'] = "Culture et loisirs";
    aLangKeys['uk']['Mission7h3'] = "Culture and leisure";
    aLangKeys['fr']['Mission7p'] = "Promotion de la langue et de la culture Française. Mise en place d'activités ludiques et récréatives autour de la langue française dans le cadre d'activités sur les livres. Animation clubs de discussion.";
    aLangKeys['uk']['Mission7p'] = "Advocacy of french culture and language. Implementation of recreationnal activities around french language within activities on books. Animation of discussion boards.";
    aLangKeys['fr']['Mission8h3'] = "Sports";
    aLangKeys['uk']['Mission8h3'] = "Sports";
    aLangKeys['fr']['Mission8p'] = "Promotion de l'activité physique et sportive au niveau européen. Participation à des événements et projets internationaux.";
    aLangKeys['uk']['Mission8p'] = "Promotion of physical activities at a european scale. Participation at european events and projects";
    aLangKeys['fr']['choix'] = "choisir";
    aLangKeys['uk']['choix'] = "Choose";
    // Questionnaire
    aLangKeys['fr']['Q1'] = "Pour quelles raisons veux-tu faire un SVE?";
    aLangKeys['uk']['Q1'] = "For which reasons do you want to make an European Voluntary Service ?";
    aLangKeys['fr']['Q1R1'] = "Découvrir d’autres cultures.";
    aLangKeys['uk']['Q1R1'] = "To discover other cultures.";
    aLangKeys['fr']['Q1R2'] = "Résoudre les problèmes d’environnement.";
    aLangKeys['uk']['Q1R2'] = "To solve environnemental problems.";
    aLangKeys['fr']['Q1R3'] = "Aider les populations les plus défavorisées.";
    aLangKeys['uk']['Q1R3'] = "To help the disadvandaged people.";
    aLangKeys['fr']['Q1R4'] = "Faire la fête.";
    aLangKeys['uk']['Q1R4'] = "To party!!!";
    aLangKeys['fr']['Q2'] = "Dans quel domaine souhaites-tu exercer ta mission ?";
    aLangKeys['uk']['Q2'] = "What is your mission thematic ?"; //In whiwh field to you feel the most comfortable?
    aLangKeys['fr']['Q2R1'] = "Culture et loisirs";
    aLangKeys['uk']['Q2R1'] = "Culture and hobbies";
    aLangKeys['fr']['Q2R2'] = "Le sport et la jeunesse";
    aLangKeys['uk']['Q2R2'] = "Youth and sport";
    aLangKeys['fr']['Q2R3'] = "Sauvetage des licornes";
    aLangKeys['uk']['Q2R3'] = "Unicorns rescue";
    aLangKeys['fr']['Q2R4'] = "La solidarité";
    aLangKeys['uk']['Q2R4'] = "Solidarity";
    aLangKeys['fr']['Q3'] = "A ton avis que peut t'apporter le Service Volontaire Européen ?";
    aLangKeys['uk']['Q3'] = "In your opinion, which benefits will you gain from the EVS?";
    aLangKeys['fr']['Q3R1'] = "Acquérir de nouvelles compétences et apprendre de nouvelles langues";
    aLangKeys['uk']['Q3R1'] = "Gain new skills and learn new languages";
    aLangKeys['fr']['Q3R2'] = "Me faire de nouveaux amis pour mon facebook";
    aLangKeys['uk']['Q3R2'] = "To make new friends for my Facebook";
    aLangKeys['fr']['Q3R3'] = "Une expérience personnelle et professionnelle de terrain.";
    aLangKeys['uk']['Q3R3'] = "Personnal development and a professional experience";
    aLangKeys['fr']['Q3R4'] = "Une rencontre et une ouverture aux autres par l’entraide";
    aLangKeys['uk']['Q3R4'] = "Meeting other people and opening my mind through mutual aid";
    aLangKeys['fr']['Q4'] = "Tes amis disent de toi que tu es plutôt :";
    aLangKeys['uk']['Q4'] = "Your friends would tell that you are rather :";
    aLangKeys['fr']['Q4R1'] = "Généreux et altruiste.";
    aLangKeys['uk']['Q4R1'] = "Generous and altruistic";
    aLangKeys['fr']['Q4R2'] = "Aventurier et courageux";
    aLangKeys['uk']['Q4R2'] = "Adventurous and couragous";
    aLangKeys['fr']['Q4R3'] = "Casanier et indépendant";
    aLangKeys['uk']['Q4R3'] = "Homebody and independant";
    aLangKeys['fr']['Q4R4'] = "Réponse D";
    aLangKeys['uk']['Q4R4'] = "Answer D";
    aLangKeys['fr']['Q5'] = "Pendant une soirée, un étudiant Erasmus, que tu ne connais pas veut engager la conversation avec toi. Problème, tu ne comprends pas pas un mot d’espagnol. Quelle est ton attitude ?";
    aLangKeys['uk']['Q5'] = "During a party, an unknown Erasmus student want to talk to you. Problem, you don't understand a word. How do you react?";
    aLangKeys['fr']['Q5R1'] = "Tu ne cherches pas à faire d’efforts et l’abandonnes au bout de quelques minutes";
    aLangKeys['uk']['Q5R1'] = "You don't make any effort and go away after a few minutes";
    aLangKeys['fr']['Q5R2'] = "Tu essayes de comprendre quelques mots et d’en apprendre un peu plus sur lui/elle";
    aLangKeys['uk']['Q5R2'] = "You try to learn a few things about them with the words you've managed to understand.";
    aLangKeys['fr']['Q5R3'] = "Tu tentes de continuer la conversation en anglais, ou bien demande à une personne de faire l’interprète";
    aLangKeys['uk']['Q5R3'] = "You keep speaking english or you ask a person to translate";
    aLangKeys['fr']['Q5R4'] = "Réponse D";
    aLangKeys['uk']['Q5R4'] = "Answer D";
    aLangKeys['fr']['Q6'] = "Tu as l’occasion de partir faire un voyage dans un pays étranger :";
    aLangKeys['uk']['Q6'] = "You travel in a foreign country, what are your activities ?";
    aLangKeys['fr']['Q6R1'] = "Tu fais quelques visites culturelles";
    aLangKeys['uk']['Q6R1'] = "You make some cultural visits";
    aLangKeys['fr']['Q6R2'] = "tu restes à l’hôtel pour profiter de la piscine";
    aLangKeys['uk']['Q6R2'] = "You stay at the hotel and enjoy the pool";
    aLangKeys['fr']['Q6R3'] = "Tu t'immerges totalement dans la culture du pays et respectes les traditions locales";
    aLangKeys['uk']['Q6R3'] = "You immers yourself in the culture of the country and you respect the local traditions";
    aLangKeys['fr']['Q6R4'] = "Réponse D";
    aLangKeys['uk']['Q6R4'] = "Answer D";
    aLangKeys['fr']['Q7'] = "Merci d'avoir répondu à nos questions ! Tu sembles prêt à partir !";
    aLangKeys['uk']['Q7'] = "Thanks for your answers ! It seems you're ready to go !";






    /* Carnet */
    aLangKeys['fr']['carnetTitle'] = "Préparation SVE pour partir";
    aLangKeys['uk']['carnetTitle'] = "Get ready for the SVE adventure";


    aLangKeys['fr']['paysCarnet'] = "Choix du pays";
    aLangKeys['uk']['paysCarnet'] = "Choose a country";
    aLangKeys['fr']['missionsCarnet'] = "Choix de la mission";
    aLangKeys['uk']['missionsCarnet'] = "Choose a mission";
    aLangKeys['fr']['cvCarnet'] = "Curriculum Vitae/Lettre de Motivation";
    aLangKeys['uk']['cvCarnet'] = "Curriculum Vitae/Cover Letter";
    aLangKeys['fr']['entretienCarnet'] = "Entretien";
    aLangKeys['uk']['entretienCarnet'] = "Interview";



    aLangKeys['fr']['carnetMissionh1'] = "Choisir sa mission";
    aLangKeys['uk']['carnetMissionh1'] = "Choose your mission";
    aLangKeys['fr']['carnetMissionp1'] = "Ton parcours de volontaire commence ici ! Faire du volontariat dans un autre pays est un excellent moyen de découvrir d'autres cultures et de te faire des amis, tout en aidant les autres et en acquérant des compétences qui pourront t'être utiles par la suite. Sur ce site:";
    aLangKeys['uk']['carnetMissionp1'] = "Your adventure as Volunteer starts here! Being a volunteer in another country is a great way to discover other cultures and to make new friends, while helping others and gaining new and useful competences.";
    aLangKeys['fr']['carnetMissionp2'] = "Voici quelques liens utiles :";
    aLangKeys['uk']['carnetMissionp2'] = "Here are some usefull links:";
    aLangKeys['fr']['carnetMissionp3'] = " Bonne chance !";
    aLangKeys['uk']['carnetMissionp3'] = "Good Luck!";
    aLangKeys['fr']['carnetPaysh1'] = "Choisir son pays";
    aLangKeys['uk']['carnetPaysh1'] = "Choose a country";
    aLangKeys['fr']['carnetPaysp1'] = "La mission se déroule dans un pays membre ou partenaire de l'Union européenne (pays de l'Espace économique européen (EEE), pays candidat à l'adhésion à l'Union européenne, pays ou régions partenaires de l'Union européenne)";
    aLangKeys['uk']['paysbonchoix'] = "Good choice ! The mission will occur in a member or partner country of the European Union (European Economic Area countries (EEA), candidate countries for accession to the European Union, partner countries of the EU";
    aLangKeys['fr']['carnetCVh1'] = "Préparer son CV et Lettre de Motivation";
    aLangKeys['uk']['carnetCVh1'] = "Get your CV and cover letter ready";
    aLangKeys['fr']['cvfini'] = "Ce sont les savoirs-être et la motivation qui comptent avant tout. Nul besoin, en effet, de fournir un curriculum vitæ exceptionnel ou de justifier d'un quelconque niveau d'étude. N'oublie pas de te concentrer sur la rédaction de la lettre de motivation de préférence en anglais.";
    aLangKeys['uk']['cvfini'] = "Soft-skills and motivation are important. No need to have a long CV or to have a many diplomas. Don't forget instead to focus on the cover letter, a key element of your application";
    aLangKeys['fr']['carnetBudgeth1'] = "Penser son budget";
    aLangKeys['uk']['carnetBudgeth1'] = "Plan the budget";
    aLangKeys['fr']['carnetBudgetp1'] = "Indemnité et prises en charge : En tant que volontaire, tu bénéficies d’une prise en charge quasi totale sur place (hébergement, restauration, transport, couverture maladie et responsabilité civile). Tu percois en outre une indemnité mensuelle variant selon le pays.";
    aLangKeys['uk']['carnetBudgetp1'] = "Allowance and other costs : As volunteer, all your cost are mostly taken care of (appartment, food, transportation, health insurance). Additionally, you receive a monthly allowance that might vary from a country to another.";
    aLangKeys['fr']['carnetEntretienh1'] = "Être prêt pour l'entretien";
    aLangKeys['uk']['carnetEntretienh1'] = "Get ready for the interview";
    // aLangKeys['fr']['EntretienFini1'] = "";
    aLangKeys['uk']['EntretienFini1'] = "";
    aLangKeys['fr']['carnetVideoh1'] = "Vidéos";
    aLangKeys['uk']['carnetVideoh1'] = "Videos";






});