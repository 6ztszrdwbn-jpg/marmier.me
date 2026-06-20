(function() {
	var form = document.getElementById('lesson-request');
	var copyButton = document.getElementById('copy-request');
	var status = document.getElementById('copy-status');

	if (!form)
		return;

	function value(id) {
		var element = document.getElementById(id);
		return element && element.value ? element.value.trim() : '';
	}

	function buildMessage() {
		var name = value('name') || 'Votre prénom';
		var lastName = value('last-name') || 'nom à préciser';
		var phone = value('phone') || 'portable à préciser';
		var city = value('city') || 'ville à préciser';
		var profile = value('profile') || 'profil à préciser';
		var goal = value('goal') || 'objectif à préciser';
		var availability = value('availability') || 'disponibilités à préciser';

		return [
			'Bonjour Nathan,',
			'',
			'Je souhaite prendre des cours de piano et j’aimerais échanger avec vous pour organiser un premier cours.',
			'',
			'Prénom : ' + name,
			'Nom : ' + lastName,
			'Portable : ' + phone,
			'Ville : ' + city,
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

	function setStatus(text) {
		if (status)
			status.textContent = text;
	}

	form.addEventListener('input', updateMessage);
	form.addEventListener('change', updateMessage);

	if (copyButton) {
		copyButton.addEventListener('click', function() {
			if (form.reportValidity && !form.reportValidity())
				return;

			updateMessage();

			var message = document.getElementById('message');
			if (!message)
				return;

			message.select();
			message.setSelectionRange(0, message.value.length);

			if (navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(message.value).then(function() {
					setStatus('Message copié. Vous pouvez maintenant le coller dans votre email.');
				}).catch(function() {
					document.execCommand('copy');
					setStatus('Message sélectionné. Copiez-le puis envoyez-le par email.');
				});
			} else {
				document.execCommand('copy');
				setStatus('Message sélectionné. Copiez-le puis envoyez-le par email.');
			}
		});
	}

	form.addEventListener('submit', function(event) {
		event.preventDefault();

		if (form.reportValidity && !form.reportValidity())
			return;

		updateMessage();

		var message = document.getElementById('message');
		if (!message)
			return;

		var subject = encodeURIComponent('Demande de cours de piano');
		var body = encodeURIComponent(message.value);

		window.location.href = 'mailto:nathan@marmier.me?subject=' + subject + '&body=' + body;
	});
})();
