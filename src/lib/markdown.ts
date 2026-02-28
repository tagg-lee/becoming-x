import { marked as markedLib } from 'marked';

export async function marked(input: string): Promise<string> {
	return await markedLib.parse(input);
}
