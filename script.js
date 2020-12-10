const API_KEY = 'YOUR API_KEY HERE';
    const APPLICATION_NAME = 'Covid 19 Map Visualization';
    const APPLICATION_VERSION = '1.0';


    var map = tt.map({
        key: API_KEY,
        container: 'map-div',
        center: [0, 20],
        zoom: 1.5
    });

    tt.setProductInfo(APPLICATION_NAME, APPLICATION_VERSION);

    function updateMap() {
        fetch("/data.json")
            .then(response => response.json())
            .then(rsp => {
                console.log(rsp.data);
                rsp.data.forEach(element => {
                    longitude = element.longitude;
                    latitude = element.latitude;
                    let customPopup = `<strong>` + element.location + `</strong><br><p>Confirmed Cases: ` + element.confirmed + `<br>Deaths: ` + element.dead + `<br>Recovered: ` + element.recovered;


                    var element = document.createElement('div');
                    element.id = 'marker';
                    var marker = new tt.Marker({ element: element }).setLngLat([longitude, latitude]).addTo(map);




                    var popupOffsets = {
                        top: [0, -5],
                        bottom: [0, -20],
                        left:[0,-15],
                        right:[-20,0]
                    }

                    var popup = new tt.Popup({ offset: popupOffsets }).setHTML(customPopup)
                    marker.setPopup(popup);

                });
                details.addEventListener('click',
                    (function (marker) {
                        const activeItem = document.getElementsByClassName('selected');
                        return function () {
                            if (activeItem[0]) {
                                activeItem[0].classList.remove('selected');
                            }
                            details.classList.add('selected');
                            map.easeTo({
                                center: marker.getLngLat(),
                                zoom: 2
                            });
                            closeAllPopups();
                            marker.togglePopup();
                        }
                    })(marker)
                );

                function closeAllPopups() {
                    markersCountry.forEach(markerCountry => {
                        if (markerCountry.marker.getPopup().isOpen()) {
                            markerCountry.marker.togglePopup();
                        }
                    });
                }
            })
    }

    updateMap();


