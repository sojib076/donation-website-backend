export type IDonation= {
    title: string;
    status?: 'active' | 'inactive' | 'completed';
    image: File;
    target: number;
    current?: number;
    progress?: number;
    createdAt?: Date;
    description: string;
}