const supabase = require('./utils/supabase');

async function addUser(name, email) {
    const { data, error } = await supabase
        .from('users')
        .insert([{ name, email }]);

    if (error) console.error(error);
    else console.log('User added:', data);
}

async function getUsers() {
    const { data, error } = await supabase
        .from('users')
        .select('*');

    if (error) console.error(error);
    else console.log('Users:', data);
}


(async () => {
    try {
        
        await addUser('John Doe', 'john@example.com');
        await addUser('Jane Doe', 'jane@example.com');

        await getUsers();

        

    } catch (error) {
        console.error('Testing failed:', error);
    }
})();