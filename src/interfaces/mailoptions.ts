export interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
};

export interface FormData {
    service: { value: string; label: string };
    challenge: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    consent: boolean;
}