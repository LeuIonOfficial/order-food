export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	currency: string;
	image: string;
	category: string;
	isAvailable: boolean;
	cookId: string;
	createdAt: string;
	updatedAt: string;
	cook: {
		id: string;
		name: string;
		avatar: string;
		city: string;
	};
	reviews: Array<{
		id: string;
		rating: number;
		comment: string;
		customer?: {
			name: string;
		};
	}>;
} 