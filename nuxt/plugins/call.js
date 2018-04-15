function call(ep, json) {
	if(fetch) {
		 return fetch(`http://${window.location.hostname}:3000${ep}`, {
			body: JSON.stringify(data), // must match 'Content-Type' header
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, same-origin, *omit
			headers: {
			  'content-type': 'application/json'
			},
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, cors, *same-origin
			redirect: 'follow', // manual, *follow, error
			referrer: 'no-referrer', // *client, no-referrer
		  })
		  .then(res => res.json()) // parses response to JSON
	}
	//fallback to xhr if fetch is not supported
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'json'
        xhr.onloadend = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                return res(xhr.response)
            }
            return res({ error: { status: 500, msg: 'Internal Server Error' } })
        }
        xhr.onabort = e => {
            return rej({ error: { status: 500, msg: 'Internal Server Error' } })
        }
        xhr.open('POST', `http://${window.location.hostname}:3000${ep}`, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(json))
    })
}
