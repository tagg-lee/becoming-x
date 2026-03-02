export interface ContributorLink {
	platform: 'litly' | 'kakaotalk' | 'x' | 'threads' | 'youtube' | 'instagram' | 'linkedin' | 'github' | 'website';
	url: string;
	label?: string;
}

export interface Contributor {
	name: string;
	bio: string;
	avatar?: string;
	links: ContributorLink[];
}

const contributors: Record<string, Contributor> = {
	'손상현': {
		name: '손상현',
		bio: 'AI 돌연변이, Voidlight 현입니다.',
		avatar: 'https://cdn.litt.ly/images/mZ4kIOKsGUj0lFKiO5MidRDDP4r7HezW?s=180x180&f=webp',
		links: [
			{ platform: 'litly', url: 'https://litt.ly/voidlight', label: 'Litt.ly' },
			{ platform: 'kakaotalk', url: 'https://open.kakao.com/o/gugo7tCh', label: 'KakaoTalk' },
			{ platform: 'x', url: 'https://x.com/voidlighthyun', label: 'X' },
			{ platform: 'threads', url: 'https://www.threads.com/@voidlight00?hl=ko', label: 'Threads' },
		],
	},
};

export function getContributor(name: string): Contributor | undefined {
	return contributors[name];
}
