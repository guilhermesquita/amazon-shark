export type Client = {
    id: string;
    full_name: string;
    email: string;
    cpf: string;
    phone: string;
    verification: boolean;
    updatedAt: Date | null;
}