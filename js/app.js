$(document).ready(function () {
    var layer;

    $("#cvEnabled").hide(); $("#entretienEnabled").hide(); $("#budgetEnabled").hide()
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
            splitted = splitted.split("<")[0];
            sessionStorage.setItem("choixPays", splitted)
            checkMission();
        } else {
            var splitted2 = this._popup._content.split(">")[1];
            splitted2 = splitted2.split("<")[0];
            sessionStorage.setItem("choixPays", splitted2)
            checkMission();
        }
    }

    function checkMission() {
        if (sessionStorage.getItem("choixPays") && sessionStorage.getItem("choixMission")) {
            $("#cvEnabled").show(); $("#budgetEnabled").show()
            $("#cvDisabled").hide(); $("#budgetDisabled").hide()
            console.log('pret');
        }
        if (sessionStorage.getItem("choixCv")) {
            $("#entretienEnabled").show()
            $("#entretienDisabled").hide()
        }
    }

    /* ----- carnet ----- */


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
                $bttn_next.show();
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


    $(".b-load").click(function () {
        if ($(".container-carnet").attr('class') == "container-carnet carnetleft") {
            $(".container-carnet").removeClass("carnetleft")
            $(".container-carnet").addClass("carnetmiddle")
        } else {
            $(".container-carnet").addClass("carnetleft")
            $(".container-carnet").removeClass("carnetmiddle")
        }
    })

    $("#paysLink").click(function (e) {
        e.preventDefault()
        console.log("click pays")
        callQuest("pays")
    })

    $("#missionsLink").click(function (e) {
        e.preventDefault()
        console.log("click missions")
        callQuest("missions")
    })

    $("#budgetLink").click(function (e) {
        e.preventDefault()
        console.log("click budget")
        callQuest("budget")
    })

    $("#cvlmLink").click(function (e) {
        e.preventDefault();
        console.log("click CV LM")
        callQuest("cv")
    })

    $("#entretienLink").click(function (e) {
        e.preventDefault();
        console.log("click entretien")
        callQuest("entretien")
    })


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
    function Postits(name, prix, prisencharge, posx, posy) {
        this.name = name;
        this.prix = prix;
        this.prisencharge = prisencharge;
        this.posx = posx;
        this.posy = posy;
    }

    var postitstabl = [
    new Postits('Billet allé+retour', 20, true, 58, 10),
    new Postits('Manger', 10, true, 35, 10),
    new Postits('Dépenses quotidiennes', 5, false, 12, 10),
    new Postits('Téléphone', 10, true, 58, 30),
    new Postits('Transport sur place', 15, true, 35, 30),
    new Postits('Logement', 20, true, 12, 30)
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

    $('.postit').click(function () {
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
        $('#progressbudget').css("width", nonpris.length * 1.2 + .2 + "vw");
        $('#progressdepenses').css("width", prisencharge.length * 1.2 + .2 + "vw");
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

    $('#verrif').click(function () {
        sessionStorage.setItem("choixBudget", true)
        checkMission()
        var rightres = 0, wrongres = 0;
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
        console.log("vous avez " + Math.floor((rightres * 100) / 6) + "% de bonnes réponses");
    })
    // fin BUDGET !!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // debut MISSIONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //callQuest('missions');
    $('.missionchoose')
    .toggle('display')
    .click(function (e) {
        e.stopPropagation();
        var missionchoisie = $(this).parent().attr('id')
        bulletext($(this).parent().attr('id') + '!? très bon choix');
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
            }
            else if ($(this).attr('class') == 'mission choosedmission') {
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
    // fin MISSIONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // debut BULLES !!!!!!!!!!!!!!!!!!!!!!!!!!!!

    $('#bullecontainer').toggle();
    function bulletext(text) {
        $('#bulletext').html(text);
        if ($('#bullecontainer').attr('style') == 'display: none;') {
            $('#bullecontainer').toggle();
        }
    }

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
                                // console.log('youpi !');
                                // if(jqJigsawPuzzle.finishSound != null) jqJigsawPuzzle.finishSound.play();
                            }
                        }

                        // Increase compter.
                        jqJigsawPuzzle.increaseMovementCounter(piecesContainer);
                    }
                });
            }
        }

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

     soundManager.setup({
        url: 'swf/',
        flashVersion: 9,
        useFlashBlock: false,
        onready: function () {
            // Initialize sounds.
            jqJigsawPuzzle.pieceSound = soundManager.createSound({
                id: 'piece',
                url: 'mp3/tom1.mp3'
                //, onload: function() {}
            });
            jqJigsawPuzzle.finishSound = soundManager.createSound({
                id: 'finish',
                url: 'mp3/large_crowd_applause.mp3'
                //, onload: function() {}
            });
        },
        ontimeout: function () {
            // The library has not successfully initialized.
        }
    });

 });



