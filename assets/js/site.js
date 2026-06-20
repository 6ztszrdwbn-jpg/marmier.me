(function() {
	var form = document.getElementById('lesson-request');
	var copyButton = document.getElementById('copy-request');
	var status = document.getElementById('copy-status');

	if (!form || !copyButton)
		return;

	function value(id) {
		var element = document.getElementById(id);
		return element && element.value ? element.value.trim() : '';
	}

	function buildMessage() {
		var name = value('name') || 'Votre prénom';
		var profile = value('profile') || 'profil à préciser';
		var goal = value('goal') || 'objectif à préciser';
		var availability = value('availability') || 'disponibilités à préciser';

		return [
			'Bonjour Nathan,',
			'',
			"Je souhaite prendre des cours de piano et j’aimerais échanger avec vous pour organiser un premier cours.",
			'',
			'Prénom : ' + name,
			'Profil : ' + profile,
			'Objectif : ' + goal,
			'Disponibilités : ' + availability,
			'',
			'Merci et à bientôt.'
		].join('\n');
	}

	function updateMessage() {
		var message = document.getElementById('message');

		if (message)
			message.value = buildMessage();
	}

	form.addEventListener('input', updateMessage);
	form.addEventListener('change', updateMessage);

	copyButton.addEventListener('click', function() {
		updateMessage();

		var message = document.getElementById('message');
		if (!message)
			return;

		message.select();
		message.setSelectionRange(0, message.value.length);

		var copied = false;

		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(message.value).then(function() {
				status.textContent = 'Message copié. Vous pouvez maintenant le coller dans votre demande Superprof.';
			}).catch(function() {
				document.execCommand('copy');
				status.textContent = 'Message sélectionné. Copiez-le puis ouvrez Superprof.';
			});
			copied = true;
		}

		if (!copied) {
			document.execCommand('copy');
			status.textContent = 'Message sélectionné. Copiez-le puis ouvrez Superprof.';
		}
	form.addEventListener('submit', function(event) {
  	event.preventDefault();
  	updateMessage();

  var subject = encodeURIComponent('Demande de cours de piano');
  var body = encodeURIComponent(document.getElementById('message').value);

  window.location.href = 'mailto:nathan@marmier.me?subject=' + subject + '&body=' + body;
});
	});
})();
