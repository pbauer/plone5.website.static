if (document.addEventListener) {
	document.addEventListener('DOMContentLoaded', function () {
		var base,
			cache = {},
			hash,
			i,
			onload,
			request = false,
			url,
			uses = document.getElementsByTagName('use'),
			xhr;
		if (XMLHttpRequest) {
			request = new XMLHttpRequest();
			if ('withCredentials' in request) {
				request = XMLHttpRequest;
			} else {
				request = XDomainRequest ? XDomainRequest : false;
			}
		}
		if (!request) {
			return;
		}
		onload = function () {
			var body = document.body,
				x = document.createElement('x');
			x.innerHTML = xhr.responseText;
			body.insertBefore(x.firstChild, body.firstChild);
		};
		for (i = 0; i < uses.length; i += 1) {
			url = uses[i].getAttribute('xlink:href').split('#');
			base = url[0];
			hash = url[1];
			if (!base.length && hash && !document.getElementById(hash)) {
				base = 'js/svgdefs.svg';
			}
			if (base.length) {
				cache[base] = cache[base] || new request();
				xhr = cache[base];
				if (!xhr.onload) {
					xhr.onload = onload;
					xhr.open('GET', base);
					xhr.send();
				}
			}
		}
	}, false);
}
