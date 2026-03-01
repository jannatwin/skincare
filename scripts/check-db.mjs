import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDb() {
    console.log('Checking Supabase connection...');
    console.log('URL:', supabaseUrl);

    try {
        const { data, error, status } = await supabase
            .from('products')
            .select('*')
            .limit(1);

        if (error) {
            console.error('Error querying products:', error.message);
            console.error('Status:', status);
        } else {
            console.log('Query successful!');
            console.log('Products found:', data.length);
            if (data.length > 0) {
                console.log('First product:', data[0].name);
            }
        }
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

checkDb();
