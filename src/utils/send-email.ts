import { FormData } from '@/app/contact/page';

export default async function sendEmail(data: FormData) {
    const apiEndpoint = '/api/email';

    const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const response = await res.json();

    if (!res.ok) {
        throw new Error(response.error || 'Failed to send message');
    }

    return response;
}
