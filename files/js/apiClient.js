/**
 * @typedef {{ body?: Record<string, any>, query?: Record<string, string>, headers?: Record<string, string | number> }} Opts
 */

const apiClient = {
  read,
  store,
  update,
  destroy,
};

function getAuthorization() {
  return localStorage?.token ?? sessionStorage?.token ?? null;
}

function computePath(
  /** @type { string } */ path,
  /** @type { Record<string, string> } */ query
) {
  if (!query || typeof query !== "object" || Object.keys(query).length === 0) {
    return path;
  }
  return (
    path +
    "?" +
    Object.keys(query)
      .map((k) => k + "=" + query[k])
      .join("&")
  );
}

function computeHeaders(headers) {
  const authorization = getAuthorization();

  const h = {};
  h["Content-Type"] = "application/json";

  if (authorization) {
    h["authorization"] = authorization;
  }

  if (
    !headers ||
    typeof headers !== "object" ||
    Object.keys(headers).length === 0
  ) {
    return h;
  }

  Object.keys(headers).forEach((k) => (h[k] = headers[k]));
  return h;
}

function computeBody(body) {
  if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
    return "{}";
  }

  return JSON.stringify(body);
}

function read(path, /** @type { Opts } */ options = {}) {
  const { query = null, headers = null } = options;
  return fetch(computePath(path, query), {
    method: "GET",
    headers: computeHeaders(headers),
  }).then((response) => response.json());
}

function store(path, /** @type { Opts } */ options = {}) {
  const { query = null, headers = null, body = null } = options;
  return fetch(computePath(path, query), {
    method: "POST",
    body: computeBody(body),
    headers: computeHeaders(headers),
  }).then((response) => response.json());
}

function update(path, /** @type { Opts } */ options = {}) {
  const { query = null, headers = null, body = null } = options;
  return fetch(computePath(path, query), {
    method: "PUT",
    body: computeBody(body),
    headers: computeHeaders(headers),
  }).then((response) => response.json());
}

function destroy(path, /** @type { Opts } */ options = {}) {
  const { query = null, headers = null } = options;
  return fetch(computePath(path, query), {
    method: "DELETE",
    headers: computeHeaders(headers),
  }).then((response) => response.json());
}
