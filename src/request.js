export function requestFetch({url, option = {method: 'GET'}}) {
    let options = {
        method: option.method, // *GET, POST, PUT, DELETE, etc.
        cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, same-origin, *omit
        // headers: {
        //   'content-type': 'application/json',
        //   'withCredentials': true
        // },
        mode: 'cors', // no-cors, cors, *same-origin
        ...option
    }
    let data, paramArr2, param;
    if (option.method === 'get') {
        data = option.params || {}
        paramArr2 = {}
        for (let k in data) {
            paramArr2[k] = data[k];
        }
        param = new URLSearchParams(paramArr2).toString();
        if (param.length > 0) {
            if (url.indexOf('?') >= 0) {
                url = url + '&' + param
            } else {
                url = url + '?' + param
            }
        }
    }
    // method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    // headers: {
    //   "Content-Type": "application/json",
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    // },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data),
    
    return fetch(encodeURI(url), options)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('Get Network Response Was Wrong.')
            }
        })
        .then(data => {
            // console.log(data);
            return data
        })
        .catch(error => {
            console.error(error)
            throw error
        })
}