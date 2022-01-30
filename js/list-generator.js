function getCoordinates() {
    Object.values(places).forEach ((item, index)=>{
        if (item['address'].length >= 3 && item['city'].length >= 3) {
            let input = item['address'] + ', ' + item['city'];
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+input+'&key=YOUR_API_KEY')
            .then(response => {
                return response.json();
            })
            .then(
                jsondata => {
                    let lat = jsondata['results'][0]['geometry']['location']['lat'];
                    let lng = jsondata['results'][0]['geometry']['location']['lng'];
                    item['coords'] = { lat, lng };
                }
            );
        }
        
    });
    setTimeout(makeString, 600);
}
let makeString = ()=>{
    let varstring = 'var places =[';
    Object.values(places).forEach ((item, index)=>{
        if (item['address'].length >= 3 && item['city'].length >= 3) {
            console.log(item)
            varstring += '{';
            varstring += 'name: "' + item['name'] + '", ';
            varstring += 'address: "' + item['address'] + '", ';
            varstring += 'city: "' + item['city'] + '", ';
            varstring += 'coords: [' + item['coords']['lat'] + ', ' + + item['coords']['lng'] + ']' + ', ';
            varstring += '}, ';
        }
    });
    varstring += ']';
    console.log(varstring);
    console.log(places);
    document.cookie = "pharvar=" + varstring + '; expires=' + 1200 + "; path=/";
    window.location = "./saveFile.php";  
}

function startme() {
    if (places) getCoordinates();
}

window.addEventListener('load', startme);