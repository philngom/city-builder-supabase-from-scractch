const SUPABASE_URL = 'https://iqxfxzfeiaawalxmyaud.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQxMzM1ODA5LCJleHAiOjE5NTY5MTE4MDl9.ygkPAYHWFKj5FgGRcKUQb668Yj53kbDHzB3OfEgiGSI';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../');
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./city');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

export async function fetchCity() {
    const response = await client
        .from('city-builder')
        .select()
        .single();

    return checkError(response);
}

export async function createDefaultCity(city) {
    const response = await client
        .from('city-builder')
        .insert([{ ...city }]);

    return checkError(response);
}

export async function updateWaterfront(part, selection) {
    const id = await getUser();
    console.log(id);
    const response = await client
        .from('city-builder')
        .update({ [part]: selection })
        .match({ user_id: id.user.id })
        .single();

    return checkError(response);
}

export async function updateSlogans(newSlogans) {
    const id = await getUser();
    const response = await client
        .from('city-builder')
        .update({ slogans: newSlogans })
        .match({ user_id: id.user.id })
        .single();

    return checkError(response);
}

export async function updateName(newName) {
    const id = await getUser();
    const response = await client
        .from('city-builder')
        .update({ city: newName })
        .match({ user_id: id.user.id })
        .single();

    return checkError(response);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
