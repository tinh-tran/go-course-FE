import {uploadImageBegin,uploadImageSuccess,uploadImageError} from '../actions';
import {ImageApi} from '../config.js';
const axios = require("axios");

export function uploadImage(file,name) {
		console.log(file)
	  	const formData = new FormData()
		formData.append('File', file)
		const config = {
            headers: {
				"Content-Type": "multipart/form-data;"
            }
        };
	return dispatch => { console.log("tt");
		dispatch(uploadImageBegin());
		return axios.post(ImageApi + "/upload/"+name,formData,config)
            .then(
				(image) => {
				dispatch(uploadImageSuccess(file.name));
				console.log("image",image)
        }
	).catch(error => dispatch(uploadImageError(error)));
  };
}

export function embedImage(url) {
	var rtn = url;
    if(url)
    {
        var vidId = getVidId(url);
        if(vidId)
        {
            rtn = "https://www.youtube.com/embed/"+vidId;
        }
        else
        {
            rtn = url;
        }
    }
	return dispatch => { 
		dispatch(uploadImageSuccess(rtn));
  };
}
var getVidId = function(url)
{
    var vidId;
    if(url.indexOf("youtube.com/watch?v=") !== -1)//https://m.youtube.com/watch?v=e3S9KINoH2M
    {
        vidId = url.substr(url.indexOf("youtube.com/watch?v=") + 20);
    }
    else if(url.indexOf("youtube.com/watch/?v=") !== -1)//https://m.youtube.com/watch/?v=e3S9KINoH2M
    {
        vidId = url.substr(url.indexOf("youtube.com/watch/?v=") + 21);
    }
    else if(url.indexOf("youtu.be") !== -1)
    {
        vidId = url.substr(url.indexOf("youtu.be") + 9);
    }
    else if(url.indexOf("www.youtube.com/embed/") !== -1)
    {
        vidId = url.substr(url.indexOf("www.youtube.com/embed/") + 22);
    }
    else if(url.indexOf("?v=") !== -1)// http://m.youtube.com/?v=tbBTNCfe1Bc
    {
        vidId = url.substr(url.indexOf("?v=")+3, 11);
    }
    else
    {
        console.warn("YouTubeUrlNormalize getVidId not a youTube Video: "+url);
        vidId = null;
    }

    if(vidId.indexOf("&") !== -1)
    {
        vidId = vidId.substr(0, vidId.indexOf("&") );
    }
    return vidId;
};