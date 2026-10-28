// Número de WhatsApp da clínica (fictício).
const CLINIC_WHATSAPP = '5511999998888';

// Live preview of message on input
        const formInputs = ['name', 'phone', 'service', 'datetime', 'message'];
        formInputs.forEach(id => {
            document.getElementById(id).addEventListener('input', updatePreview);
        });

        function generateMessageText() {
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const datetime = document.getElementById('datetime').value.trim();
            const message = document.getElementById('message').value.trim();

            let formattedText = `Olá, gostaria de agendar uma consulta no *PsicoVida*!\n\n`;
            formattedText += `👤 *Nome:* ${name || '---'}\n`;
            formattedText += `📞 *Telefone:* ${phone || '---'}\n`;
            formattedText += `🩺 *Serviço:* ${service || '---'}\n`;
            formattedText += `📅 *Preferência:* ${datetime || '---'}\n`;

            if (message) {
                formattedText += `📝 *Observações:* ${message}\n`;
            }

            return formattedText;
        }

        function updatePreview() {
            const previewBox = document.getElementById('preview-box');
            const previewText = document.getElementById('preview-text');
            const text = generateMessageText();

            if (document.getElementById('name').value || document.getElementById('service').value) {
                previewBox.classList.remove('hidden');
                previewText.textContent = text;
            } else {
                previewBox.classList.add('hidden');
            }
        }

        // Form submission handling & WhatsApp API Redirection
        function handleBooking(event) {
            event.preventDefault();

            const messageText = generateMessageText();
            const encodedText = encodeURIComponent(messageText);
            const whatsappUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodedText}`;

            showToast("Abrindo conversa no WhatsApp...");

            // Open WhatsApp link in new tab
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 800);
        }

        // Custom Notification Function replacing standard alert
        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toast-msg');

            toastMsg.textContent = message;
            toast.classList.remove('hidden');

            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3500);
        }
