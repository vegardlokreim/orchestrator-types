import { getFunctions, httpsCallable } from "firebase/functions";

// TODO: add types for function names
export async function callFunction<P, R>(name: string, params?: P): Promise<R> {
    const functions = getFunctions();

    const func = httpsCallable<P, R>(functions, name);
    const response = params ? await func(params) : await func();
    return response.data
}