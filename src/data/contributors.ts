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
	'노션다움': {
		name: '노션다움',
		bio: 'Notion CEO | Vision Hub | 노션 강사',
		avatar: 'https://cdn.litt.ly/images/9ZDKnUeaYIFHyoxen7FHy9UdBwGOM3Em?s=180x180&f=webp',
		links: [
			{ platform: 'litly', url: 'https://litt.ly/notionactually', label: 'Litt.ly' },
			{ platform: 'youtube', url: 'https://www.youtube.com/@notionactually', label: 'YouTube' },
			{ platform: 'instagram', url: 'https://www.instagram.com/notion_actually/', label: 'Instagram' },
			{ platform: 'threads', url: 'https://www.threads.net/@notion_actually', label: 'Threads' },
			{ platform: 'linkedin', url: 'https://www.linkedin.com/in/hyunserk-lee-1a4a5a284/', label: 'LinkedIn' },
			{ platform: 'website', url: 'https://notionactually.liveklass.com/', label: 'LiveKlass' },
		],
	},
};

export function getContributor(name: string): Contributor | undefined {
	return contributors[name];
}

export function getAllContributorNames(): string[] {
	return Object.keys(contributors);
}
