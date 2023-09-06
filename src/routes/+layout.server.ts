import { decodeBase64URLData } from '$lib/utils';
import type { LayoutServerLoad } from './$types';
import { sha256 } from 'js-sha256';
import { CVSchema } from './validation';
import 'dotenv/config';


export const load: LayoutServerLoad = async ({ url }) => {
    const base64UrlEncodedData = url.searchParams.get('data');

    if (!base64UrlEncodedData)
        return {};

    let data = decodeBase64URLData(base64UrlEncodedData);

    try {
        data = CVSchema.parse(data)
    } catch (e) {
        return {};
    }

    console.log(data)

    const signature = data.signature

    data.signature = ""


    if (sha256(JSON.stringify(data) + process.env.KEY) == signature) {
        data.signature = signature
        return { cv: data }
    };
};