export async function onRequestGet(context) {
	const { searchParams } = new URL(context.request.url);
	const code = searchParams.get("code");

	if (!code) {
		return new Response("Missing code parameter", { status: 400 });
	}

	const clientId = context.env.GITHUB_CLIENT_ID;
	const clientSecret = context.env.GITHUB_CLIENT_SECRET;

	if (!clientId || !clientSecret) {
		return new Response("OAuth environment variables are not configured", { status: 500 });
	}

	const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			client_id: clientId,
			client_secret: clientSecret,
			code,
		}),
	});

	const tokenData = await tokenResponse.json();

	if (tokenData.error) {
		return new Response(`OAuth error: ${tokenData.error_description || tokenData.error}`, {
			status: 400,
		});
	}

	const content = `
<!DOCTYPE html>
<html>
<head><title>Authenticating...</title></head>
<body>
<script>
(function() {
	function receiveMessage(e) {
		console.log("receiveMessage %o", e);
		window.opener.postMessage(
			'authorization:github:success:${JSON.stringify({ token: tokenData.access_token, provider: "github" })}',
			e.origin
		);
		window.removeEventListener("message", receiveMessage, false);
	}
	window.addEventListener("message", receiveMessage, false);
	window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;

	return new Response(content, {
		headers: { "Content-Type": "text/html" },
	});
}
