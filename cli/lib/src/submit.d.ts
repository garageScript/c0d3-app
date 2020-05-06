declare const submit: ({ url, debug }: {
    url: string;
    debug: boolean;
}) => Promise<void>;
export default submit;
