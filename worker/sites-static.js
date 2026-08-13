const worker = {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404 || request.method !== 'GET') {
      return response;
    }

    const acceptedTypes = request.headers.get('accept') || '';
    if (!acceptedTypes.includes('text/html')) {
      return response;
    }

    const indexUrl = new URL('/index.html', request.url);
    return env.ASSETS.fetch(new Request(indexUrl.toString(), request));
  },
};

export default worker;
