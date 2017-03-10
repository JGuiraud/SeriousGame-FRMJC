$(document).ready(function() {
    var layer;

    // initialize the map
    var map = L.map('mapdiv').setView([50.1191545, 9.2496883], 4);
    // load a tile layer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // load GeoJSON from an external file
    $.getJSON("./countries.geojson", function(data) {
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
            console.log(splitted);
        } else {
            var splitted2 = this._popup._content.split(">")[1];
            splitted2 = splitted2.split("<")[0];
            console.log(splitted2);
        }











        // console.log($(".leaflet-popup-content"))


        // var content = feature.target._popupContent
        // console.log(content)
        // var sliced1 = content.slice(8);
        // console.log(sliced1);
        // sliced = sliced.slice(sliced.length - 8, sliced.length);
        // console.log(sliced);

    }



});